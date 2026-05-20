// @ts-check
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Project, SymbolFlags, TypeFormatFlags } from "ts-morph";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(__dirname, "../..");
const indexFilePath = path.join(repoRoot, "src", "index.ts");

/**
 * @typedef {{ name: string; moduleSpecifier: string }} ComponentCandidate
 */

/**
 * @typedef {{ exportedName: string; localName: string }} TypeExport
 */

/**
 * @typedef {{
 *   component: string;
 *   moduleSpecifier: string;
 *   propsType: string | null;
 *   propsTypeLocal: string | null;
 *   props: Array<{ name: string; required: boolean; type: string }>;
 * }} ComponentTypeSnapshot
 */

export function createProject() {
  const project = new Project({
    tsConfigFilePath: path.join(repoRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });

  project.addSourceFileAtPath(indexFilePath);
  project.addSourceFilesAtPaths([
    path.join(repoRoot, "src", "components", "**", "*.ts"),
    path.join(repoRoot, "src", "components", "**", "*.tsx"),
  ]);

  return project;
}

/**
 * @param {Project} project
 */
export function collectPublicComponentTypeSnapshots(project) {
  const indexFile = project.getSourceFileOrThrow(indexFilePath);
  const typeExportsByModule = collectTypeExportsByModule(indexFile);
  const candidates = collectComponentCandidates(indexFile);

  /** @type {ComponentTypeSnapshot[]} */
  const snapshots = [];

  for (const candidate of candidates) {
    const modulePath = resolveModulePath(indexFilePath, candidate.moduleSpecifier);
    if (!modulePath) continue;

    const moduleSource = project.getSourceFile(modulePath);
    if (!moduleSource) continue;

    const propsType = resolvePropsTypeExport(typeExportsByModule, candidate);
    const propsLocalName = propsType?.localName ?? null;
    const propsExportedName = propsType?.exportedName ?? null;

    /** @type {Array<{ name: string; required: boolean; type: string }>} */
    let props = [];

    if (propsLocalName) {
      const propsDecl = moduleSource
        .getExportedDeclarations()
        .get(propsLocalName)
        ?.find(
          (decl) =>
            decl.getKindName() === "InterfaceDeclaration" ||
            decl.getKindName() === "TypeAliasDeclaration",
        );

      if (propsDecl) {
        props = extractPropsFromDeclaration(propsDecl, moduleSource);
      }
    }

    snapshots.push({
      component: candidate.name,
      moduleSpecifier: candidate.moduleSpecifier,
      propsType: propsExportedName,
      propsTypeLocal: propsLocalName,
      props,
    });
  }

  return snapshots.sort((a, b) => a.component.localeCompare(b.component));
}

/**
 * @param {import("ts-morph").SourceFile} indexFile
 * @returns {Map<string, TypeExport[]>}
 */
function collectTypeExportsByModule(indexFile) {
  /** @type {Map<string, TypeExport[]>} */
  const byModule = new Map();

  for (const exportDecl of indexFile.getExportDeclarations()) {
    if (!exportDecl.isTypeOnly()) continue;
    const moduleSpecifier = exportDecl.getModuleSpecifierValue();
    if (!moduleSpecifier || !moduleSpecifier.startsWith("./components/")) continue;

    const named = exportDecl.getNamedExports();
    const exports = byModule.get(moduleSpecifier) ?? [];

    for (const entry of named) {
      exports.push({
        exportedName: entry.getAliasNode()?.getText() ?? entry.getName(),
        localName: entry.getName(),
      });
    }

    byModule.set(moduleSpecifier, exports);
  }

  return byModule;
}

/**
 * @param {import("ts-morph").SourceFile} indexFile
 * @returns {ComponentCandidate[]}
 */
function collectComponentCandidates(indexFile) {
  /** @type {ComponentCandidate[]} */
  const candidates = [];

  for (const exportDecl of indexFile.getExportDeclarations()) {
    const moduleSpecifier = exportDecl.getModuleSpecifierValue();
    if (!moduleSpecifier || !moduleSpecifier.startsWith("./components/")) continue;
    if (exportDecl.isTypeOnly()) continue;

    for (const namedExport of exportDecl.getNamedExports()) {
      const exportName =
        namedExport.getAliasNode()?.getText() ?? namedExport.getName();

      if (exportName === "default" || exportName.endsWith("Props")) continue;
      if (!/^[A-Z]/.test(exportName)) continue;

      candidates.push({ name: exportName, moduleSpecifier });
    }
  }

  /** @type {Map<string, ComponentCandidate>} */
  const unique = new Map();
  for (const candidate of candidates) {
    unique.set(`${candidate.moduleSpecifier}::${candidate.name}`, candidate);
  }

  return [...unique.values()];
}

/**
 * @param {Map<string, TypeExport[]>} typeExportsByModule
 * @param {ComponentCandidate} candidate
 */
function resolvePropsTypeExport(typeExportsByModule, candidate) {
  const typeExports =
    typeExportsByModule
      .get(candidate.moduleSpecifier)
      ?.filter((entry) => entry.exportedName.endsWith("Props")) ?? [];

  const exact = typeExports.find(
    (entry) => entry.exportedName === `${candidate.name}Props`,
  );
  if (exact) return exact;

  if (typeExports.length === 1) return typeExports[0];

  return null;
}

/**
 * @param {import("ts-morph").Node} declaration
 * @param {import("ts-morph").SourceFile} contextFile
 */
function extractPropsFromDeclaration(declaration, contextFile) {
  const propsType = declaration.getType();

  return propsType
    .getProperties()
    .map((symbol) => {
      const valueDeclaration =
        symbol.getValueDeclaration() ?? symbol.getDeclarations()[0];
      const propertyType = symbol.getTypeAtLocation(valueDeclaration ?? contextFile);
      const typeText = propertyType.getText(
        valueDeclaration ?? contextFile,
        TypeFormatFlags.NoTruncation |
          TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
      );

      return {
        name: symbol.getName(),
        required: (symbol.getFlags() & SymbolFlags.Optional) === 0,
        type: normalizeTypeText(typeText),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * @param {string} importerPath
 * @param {string} moduleSpecifier
 */
function resolveModulePath(importerPath, moduleSpecifier) {
  const basePath = path.resolve(path.dirname(importerPath), moduleSpecifier);

  const candidates = [
    `${basePath}.ts`,
    `${basePath}.tsx`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
  ];

  for (const candidate of candidates) {
    try {
      if (existsSync(candidate)) {
        return candidate;
      }
    } catch {
      // ignore
    }
  }

  return null;
}

/**
 * @param {string} text
 */
function normalizeTypeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

/**
 * @param {string} value
 */
export function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

/**
 * @param {string} input
 */
export function normalizeComponentArg(input) {
  const trimmed = input
    .replace(/\\/g, "/")
    .replace(/^.*\//, "")
    .replace(/\.md$/i, "")
    .replace(/\/types$/i, "");

  return trimmed;
}

// ─── Snapshot comparison ─────────────────────────────────────────────────────

/**
 * @param {ComponentTypeSnapshot} baseline
 * @param {ComponentTypeSnapshot} current
 * @returns {{ breaking: string[]; safe: string[] }}
 */
export function compareSnapshots(baseline, current) {
  /** @type {string[]} */
  const breaking = [];
  /** @type {string[]} */
  const safe = [];

  const baselineProps = new Map(
    /** @type {Array<{ name: string; required: boolean; type: string }>} */ (
      baseline.props ?? []
    ).map((p) => [p.name, p]),
  );
  const currentProps = new Map(
    /** @type {Array<{ name: string; required: boolean; type: string }>} */ (
      current.props ?? []
    ).map((p) => [p.name, p]),
  );

  for (const [name, oldProp] of baselineProps) {
    const newProp = currentProps.get(name);
    if (!newProp) {
      breaking.push(`Prop '${name}' removed.`);
      continue;
    }

    if (!oldProp.required && newProp.required) {
      breaking.push(`Prop '${name}' changed from optional to required.`);
    } else if (oldProp.required && !newProp.required) {
      safe.push(`Prop '${name}' changed from required to optional.`);
    }

    // Strip `| undefined` before comparing types — TypeScript automatically adds/removes
    // it when optionality changes, so a difference there is already captured above.
    const oldBaseType = normalizeType(stripUndefined(oldProp.type));
    const newBaseType = normalizeType(stripUndefined(newProp.type));

    if (oldBaseType !== newBaseType) {
      const result = classifyTypeChange(oldBaseType, newBaseType);
      if (result === "widening" || result === "equivalent") {
        safe.push(`Prop '${name}' type widened from '${oldProp.type}' to '${newProp.type}'.`);
      } else {
        breaking.push(
          `Prop '${name}' type changed from '${oldProp.type}' to '${newProp.type}'.`,
        );
      }
    }
  }

  for (const [name, newProp] of currentProps) {
    if (baselineProps.has(name)) continue;
    if (newProp.required) {
      breaking.push(`Required prop '${name}' added.`);
    } else {
      safe.push(`Optional prop '${name}' added.`);
    }
  }

  return { breaking, safe };
}

/**
 * @param {string} oldType
 * @param {string} newType
 * @returns {"widening" | "narrowing" | "equivalent" | "incompatible"}
 */
function classifyTypeChange(oldType, newType) {
  const tempProject = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: { strictNullChecks: true },
  });
  const source = tempProject.createSourceFile(
    "comparison.ts",
    [`type OldType = ${oldType};`, `type NewType = ${newType};`, "export {};"].join("\n"),
  );

  const oldDecl = source.getTypeAliasOrThrow("OldType");
  const newDecl = source.getTypeAliasOrThrow("NewType");
  const checker = tempProject.getTypeChecker().compilerObject;
  const isAssignable = checker.isTypeAssignableTo?.bind(checker);
  if (!isAssignable) return "incompatible";

  const oldToNew = isAssignable(oldDecl.getType().compilerType, newDecl.getType().compilerType);
  const newToOld = isAssignable(newDecl.getType().compilerType, oldDecl.getType().compilerType);

  if (oldToNew && newToOld) return "equivalent";
  if (oldToNew && !newToOld) return "widening";
  if (!oldToNew && newToOld) return "narrowing";
  return "incompatible";
}

/** @param {string} value */
function normalizeType(value) {
  return value.replace(/\s+/g, " ").trim();
}

/** @param {string} value */
function stripUndefined(value) {
  return value
    .split("|")
    .map((t) => t.trim())
    .filter((t) => t !== "undefined")
    .join(" | ");
}
