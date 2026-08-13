// @ts-check
import path from "node:path";
import { existsSync, statSync } from "node:fs";
import { Project } from "ts-morph";

const SOURCE_EXTENSIONS = ["", ".ts", ".tsx", ".js", ".jsx"];

/** @param {string} basePath */
function resolveSourcePath(basePath) {
  for (const extension of SOURCE_EXTENSIONS) {
    const candidate = basePath + extension;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  for (const extension of SOURCE_EXTENSIONS.slice(1)) {
    const candidate = path.join(basePath, `index${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

/** @param {import('ts-morph').Node} node */
function hasDeprecatedJsDoc(node) {
  let current = node;
  while (current && !current.wasForgotten()) {
    if (
      "getJsDocs" in current &&
      typeof current.getJsDocs === "function" &&
      current
        .getJsDocs()
        .some((doc) =>
          doc.getTags().some((tag) => tag.getTagName() === "deprecated"),
        )
    ) {
      return true;
    }
    const parent = current.getParent();
    if (!parent || parent.getKindName() === "SourceFile") break;
    current = parent;
  }
  return false;
}

/** @param {import('ts-morph').Node} node */
function hasOwnDeprecatedJsDoc(node) {
  return (
    "getJsDocs" in node &&
    typeof node.getJsDocs === "function" &&
    node
      .getJsDocs()
      .some((doc) =>
        doc.getTags().some((tag) => tag.getTagName() === "deprecated"),
      )
  );
}

/** @param {import('ts-morph').Node | undefined} node */
function unwrapExpression(node) {
  let current = node;
  while (
    current &&
    ["AsExpression", "ParenthesizedExpression", "SatisfiesExpression"].includes(
      current.getKindName(),
    ) &&
    "getExpression" in current &&
    typeof current.getExpression === "function"
  ) {
    current = current.getExpression();
  }
  return current;
}

/** @param {import('ts-morph').Node} component */
function deprecatedPropsFromComponent(component) {
  const deprecatedProps = new Set();
  const type = component.getType();
  const signatures = [
    ...type.getCallSignatures(),
    ...type.getConstructSignatures(),
  ];
  for (const signature of signatures) {
    const propsParameter = signature.getParameters()[0];
    if (!propsParameter) continue;
    const propsType = propsParameter.getTypeAtLocation(component);
    for (const property of propsType.getProperties()) {
      if (
        property
          .getDeclarations()
          .some((declaration) => hasOwnDeprecatedJsDoc(declaration))
      ) {
        deprecatedProps.add(property.getName());
      }
    }
  }
  return deprecatedProps;
}

export default class SourceInspector {
  /** @param {string} repoRoot */
  constructor(repoRoot) {
    this.repoRoot = repoRoot;
    this.project = new Project({
      tsConfigFilePath: path.join(repoRoot, "tsconfig.json"),
      skipAddingFilesFromTsConfig: true,
    });
    this.project.addSourceFilesAtPaths([
      path.join(repoRoot, "src", "components", "**", "*.ts"),
      path.join(repoRoot, "src", "components", "**", "*.tsx"),
    ]);
    this.storyDeprecatedProps = new Map();
  }

  /** @param {string} mdxPath @param {string} importSource */
  resolveStory(mdxPath, importSource) {
    return resolveSourcePath(path.resolve(path.dirname(mdxPath), importSource));
  }

  /** @param {string} sourcePath */
  exportedNames(sourcePath) {
    const sourceFile =
      this.project.getSourceFile(sourcePath) ??
      this.project.addSourceFileAtPathIfExists(sourcePath);
    return new Set(sourceFile?.getExportedDeclarations().keys() ?? []);
  }

  /** @param {string} sourcePath */
  isDeprecatedStory(sourcePath) {
    const sourceFile =
      this.project.getSourceFile(sourcePath) ??
      this.project.addSourceFileAtPathIfExists(sourcePath);
    return /\btitle\s*:\s*["'`]Deprecated\//.test(
      sourceFile?.getFullText() ?? "",
    );
  }

  /** @param {string} sourcePath */
  deprecatedPropsForStory(sourcePath) {
    const cached = this.storyDeprecatedProps.get(sourcePath);
    if (cached) return cached;

    const deprecatedProps = new Set();
    const sourceFile =
      this.project.getSourceFile(sourcePath) ??
      this.project.addSourceFileAtPathIfExists(sourcePath);
    const metaDeclarations =
      sourceFile?.getExportedDeclarations().get("default") ?? [];
    for (const declaration of metaDeclarations) {
      const metaExpression = unwrapExpression(
        "getInitializer" in declaration &&
          typeof declaration.getInitializer === "function"
          ? declaration.getInitializer()
          : "getExpression" in declaration &&
              typeof declaration.getExpression === "function"
            ? declaration.getExpression()
            : undefined,
      );
      if (
        !metaExpression ||
        !("getProperty" in metaExpression) ||
        typeof metaExpression.getProperty !== "function"
      ) {
        continue;
      }
      const componentProperty = metaExpression.getProperty("component");
      const component = unwrapExpression(
        componentProperty &&
          "getInitializer" in componentProperty &&
          typeof componentProperty.getInitializer === "function"
          ? componentProperty.getInitializer()
          : undefined,
      );
      if (!component) continue;
      for (const prop of deprecatedPropsFromComponent(component)) {
        deprecatedProps.add(prop);
      }
    }
    this.storyDeprecatedProps.set(sourcePath, deprecatedProps);
    return deprecatedProps;
  }

  /**
   * @param {{source: string, defaultImport: string | null, named: Array<{imported: string, typeOnly?: boolean}>, namespace: string | null}} importInfo
   */
  inspectComponentImport(importInfo) {
    const prefix = "carbon-react/lib/components/";
    if (!importInfo.source.startsWith(prefix)) return null;
    const relativeModule = importInfo.source.slice(prefix.length);
    const sourcePath = resolveSourcePath(
      path.join(this.repoRoot, "src", "components", relativeModule),
    );
    if (!sourcePath) {
      return {
        sourcePath: null,
        missingExports: [],
        deprecated: false,
      };
    }
    const sourceFile =
      this.project.getSourceFile(sourcePath) ??
      this.project.addSourceFileAtPathIfExists(sourcePath);
    const exported = sourceFile?.getExportedDeclarations() ?? new Map();
    const requested = [
      ...(importInfo.defaultImport ? ["default"] : []),
      ...importInfo.named.map(({ imported }) => imported),
    ];
    const runtimeRequested = [
      ...(importInfo.defaultImport ? ["default"] : []),
      ...importInfo.named
        .filter(({ typeOnly }) => !typeOnly)
        .map(({ imported }) => imported),
    ];
    const missingExports = requested.filter((name) => !exported.has(name));
    const deprecated = runtimeRequested.some((name) =>
      (exported.get(name) ?? []).some(hasDeprecatedJsDoc),
    );
    return { sourcePath, missingExports, deprecated };
  }
}
