// @ts-check
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import { JSDoc, Project, SyntaxKind } from "ts-morph";

/**
 * @typedef {Object} PropsDefinition
 * @property {string} name
 * @property {import("ts-morph").InterfaceDeclaration | import("ts-morph").TypeAliasDeclaration} node
 */

/**
 * @typedef {Object} PropInfo
 * @property {string} name
 * @property {string} type
 * @property {boolean} required
 * @property {Array<string | number | boolean> | null} literals
 * @property {string | null} description
 * @property {string | null} defaultValue
 * @property {boolean} deprecated
 * @property {string | null} deprecationReason
 */

/**
 * @typedef {Object} CanvasRef
 * @property {string} alias
 * @property {string} exportName
 * @property {string} heading
 */

/**
 * @typedef {Object} ArgTypeRef
 * @property {string} alias
 * @property {string | null} heading
 */

/**
 * @typedef {Object} MdxSection
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef {Object} ParsedMdx
 * @property {string} componentTitle
 * @property {string} description
 * @property {string | null} category
 * @property {{ heading: string, content: string } | null} quickStart
 * @property {Map<string, string>} storiesImports - alias -> relative path
 * @property {Array<{heading: string, items: Array<{description: string, canvasRef: CanvasRef | null}>}>} examples
 * @property {ArgTypeRef[]} argTypeRefs
 * @property {string | null} designerNotes
 * @property {string | null} relatedComponents
 * @property {string | null} refMethods
 * @property {Array<{title: string, content: string}>} otherSections
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

const checkMode = process.argv.includes("--check");
const skillsRoot = path.join(repoRoot, "skills", "carbon-react");
const componentsOutDir = path.join(skillsRoot, "components");
const referencesDir = path.join(skillsRoot, "references", "docs");
const referencesExamplesDir = path.join(referencesDir, "examples");

/** @type {Array<string | {source: string, target: string}>} */
const docsReferenceFiles = [
  "docs/usage.mdx",
  "docs/installation.mdx",
  "docs/recommended-practices.mdx",
  "docs/usage-with-routing.mdx",
  "docs/i18n.mdx",
  "docs/deprecation-migration.mdx",
  "docs/validations.mdx",
  {
    source: "src/hooks/useMediaQuery/use-media-query.mdx",
    target: "useMediaQuery.md",
  },
];

const project = new Project({
  tsConfigFilePath: path.join(repoRoot, "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});

project.addSourceFilesAtPaths([
  path.join(repoRoot, "src", "components", "**", "*.ts"),
  path.join(repoRoot, "src", "components", "**", "*.tsx"),
]);

// ─── MDX Discovery ──────────────────────────────────────────────────────────

const allMdxFiles = fg
  .sync(["src/components/**/*.mdx"], {
    cwd: repoRoot,
    absolute: true,
    ignore: ["**/__internal__/**", "**/node_modules/**"],
  })
  .sort();

/** @type {Array<{mdxPath: string, content: string, isNext: boolean, baseName: string, isDeprecated: boolean}>} */
const mdxEntries = [];

for (const mdxPath of allMdxFiles) {
  const content = await fs.readFile(mdxPath, "utf8");
  const isDeprecated = content.includes("<DeprecationWarning");
  const isNext = mdxPath.includes("/__next__/");
  const baseName = path.basename(mdxPath, ".mdx");
  mdxEntries.push({ mdxPath, content, isNext, baseName, isDeprecated });
}

// ─── Output directory naming (priority to __next__) ─────────────────────────

/** @type {Map<string, string>} slug -> mdxPath */
const slugToMdx = new Map();
/** @type {Map<string, string>} mdxPath -> outputSlug */
const mdxToSlug = new Map();

// First pass: collect all base names, __next__ gets priority
/** @type {Map<string, {nextPath: string | null, regularPath: string | null}>} */
const nameConflicts = new Map();

for (const entry of mdxEntries) {
  const existing = nameConflicts.get(entry.baseName) ?? {
    nextPath: null,
    regularPath: null,
  };
  if (entry.isNext) {
    existing.nextPath = entry.mdxPath;
  } else {
    existing.regularPath = entry.mdxPath;
  }
  nameConflicts.set(entry.baseName, existing);
}

for (const [baseName, { nextPath, regularPath }] of nameConflicts.entries()) {
  if (nextPath && regularPath) {
    // __next__ takes the simple name, regular gets -legacy
    mdxToSlug.set(nextPath, baseName);
    slugToMdx.set(baseName, nextPath);
    mdxToSlug.set(regularPath, `${baseName}-legacy`);
    slugToMdx.set(`${baseName}-legacy`, regularPath);
  } else if (nextPath) {
    mdxToSlug.set(nextPath, baseName);
    slugToMdx.set(baseName, nextPath);
  } else if (regularPath) {
    mdxToSlug.set(regularPath, baseName);
    slugToMdx.set(baseName, regularPath);
  }
}

// Build slug set for link resolution
const availableSlugs = new Set(slugToMdx.keys());

// ─── MDX Parsing ────────────────────────────────────────────────────────────

/**
 * Parse an MDX file content into structured data.
 * @param {string} content
 * @returns {ParsedMdx}
 */
function parseMdxFile(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");

  // Extract imports (namespace: import * as X from "..." AND default: import X from "...")
  const storiesImports = new Map();
  const namespaceImportRegex =
    /^import\s+\*\s+as\s+(\w+)\s+from\s+["']([^"']+)["']/;
  const defaultImportRegex = /^import\s+(\w+)\s+from\s+["']([^"']+)["']/;
  for (const line of lines) {
    const nsMatch = line.match(namespaceImportRegex);
    if (nsMatch) {
      storiesImports.set(nsMatch[1], nsMatch[2]);
      continue;
    }
    const defMatch = line.match(defaultImportRegex);
    if (defMatch && defMatch[2].includes(".stories")) {
      storiesImports.set(defMatch[1], defMatch[2]);
    }
  }

  // Extract component title (first H1)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const componentTitle = titleMatch ? titleMatch[1].trim() : "Unknown";

  // Extract description: text between PDS link closing tag (or H1) and ## Contents
  const description = extractDescription(content);

  // Extract category
  const category = extractCategory(content);

  // Extract Quick Start section (heading + full content)
  const quickStart = extractQuickStart(content);

  // Extract examples (Canvas refs grouped by heading)
  const examples = extractExamples(content);

  // Extract ArgType refs
  const argTypeRefs = extractArgTypeRefs(content);

  // Extract Designer Notes section
  const designerNotes = extractSection(content, "Designer Notes");

  // Extract Related Components section
  const relatedComponents = extractSection(content, "Related Components");

  // Extract Ref methods section
  const refMethods = extractSection(content, "Ref methods");

  // Extract other sections not in the known set
  const otherSections = extractOtherSections(content);

  return {
    componentTitle,
    description,
    category,
    quickStart,
    storiesImports,
    examples,
    argTypeRefs,
    designerNotes,
    relatedComponents,
    refMethods,
    otherSections,
  };
}

/**
 * Extract description text from MDX content.
 * Skips any leading <DeprecationWarning> block and PDS/zeroheight link.
 * @param {string} content
 * @returns {string}
 */
function extractDescription(content) {
  // Start after the H1 title
  const h1Match = content.match(/^#\s+.+$/m);
  if (!h1Match) return "";
  let startIdx = h1Match.index + h1Match[0].length + 1;

  // Skip <DeprecationWarning>...</DeprecationWarning> block if it immediately follows H1
  const deprecWarningStart = content.indexOf("<DeprecationWarning", startIdx);
  if (
    deprecWarningStart !== -1 &&
    content.slice(startIdx, deprecWarningStart).trim() === ""
  ) {
    const deprecWarningEnd = content.indexOf(
      "</DeprecationWarning>",
      deprecWarningStart,
    );
    if (deprecWarningEnd !== -1) {
      startIdx = deprecWarningEnd + "</DeprecationWarning>".length;
    }
  }

  // Skip PDS/zeroheight <a> link if it immediately follows (after H1 or DeprecationWarning)
  const pdsTextIdx = content.indexOf("Product Design System", startIdx);
  if (pdsTextIdx !== -1) {
    const pdsAStart = content.lastIndexOf("<a", pdsTextIdx);
    if (
      pdsAStart !== -1 &&
      pdsAStart >= startIdx &&
      content.slice(startIdx, pdsAStart).trim() === ""
    ) {
      const pdsAEnd = content.indexOf("</a>", pdsAStart);
      if (pdsAEnd !== -1) {
        startIdx = pdsAEnd + "</a>".length;
      }
    }
  }

  // Find where description ends: **Category:** or first ## heading
  const categoryIdx = content.indexOf("**Category:**", startIdx);
  const contentsIdx = content.indexOf("## Contents", startIdx);
  const nextH2Idx = content.indexOf("\n## ", startIdx);

  const candidates = [
    categoryIdx !== -1 ? categoryIdx : Infinity,
    contentsIdx !== -1 ? contentsIdx : Infinity,
    nextH2Idx !== -1 ? nextH2Idx : Infinity,
    content.length,
  ];
  const endIdx = Math.min(...candidates);

  return content.slice(startIdx, endIdx).trim();
}

/**
 * Extract category from MDX content.
 * Returns null if no category is defined.
 * @param {string} content
 * @returns {string | null}
 */
function extractCategory(content) {
  const categoryMatch = content.match(/\*\*Category:\*\*\s*(.+?)(?:\n|$)/);
  if (!categoryMatch) return null;
  return categoryMatch[1].trim();
}

/**
 * Extract the full Quick Start section (preserving heading and all content).
 * @param {string} content
 * @returns {{ heading: string, content: string } | null}
 */
function extractQuickStart(content) {
  const quickStartMatch = content.match(/^(##\s+Quick\s*Start)\s*$/im);
  if (!quickStartMatch) return null;

  const heading = quickStartMatch[1].trim();
  const afterQS = content.slice(
    quickStartMatch.index + quickStartMatch[0].length,
  );
  const nextH2 = afterQS.match(/^##\s+/m);
  const sectionContent = nextH2 ? afterQS.slice(0, nextH2.index) : afterQS;

  return { heading, content: sectionContent.trim() };
}

/**
 * Extract examples grouped by heading with their Canvas references.
 * @param {string} content
 * @returns {Array<{heading: string, items: Array<{description: string, canvasRef: CanvasRef}>}>}
 */
function extractExamples(content) {
  const examplesMatch = content.match(/^##\s+Examples\s*$/m);
  if (!examplesMatch) return [];

  const afterExamples = content.slice(
    examplesMatch.index + examplesMatch[0].length,
  );
  // End at next ## heading (Props, Translation keys, etc.)
  const nextH2 = afterExamples.match(/^##\s+/m);
  const examplesSection = nextH2
    ? afterExamples.slice(0, nextH2.index)
    : afterExamples;

  /** @type {Array<{heading: string, items: Array<{description: string, canvasRef: CanvasRef}>}>} */
  const examples = [];

  // Split by ### headings
  const headingRegex = /^###\s+(.+)$/gm;
  /** @type {RegExpExecArray | null} */
  let headingMatch;
  const headings = [];

  while ((headingMatch = headingRegex.exec(examplesSection)) !== null) {
    headings.push({
      title: headingMatch[1].trim(),
      index: headingMatch.index + headingMatch[0].length,
    });
  }

  for (let i = 0; i < headings.length; i++) {
    if (headings[i].title.toLowerCase() === "interactive demo") continue;

    const start = headings[i].index;
    const end =
      i + 1 < headings.length
        ? headings[i + 1].index - headings[i + 1].title.length - 4
        : examplesSection.length;
    const block = examplesSection.slice(start, end);

    // Split block by <Canvas .../> elements, capturing the description before each
    const canvasRegex = /<Canvas\s+of=\{(\w+)\.(\w+)\}\s*\/>/g;
    /** @type {Array<{description: string, canvasRef: CanvasRef | null}>} */
    const items = [];
    let lastIndex = 0;
    /** @type {RegExpExecArray | null} */
    let canvasMatch;
    while ((canvasMatch = canvasRegex.exec(block)) !== null) {
      const description = block.slice(lastIndex, canvasMatch.index).trim();
      items.push({
        description,
        canvasRef: {
          alias: canvasMatch[1],
          exportName: canvasMatch[2],
          heading: headings[i].title,
        },
      });
      lastIndex = canvasMatch.index + canvasMatch[0].length;
    }

    // If no Canvas found, still capture the block as a prose-only item
    if (items.length === 0) {
      const prose = block.trim();
      if (prose) {
        items.push({ description: prose, canvasRef: null });
      }
    } else {
      // Capture any trailing text after the last Canvas as a prose-only item
      const trailing = block.slice(lastIndex).trim();
      if (trailing) {
        items.push({ description: trailing, canvasRef: null });
      }
    }

    if (items.length > 0) {
      examples.push({
        heading: headings[i].title,
        items,
      });
    }
  }

  return examples;
}

/**
 * Extract ArgType references from the Props section.
 * @param {string} content
 * @returns {ArgTypeRef[]}
 */
function extractArgTypeRefs(content) {
  const propsMatch = content.match(/^##\s+Props\s*$/m);
  if (!propsMatch) return [];

  const afterProps = content.slice(propsMatch.index + propsMatch[0].length);
  const nextH2 = afterProps.match(/^##\s+/m);
  const propsSection = nextH2 ? afterProps.slice(0, nextH2.index) : afterProps;

  /** @type {ArgTypeRef[]} */
  const refs = [];
  const headingRegex = /^###\s+(.+)$/gm;
  const argTypeOnlyRegex = /<ArgTypes[\s\S]*?of=\{(\w+)\}[\s\S]*?\/>/g;

  const headingsInSection = [];
  let hMatch;
  while ((hMatch = headingRegex.exec(propsSection)) !== null) {
    headingsInSection.push({ title: hMatch[1].trim(), index: hMatch.index });
  }

  let aMatch;
  while ((aMatch = argTypeOnlyRegex.exec(propsSection)) !== null) {
    let heading = null;
    for (const h of headingsInSection) {
      if (h.index < aMatch.index) heading = h.title;
    }
    refs.push({ alias: aMatch[1], heading });
  }

  return refs;
}

/**
 * Extract a named section (## SectionName) content.
 * @param {string} content
 * @param {string} sectionName
 * @returns {string | null}
 */
function extractSection(content, sectionName) {
  const regex = new RegExp(`^##\\s+${sectionName}\\s*$`, "m");
  const match = regex.exec(content);
  if (!match) return null;

  const afterSection = content.slice(match.index + match[0].length);
  const nextH2 = afterSection.match(/^##\s+/m);
  const sectionContent = nextH2
    ? afterSection.slice(0, nextH2.index).trim()
    : afterSection.trim();
  return sectionContent || null;
}

const KNOWN_SECTIONS = new Set([
  "contents",
  "quick start",
  "quickstart",
  "examples",
  "props",
  "translation keys",
  "designer notes",
  "related components",
  "ref methods",
  "list of icons",
]);

/**
 * Extract sections that are not in the known/handled set.
 * @param {string} content
 * @returns {Array<{title: string, content: string}>}
 */
function extractOtherSections(content) {
  const h2Regex = /^##\s+(.+)$/gm;
  /** @type {Array<{title: string, index: number, endOfHeading: number}>} */
  const allH2 = [];
  let m;
  while ((m = h2Regex.exec(content)) !== null) {
    allH2.push({
      title: m[1].trim(),
      index: m.index,
      endOfHeading: m.index + m[0].length,
    });
  }

  /** @type {Array<{title: string, content: string}>} */
  const others = [];
  for (let i = 0; i < allH2.length; i++) {
    if (KNOWN_SECTIONS.has(allH2[i].title.toLowerCase())) continue;
    const start = allH2[i].endOfHeading;
    const end = i + 1 < allH2.length ? allH2[i + 1].index : content.length;
    const sectionContent = content.slice(start, end).trim();
    if (sectionContent) {
      others.push({ title: allH2[i].title, content: sectionContent });
    }
  }
  return others;
}

// ─── Story Source Extraction ────────────────────────────────────────────────

/**
 * Get the full source text of a named export from a stories file.
 * @param {string} filePath
 * @param {string} exportName
 * @returns {string | null}
 */
function getStoryExportSource(filePath, exportName) {
  const sourceFile =
    project.getSourceFile(filePath) ||
    project.addSourceFileAtPathIfExists(filePath);
  if (!sourceFile) return null;

  const exported = sourceFile.getExportedDeclarations();
  const declarations = exported.get(exportName);
  if (!declarations || declarations.length === 0) return null;

  for (const declaration of declarations) {
    if (declaration.isKind(SyntaxKind.VariableDeclaration)) {
      // Get the full variable statement (export const X = ...)
      const statement = declaration.getVariableStatement();
      if (statement) {
        return statement.getText();
      }
      return `export const ${exportName} = ${declaration.getInitializer()?.getText() ?? "undefined"};`;
    }
    if (declaration.isKind(SyntaxKind.FunctionDeclaration)) {
      return declaration.getText();
    }
  }

  return null;
}

// ─── Props Extraction (reused from build_skills.mjs) ────────────────────────

/**
 * Resolve a module specifier relative to a base file path.
 * @param {string} baseFilePath
 * @param {string} moduleSpecifier
 * @returns {string | null}
 */
function resolveModulePathFrom(baseFilePath, moduleSpecifier) {
  const basePath = path.resolve(path.dirname(baseFilePath), moduleSpecifier);
  const candidates = [];

  if (existsSync(basePath)) {
    const stats = statSync(basePath);
    if (stats.isFile()) {
      candidates.push(basePath);
    }
  }

  candidates.push(`${basePath}.ts`, `${basePath}.tsx`);
  candidates.push(path.join(basePath, "index.ts"));
  candidates.push(path.join(basePath, "index.tsx"));

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Return the directory for a resolved module path.
 * @param {string} modulePath
 * @returns {string}
 */
function getModuleDir(modulePath) {
  if (existsSync(modulePath)) {
    return modulePath.endsWith(".ts") || modulePath.endsWith(".tsx")
      ? path.dirname(modulePath)
      : modulePath;
  }
  return path.dirname(modulePath);
}

/**
 * Find a type/interface definition by name in a list of files.
 * @param {string[]} filePaths
 * @param {string} typeName
 * @returns {PropsDefinition | null}
 */
function findTypeDefinitionInFiles(filePaths, typeName) {
  for (const filePath of filePaths) {
    const sourceFile =
      project.getSourceFile(filePath) ||
      project.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) continue;

    const interfaceMatch = sourceFile.getInterface(typeName);
    if (interfaceMatch) {
      return { name: interfaceMatch.getName(), node: interfaceMatch };
    }
    const aliasMatch = sourceFile.getTypeAlias(typeName);
    if (aliasMatch) {
      return { name: aliasMatch.getName(), node: aliasMatch };
    }
  }
  return null;
}

/**
 * Resolve props definition for a component, following type re-exports.
 * @param {string} modulePath
 * @param {string[]} moduleFiles
 * @param {string} propsName
 * @returns {PropsDefinition | null}
 */
function resolvePropsDefinition(modulePath, moduleFiles, propsName) {
  const directMatch = findTypeDefinitionInFiles(moduleFiles, propsName);
  if (directMatch) return directMatch;

  const entryFile =
    project.getSourceFile(modulePath) ||
    project.addSourceFileAtPathIfExists(modulePath);
  if (!entryFile) return null;

  for (const exportDecl of entryFile.getExportDeclarations()) {
    if (!exportDecl.isTypeOnly()) continue;
    const moduleSpecifier = exportDecl.getModuleSpecifierValue();
    if (!moduleSpecifier) continue;

    for (const namedExport of exportDecl.getNamedExports()) {
      const alias = namedExport.getAliasNode()?.getText();
      const exportedName = namedExport.getName();
      if (alias !== propsName && exportedName !== propsName) continue;

      const targetName = alias ? exportedName : propsName;
      const resolved = resolveModulePathFrom(modulePath, moduleSpecifier);
      if (!resolved) continue;

      const targetFiles = fg
        .sync(["**/*.{ts,tsx}"], {
          cwd: getModuleDir(resolved),
          absolute: true,
          ignore: [
            "**/*.spec.*",
            "**/*.test.*",
            "**/*.stories.*",
            "**/*.pw.*",
            "**/*.mdx",
          ],
        })
        .sort();

      const resolvedDefinition = findTypeDefinitionInFiles(
        targetFiles,
        targetName,
      );
      if (resolvedDefinition) return resolvedDefinition;
    }
  }

  return null;
}

/**
 * Extract prop metadata from a props definition.
 * @param {PropsDefinition} propsDefinition
 * @param {Map<string, string>} defaultsMap
 * @returns {PropInfo[]}
 */
function extractPropsFromDefinition(propsDefinition, defaultsMap) {
  const type = propsDefinition.node.getType();
  return type
    .getProperties()
    .filter((symbol) => {
      // Exclude props whose declaration originates from node_modules (React HTML attrs, etc.)
      const declarations = symbol.getDeclarations();
      if (declarations.length === 0) return false;
      return declarations.some((decl) => {
        const filePath = decl.getSourceFile().getFilePath();
        return !filePath.includes("node_modules");
      });
    })
    .map((symbol) => {
      const declaration = symbol
        .getDeclarations()
        .find(
          (decl) =>
            decl.isKind(SyntaxKind.PropertySignature) ||
            decl.isKind(SyntaxKind.PropertyDeclaration),
        );
      const propType = declaration
        ? declaration.getType()
        : symbol.getTypeAtLocation(propsDefinition.node);
      const literals = getLiteralUnionValues(propType);
      const jsDocs = declaration?.getJsDocs?.() ?? [];
      const description = jsDocs
        .map((doc) => doc.getDescription().trim())
        .filter(Boolean)
        .join(" ");
      const deprecationInfo = getDeprecationFromJsDocs(jsDocs);
      const required = declaration?.isKind(SyntaxKind.PropertySignature)
        ? !declaration.hasQuestionToken()
        : true;

      const resolvedText = propType.getText(
        declaration ?? propsDefinition.node,
      );
      const typeNode = declaration?.getTypeNode?.();
      const typeText = (
        resolvedText.includes("import(") && typeNode
          ? typeNode.getText()
          : resolvedText
      )
        .replace(/\s+/g, " ")
        .trim();

      return {
        name: symbol.getName(),
        type: typeText,
        required,
        literals,
        description: description || null,
        defaultValue: defaultsMap.get(symbol.getName()) ?? null,
        deprecated: deprecationInfo.deprecated,
        deprecationReason: deprecationInfo.reason,
      };
    });
}

/**
 * Return literal values for simple union types.
 * @param {import("ts-morph").Type} type
 * @returns {Array<string | number | boolean> | null}
 */
function getLiteralUnionValues(type) {
  if (!type.isUnion()) return null;
  const unionTypes = type.getUnionTypes();
  /** @type {Array<string | number | boolean>} */
  const literals = [];

  for (const unionType of unionTypes) {
    if (unionType.isStringLiteral()) {
      const v = unionType.getLiteralValue();
      if (v === undefined) return null;
      literals.push(String(v));
    } else if (unionType.isNumberLiteral()) {
      const v = unionType.getLiteralValue();
      if (v === undefined) return null;
      literals.push(typeof v === "number" ? v : String(v));
    } else if (unionType.isBooleanLiteral()) {
      const v = unionType.getLiteralValue();
      if (v === undefined) return null;
      literals.push(Boolean(v));
    } else {
      return null;
    }
  }

  return literals;
}

/**
 * Collect default prop values from destructured parameters and defaultProps.
 * @param {string[]} filePaths
 * @param {string} componentName
 * @returns {Map<string, string>}
 */
function collectDefaultProps(filePaths, componentName) {
  const defaults = new Map();

  for (const filePath of filePaths) {
    const sourceFile =
      project.getSourceFile(filePath) ||
      project.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) continue;

    const defaultExportSymbol = sourceFile.getDefaultExportSymbol();
    if (defaultExportSymbol) {
      for (const declaration of defaultExportSymbol.getDeclarations()) {
        for (const [key, value] of extractDefaultsFromDeclaration(
          declaration,
        ).entries()) {
          defaults.set(key, value);
        }
      }
    }

    const namedFunction = sourceFile
      .getFunctions()
      .find((fn) => fn.getName() === componentName);
    if (namedFunction) {
      for (const [key, value] of extractDefaultsFromDeclaration(
        namedFunction,
      ).entries()) {
        defaults.set(key, value);
      }
    }

    const namedVariable = sourceFile
      .getVariableDeclarations()
      .find((decl) => decl.getName() === componentName);
    if (namedVariable) {
      for (const [key, value] of extractDefaultsFromDeclaration(
        namedVariable,
      ).entries()) {
        defaults.set(key, value);
      }
    }

    const assignments = sourceFile.getDescendantsOfKind(
      SyntaxKind.BinaryExpression,
    );
    for (const assignment of assignments) {
      const left = assignment.getLeft();
      const right = assignment.getRight();
      if (!right || !right.isKind(SyntaxKind.ObjectLiteralExpression)) continue;
      if (!left.isKind(SyntaxKind.PropertyAccessExpression)) continue;
      if (
        left.getExpression().getText() !== componentName ||
        left.getName() !== "defaultProps"
      )
        continue;

      for (const prop of right.getProperties()) {
        if (!prop.isKind(SyntaxKind.PropertyAssignment)) continue;
        const initializer = prop.getInitializer();
        if (initializer) {
          defaults.set(prop.getName(), initializer.getText());
        }
      }
    }
  }

  return defaults;
}

/**
 * Extract defaults from a component declaration.
 * @param {import("ts-morph").Node} declaration
 * @returns {Map<string, string>}
 */
function extractDefaultsFromDeclaration(declaration) {
  const defaults = new Map();

  if (declaration.isKind(SyntaxKind.FunctionDeclaration)) {
    extractFromParameters(declaration.getParameters(), defaults);
  }

  if (declaration.isKind(SyntaxKind.VariableDeclaration)) {
    const initializer = declaration.getInitializer();
    if (
      initializer &&
      (initializer.isKind(SyntaxKind.ArrowFunction) ||
        initializer.isKind(SyntaxKind.FunctionExpression))
    ) {
      extractFromParameters(initializer.getParameters(), defaults);
    }
  }

  if (
    declaration.isKind(SyntaxKind.FunctionExpression) ||
    declaration.isKind(SyntaxKind.ArrowFunction)
  ) {
    extractFromParameters(declaration.getParameters(), defaults);
  }

  return defaults;
}

/**
 * Extract default values from the first object parameter binding.
 * @param {import("ts-morph").ParameterDeclaration[]} parameters
 * @param {Map<string, string>} defaults
 */
function extractFromParameters(parameters, defaults) {
  if (!parameters || parameters.length === 0) return;
  const firstParam = parameters[0];
  const nameNode = firstParam.getNameNode();
  if (!nameNode || !nameNode.isKind(SyntaxKind.ObjectBindingPattern)) return;

  for (const element of nameNode.getElements()) {
    const initializer = element.getInitializer();
    if (!initializer) continue;
    const propName =
      element.getPropertyNameNode()?.getText() ?? element.getName();
    defaults.set(propName, initializer.getText());
  }
}

/**
 * Extract deprecation metadata from a JSDoc array.
 * @param {import("ts-morph").JSDoc[]} jsDocs
 * @returns {{deprecated: boolean, reason: string | null}}
 */
function getDeprecationFromJsDocs(jsDocs) {
  for (const doc of jsDocs) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === "deprecated") {
        const comment = normalizeJsDocComment(tag.getComment());
        const docComment = doc.getDescription().trim();
        return { deprecated: true, reason: comment || docComment || null };
      }
    }
  }
  return { deprecated: false, reason: null };
}

/**
 * @param {ReturnType<import("ts-morph").JSDocTag["getComment"]>} comment
 * @returns {string | null}
 */
function normalizeJsDocComment(comment) {
  if (!comment) return null;
  if (typeof comment === "string") return comment.trim() || null;
  if (Array.isArray(comment)) {
    return (
      comment
        .map((part) => part?.getText() ?? "")
        .join("")
        .trim() || null
    );
  }
  return null;
}

// ─── Props resolution from stories file ─────────────────────────────────────

/**
 * Resolve component name and module from a stories file's default export.
 * @param {string} storiesFilePath
 * @returns {{componentName: string | null, componentModule: string | null}}
 */
function resolveComponentFromStories(storiesFilePath) {
  const sourceFile =
    project.getSourceFile(storiesFilePath) ||
    project.addSourceFileAtPathIfExists(storiesFilePath);
  if (!sourceFile) return { componentName: null, componentModule: null };

  // Look for default export (meta)
  const defaultExport = sourceFile.getDefaultExportSymbol();
  if (!defaultExport) {
    // Try export default meta pattern (export = ... or export default ...)
    const exportAssignment = sourceFile
      .getExportAssignments()
      .find((a) => !a.isExportEquals());
    if (!exportAssignment)
      return { componentName: null, componentModule: null };

    const expression = exportAssignment.getExpression();
    const objectLiteral = resolveObjectLiteral(expression, sourceFile);
    if (!objectLiteral) return { componentName: null, componentModule: null };

    return extractComponentFromMetaObject(objectLiteral, sourceFile);
  }

  // Check variable declarations for the meta
  for (const decl of defaultExport.getDeclarations()) {
    if (decl.isKind(SyntaxKind.ExportAssignment)) {
      const expression = decl.getExpression();
      const objectLiteral = resolveObjectLiteral(expression, sourceFile);
      if (objectLiteral) {
        return extractComponentFromMetaObject(objectLiteral, sourceFile);
      }
    }
  }

  return { componentName: null, componentModule: null };
}

/**
 * @param {import("ts-morph").ObjectLiteralExpression} objectLiteral
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {{componentName: string | null, componentModule: string | null}}
 */
function extractComponentFromMetaObject(objectLiteral, sourceFile) {
  const componentProp = objectLiteral.getProperty("component");
  if (!componentProp?.isKind(SyntaxKind.PropertyAssignment)) {
    return { componentName: null, componentModule: null };
  }

  const initializer = componentProp.getInitializer();
  const componentName = getIdentifierText(initializer);
  if (!componentName) return { componentName: null, componentModule: null };

  const componentModule = resolveImportModule(sourceFile, componentName);
  return { componentName, componentModule };
}

/**
 * @param {import("ts-morph").Expression | undefined} expression
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {import("ts-morph").ObjectLiteralExpression | null}
 */
function resolveObjectLiteral(expression, sourceFile) {
  if (!expression) return null;
  if (expression.isKind(SyntaxKind.ObjectLiteralExpression)) return expression;
  if (expression.isKind(SyntaxKind.Identifier)) {
    const name = expression.getText();
    const variable = sourceFile.getVariableDeclaration(name);
    if (variable) {
      const initializer = variable.getInitializer();
      if (initializer) return resolveObjectLiteral(initializer, sourceFile);
    }
  }
  if (
    expression.isKind(SyntaxKind.SatisfiesExpression) ||
    expression.isKind(SyntaxKind.AsExpression)
  ) {
    return resolveObjectLiteral(expression.getExpression(), sourceFile);
  }
  return null;
}

/**
 * @param {import("ts-morph").Node | undefined} node
 * @returns {string | null}
 */
function getIdentifierText(node) {
  if (!node) return null;
  if (node.isKind(SyntaxKind.Identifier)) return node.getText();
  if (node.isKind(SyntaxKind.AsExpression))
    return getIdentifierText(node.getExpression());
  if (node.isKind(SyntaxKind.TypeAssertionExpression))
    return getIdentifierText(node.getExpression());
  return null;
}

/**
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} identifierName
 * @returns {string | null}
 */
function resolveImportModule(sourceFile, identifierName) {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const defaultImport = importDecl.getDefaultImport();
    if (defaultImport?.getText() === identifierName) return moduleSpecifier;
    for (const namedImport of importDecl.getNamedImports()) {
      const importName = namedImport.getName();
      const alias = namedImport.getAliasNode()?.getText();
      if (importName === identifierName || alias === identifierName)
        return moduleSpecifier;
    }
  }
  return null;
}

/**
 * Resolve props for a given stories file alias.
 * @param {string} storiesFilePath
 * @returns {PropInfo[]}
 */
function resolvePropsForStories(storiesFilePath) {
  const { componentName, componentModule } =
    resolveComponentFromStories(storiesFilePath);
  if (!componentName || !componentModule) return [];

  const modulePath = resolveModulePathFrom(storiesFilePath, componentModule);
  if (!modulePath) return [];

  const moduleDir = getModuleDir(modulePath);
  const moduleFiles = fg
    .sync(["**/*.{ts,tsx}"], {
      cwd: moduleDir,
      absolute: true,
      ignore: [
        "**/*.spec.*",
        "**/*.test.*",
        "**/*.stories.*",
        "**/*.pw.*",
        "**/*.mdx",
        "**/__internal__/**",
        "**/__next__/**",
      ],
    })
    .sort();

  for (const filePath of moduleFiles) {
    project.addSourceFileAtPathIfExists(filePath);
  }

  const capitalizedName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const propsName = `${capitalizedName}Props`;
  const propsDefinition = resolvePropsDefinition(
    modulePath,
    moduleFiles,
    propsName,
  );
  if (!propsDefinition) return [];

  const defaultsMap = collectDefaultProps(moduleFiles, componentName);
  return extractPropsFromDefinition(propsDefinition, defaultsMap);
}

// ─── Link Transformation ────────────────────────────────────────────────────

/**
 * Map of Storybook documentation slugs to their reference file paths (relative to a component's index.md).
 * @type {Map<string, string>}
 */
const referenceSlugMap = new Map([
  ["documentation-validations", "../../references/docs/validations.md"],
  ["documentation-i18n", "../../references/docs/i18n.md"],
  ["documentation-usage", "../../references/docs/usage.md"],
  ["documentation-installation", "../../references/docs/installation.md"],
  [
    "documentation-recommended-practices",
    "../../references/docs/recommended-practices.md",
  ],
  [
    "documentation-usage-with-routing",
    "../../references/docs/usage-with-routing.md",
  ],
  [
    "documentation-deprecation-migration",
    "../../references/docs/deprecation-migration.md",
  ],
]);

/**
 * Transform Storybook links to skill-relative links or plain text.
 * @param {string} content
 * @returns {string}
 */
function transformLinks(content) {
  // Handle markdown links: [text](../?path=/docs/slug--docs) or [text](?path=/docs/slug--docs)
  let result = content.replace(
    /\[([^\]]+)\]\(\.{0,2}\/?\??path=\/(?:docs|story)\/([^#)]+?)(?:--(?:docs|[^#)]*))?(?:#[^)]*)?\)/g,
    (match, text, slug) => {
      if (availableSlugs.has(slug)) {
        return `[${text}](../${slug}/index.md)`;
      }
      if (referenceSlugMap.has(slug)) {
        return `[${text}](${referenceSlugMap.get(slug)})`;
      }
      return text;
    },
  );

  // Handle HTML <a> tags with storybook paths
  result = result.replace(
    /<a[^>]*href="[^"]*\?path=\/(?:docs|story)\/([^#"]+?)(?:--(?:docs|[^#"]*))?(?:#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g,
    (match, slug, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      if (availableSlugs.has(slug)) {
        return `[${cleanText}](../${slug}/index.md)`;
      }
      if (referenceSlugMap.has(slug)) {
        return `[${cleanText}](${referenceSlugMap.get(slug)})`;
      }
      return cleanText;
    },
  );

  return result;
}

// ─── Reference Doc Link Transformation ──────────────────────────────────────

/**
 * Map of Storybook documentation slugs to self-relative paths for use within references/docs/.
 * @type {Map<string, string>}
 */
const referenceDocSelfSlugMap = new Map([
  ["documentation-validations", "./validations.md"],
  ["documentation-i18n", "./i18n.md"],
  ["documentation-usage", "./usage.md"],
  ["documentation-installation", "./installation.md"],
  ["documentation-recommended-practices", "./recommended-practices.md"],
  ["documentation-usage-with-routing", "./usage-with-routing.md"],
  ["documentation-deprecation-migration", "./deprecation-migration.md"],
  ["documentation-hooks-usemediaquery", "./useMediaQuery.md"],
]);

/**
 * Transform Storybook links for reference doc context (references/docs/).
 * Component slugs → ../../components/{slug}/index.md
 * Reference doc slugs → ./filename.md
 * @param {string} content
 * @returns {string}
 */
function transformLinksForRefDoc(content) {
  let result = content.replace(
    /\[([^\]]+)\]\(\.{0,2}\/?\??path=\/(?:docs|story)\/([^#)]+?)(?:--(?:docs|[^#)]*))?(?:#[^)]*)?\)/g,
    (match, text, slug) => {
      if (availableSlugs.has(slug)) {
        return `[${text}](../../components/${slug}/index.md)`;
      }
      if (referenceDocSelfSlugMap.has(slug)) {
        return `[${text}](${referenceDocSelfSlugMap.get(slug)})`;
      }
      return text;
    },
  );

  result = result.replace(
    /<a[^>]*href="[^"]*\?path=\/(?:docs|story)\/([^#"]+?)(?:--(?:docs|[^#"]*))?(?:#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g,
    (match, slug, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      if (availableSlugs.has(slug)) {
        return `[${cleanText}](../../components/${slug}/index.md)`;
      }
      if (referenceDocSelfSlugMap.has(slug)) {
        return `[${cleanText}](${referenceDocSelfSlugMap.get(slug)})`;
      }
      return cleanText;
    },
  );

  return result;
}

/**
 * Extract PropInfo from a stories file's meta argTypes object (fallback when no component prop).
 * @param {string} storiesFilePath
 * @returns {PropInfo[]}
 */
function resolveArgTypesFromMeta(storiesFilePath) {
  const sourceFile =
    project.getSourceFile(storiesFilePath) ||
    project.addSourceFileAtPathIfExists(storiesFilePath);
  if (!sourceFile) return [];

  let metaObject = null;
  const defaultExport = sourceFile.getDefaultExportSymbol();
  if (defaultExport) {
    for (const decl of defaultExport.getDeclarations()) {
      if (decl.isKind(SyntaxKind.ExportAssignment)) {
        metaObject = resolveObjectLiteral(decl.getExpression(), sourceFile);
        if (metaObject) break;
      }
    }
  }
  if (!metaObject) {
    const exportAssignment = sourceFile
      .getExportAssignments()
      .find((a) => !a.isExportEquals());
    if (exportAssignment) {
      metaObject = resolveObjectLiteral(
        exportAssignment.getExpression(),
        sourceFile,
      );
    }
  }
  if (!metaObject) return [];

  const argTypesProp = metaObject.getProperty("argTypes");
  if (!argTypesProp || !argTypesProp.isKind(SyntaxKind.PropertyAssignment))
    return [];

  const argTypesObj = argTypesProp.getInitializer();
  if (!argTypesObj || !argTypesObj.isKind(SyntaxKind.ObjectLiteralExpression))
    return [];

  /** @type {PropInfo[]} */
  const props = [];

  for (const prop of argTypesObj.getProperties()) {
    if (!prop.isKind(SyntaxKind.PropertyAssignment)) continue;
    const propName = prop.getName();
    const propConfig = prop.getInitializer();
    if (!propConfig || !propConfig.isKind(SyntaxKind.ObjectLiteralExpression))
      continue;

    let typeName = "any";
    let required = false;
    /** @type {string | null} */
    let description = null;
    /** @type {string | null} */
    let defaultValue = null;

    const typeProp = propConfig.getProperty("type");
    if (typeProp && typeProp.isKind(SyntaxKind.PropertyAssignment)) {
      const typeInit = typeProp.getInitializer();
      if (typeInit && typeInit.isKind(SyntaxKind.ObjectLiteralExpression)) {
        const typeNameProp = typeInit.getProperty("name");
        if (
          typeNameProp &&
          typeNameProp.isKind(SyntaxKind.PropertyAssignment)
        ) {
          const n = typeNameProp.getInitializer();
          if (n) typeName = n.getText().replace(/^['"`]|['"`]$/g, "");
        }
        const typeRequiredProp = typeInit.getProperty("required");
        if (
          typeRequiredProp &&
          typeRequiredProp.isKind(SyntaxKind.PropertyAssignment)
        ) {
          const r = typeRequiredProp.getInitializer();
          if (r) required = r.getText() === "true";
        }
      } else if (typeInit) {
        typeName = typeInit.getText().replace(/^['"`]|['"`]$/g, "");
      }
    }

    const descProp = propConfig.getProperty("description");
    if (descProp && descProp.isKind(SyntaxKind.PropertyAssignment)) {
      const d = descProp.getInitializer();
      if (d) description = d.getText().replace(/^['"`]|['"`]$/g, "");
    }

    const tableProp = propConfig.getProperty("table");
    if (tableProp && tableProp.isKind(SyntaxKind.PropertyAssignment)) {
      const tableInit = tableProp.getInitializer();
      if (tableInit && tableInit.isKind(SyntaxKind.ObjectLiteralExpression)) {
        const dvProp = tableInit.getProperty("defaultValue");
        if (dvProp && dvProp.isKind(SyntaxKind.PropertyAssignment)) {
          const dvInit = dvProp.getInitializer();
          if (dvInit && dvInit.isKind(SyntaxKind.ObjectLiteralExpression)) {
            const summaryProp = dvInit.getProperty("summary");
            if (
              summaryProp &&
              summaryProp.isKind(SyntaxKind.PropertyAssignment)
            ) {
              const s = summaryProp.getInitializer();
              if (s) defaultValue = s.getText().replace(/^['"`]|['"`]$/g, "");
            }
          }
        }
      }
    }

    props.push({
      name: propName,
      type: typeName,
      required,
      literals: null,
      description,
      defaultValue,
      deprecated: false,
      deprecationReason: null,
    });
  }

  return props;
}

/**
 * Process a reference MDX file: strip Storybook boilerplate, expand Canvas/ArgTypes, transform links.
 * Canvas example files are added to wouldWrite as a side effect.
 * @param {string} rawContent
 * @param {string} sourcePath
 * @returns {string}
 */
function parseAndRenderReferenceMdx(rawContent, sourcePath) {
  const mdxDir = path.dirname(sourcePath);
  const content = rawContent.replace(/\r\n/g, "\n");

  // Extract storiesImports before stripping import lines
  const storiesImports = new Map();
  const namespaceImportRegex =
    /^import\s+\*\s+as\s+(\w+)\s+from\s+["']([^"']+)["']/;
  const defaultImportRegex = /^import\s+(\w+)\s+from\s+["']([^"']+)["']/;
  for (const line of content.split("\n")) {
    const nsMatch = line.match(namespaceImportRegex);
    if (nsMatch) {
      storiesImports.set(nsMatch[1], nsMatch[2]);
      continue;
    }
    const defMatch = line.match(defaultImportRegex);
    if (defMatch && defMatch[2].includes(".stories")) {
      storiesImports.set(defMatch[1], defMatch[2]);
    }
  }

  // Resolve stories files to absolute paths
  /** @type {Map<string, string>} alias -> absolute path */
  const resolvedStories = new Map();
  for (const [alias, relativePath] of storiesImports.entries()) {
    const resolved = resolveStoriesPath(mdxDir, relativePath);
    if (resolved) {
      resolvedStories.set(alias, resolved);
      project.addSourceFileAtPathIfExists(resolved);
    }
  }

  let result = content;

  // Strip top-level import lines (those outside fenced code blocks)
  // Process line by line to avoid stripping import statements inside code examples
  {
    const lines = result.split("\n");
    let inCodeBlock = false;
    result = lines
      .filter((line) => {
        if (line.startsWith("```")) inCodeBlock = !inCodeBlock;
        if (inCodeBlock) return true;
        return !/^import\s/.test(line);
      })
      .join("\n");
  }

  // Strip <Meta .../> tags
  result = result.replace(/<Meta\s[^>]*\/>\s*\n?/g, "");

  // Strip ## Contents section (heading + all content until next ## heading)
  const contentsMatch = result.match(/^## Contents\s*$/m);
  if (contentsMatch) {
    const afterContents = result.slice(
      contentsMatch.index + contentsMatch[0].length,
    );
    const nextH2 = afterContents.match(/^## /m);
    result =
      result.slice(0, contentsMatch.index) +
      (nextH2 ? afterContents.slice(nextH2.index) : "");
  }

  // Replace <Canvas of={Alias.ExportName}/> with example file references
  result = result.replace(
    /<Canvas\s+of=\{(\w+)\.(\w+)\}\s*\/>/g,
    (match, alias, exportName) => {
      const storiesPath = resolvedStories.get(alias);
      if (!storiesPath) {
        // eslint-disable-next-line no-console -- build warning
        console.warn(`[ref] Cannot resolve stories alias: ${alias}`);
        return "";
      }
      const source = getStoryExportSource(storiesPath, exportName);
      if (!source) {
        // eslint-disable-next-line no-console -- build warning
        console.warn(
          `[ref] Cannot find export "${exportName}" in ${path.basename(storiesPath)}`,
        );
        return "";
      }
      const fileName = `${exportName}.md`;
      const fileContent = "```tsx\n" + source + "\n```";
      wouldWrite.push({
        path: path.join(referencesExamplesDir, fileName),
        content: fileContent,
      });
      return `\nSee: \`examples/${fileName}\``;
    },
  );

  // Replace <ArgTypes of={alias}/> with rendered props table
  result = result.replace(
    /<ArgTypes[\s\S]*?of=\{(\w+)\}[\s\S]*?\/>/g,
    (match, alias) => {
      const storiesPath = resolvedStories.get(alias);
      if (!storiesPath) {
        // eslint-disable-next-line no-console -- build warning
        console.warn(`[ref] Cannot resolve ArgTypes alias: ${alias}`);
        return "";
      }
      let props = resolvePropsForStories(storiesPath);
      if (!props.length) {
        props = resolveArgTypesFromMeta(storiesPath);
      }
      return renderPropsTable(props);
    },
  );

  // Transform Storybook links to skill-relative paths
  result = transformLinksForRefDoc(result);

  // Collapse 3+ consecutive blank lines to 2
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim() + "\n";
}

// ─── Rendering ──────────────────────────────────────────────────────────────

/**
 * Render the props table.
 * @param {PropInfo[]} props
 * @returns {string}
 */
function renderPropsTable(props) {
  if (!props.length) return "No props metadata found.\n";

  const sortedProps = [...props].sort((a, b) => {
    if (a.deprecated !== b.deprecated) return a.deprecated ? 1 : -1;
    if (a.required !== b.required) return a.required ? -1 : 1;
    const groupOrder = (/** @type {string} */ name) =>
      name.startsWith("data-") ? 1 : name.startsWith("aria-") ? 2 : 0;
    const ga = groupOrder(a.name);
    const gb = groupOrder(b.name);
    if (ga !== gb) return ga - gb;
    return a.name.localeCompare(b.name);
  });

  const hasDeprecated = sortedProps.some((p) => p.deprecated);
  const lines = [];

  if (hasDeprecated) {
    lines.push(
      "| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |",
    );
    lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  } else {
    lines.push("| Name | Type | Required | Literals | Description | Default |");
    lines.push("| --- | --- | --- | --- | --- | --- |");
  }

  for (const prop of sortedProps) {
    const literals = prop.literals?.join(" | ") ?? "";
    const description = prop.description?.replace(/\s+/g, " ") ?? "";
    const defaultValue = (prop.defaultValue ?? "").replace(/\r/g, "");

    if (hasDeprecated) {
      lines.push(
        `| ${prop.name} | ${escapePipes(prop.type)} | ${prop.required ? "Yes" : "No"} | ${escapePipes(literals)} | ${prop.deprecated ? "Yes" : ""} | ${escapePipes((prop.deprecationReason ?? "").replace(/\s+/g, " ").trim())} | ${escapePipes(description)} | ${escapePipes(defaultValue)} |`,
      );
    } else {
      lines.push(
        `| ${prop.name} | ${escapePipes(prop.type)} | ${prop.required ? "Yes" : "No"} | ${escapePipes(literals)} | ${escapePipes(description)} | ${escapePipes(defaultValue)} |`,
      );
    }
  }

  return lines.join("\n") + "\n";
}

/**
 * Render the full component index.md content (no skill frontmatter).
 * @param {ParsedMdx} parsed
 * @param {Map<string, PropInfo[]>} propsMap - heading -> props
 * @param {Array<{heading: string, fileName: string | null, description: string}>} exampleFiles
 * @param {boolean} isDeprecated
 * @returns {string}
 */
function renderSkillMd(parsed, propsMap, exampleFiles, isDeprecated) {
  const lines = [`# ${parsed.componentTitle}`, ""];

  if (isDeprecated) {
    lines.push(
      "> **Deprecated** — See [`deprecation-migration.md`](../../references/docs/deprecation-migration.md)",
      "",
    );
  }

  if (parsed.description) {
    lines.push(transformLinks(parsed.description), "");
  }

  if (parsed.category) {
    lines.push(`**Category:** ${parsed.category}`, "");
  }

  if (parsed.quickStart) {
    lines.push(parsed.quickStart.heading, "", parsed.quickStart.content, "");
  }

  if (parsed.designerNotes) {
    lines.push(
      "## Designer Notes",
      "",
      transformLinks(parsed.designerNotes),
      "",
    );
  }

  if (parsed.relatedComponents) {
    lines.push(
      "## Related Components",
      "",
      transformLinks(parsed.relatedComponents),
      "",
    );
  }

  for (const section of parsed.otherSections) {
    lines.push(`## ${section.title}`, "", transformLinks(section.content), "");
  }

  if (exampleFiles.length > 0) {
    lines.push("## Examples", "");
    const byHeading = new Map();
    for (const ef of exampleFiles) {
      const existing = byHeading.get(ef.heading) ?? [];
      existing.push({ fileName: ef.fileName, description: ef.description });
      byHeading.set(ef.heading, existing);
    }

    for (const [heading, items] of byHeading.entries()) {
      lines.push(`### ${heading}`, "");
      for (const { fileName, description } of items) {
        if (description) {
          lines.push(transformLinks(description), "");
        }
        if (fileName) {
          lines.push(`See: \`examples/${fileName}\``, "");
        }
      }
    }
  }

  if (propsMap.size > 0) {
    lines.push("## Props", "");
    for (const [heading, props] of propsMap.entries()) {
      lines.push(`### ${heading}`, "");
      lines.push(renderPropsTable(props));
    }
  }

  if (parsed.refMethods) {
    lines.push("## Ref methods", "", parsed.refMethods, "");
  }

  return lines.join("\n");
}

// ─── Utilities ──────────────────────────────────────────────────────────────

/**
 * @param {string} value
 * @returns {string}
 */
function escapePipes(value) {
  return value?.replace(/\|/g, "\\|") ?? "";
}

/**
 * @param {string} value
 * @returns {string}
 */
function toKebabCase(value) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .toLowerCase();
}

/**
 * @param {string} value
 * @returns {string}
 */
function toPascalCase(value) {
  if (!value) return "";
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Resolve a stories import path to an absolute file path.
 * @param {string} mdxDir
 * @param {string} relativePath
 * @returns {string | null}
 */
function resolveStoriesPath(mdxDir, relativePath) {
  const basePath = path.resolve(mdxDir, relativePath);
  const extensions = [".ts", ".tsx", ".js", ".jsx"];

  if (existsSync(basePath)) return basePath;
  for (const ext of extensions) {
    const candidate = basePath + ext;
    if (existsSync(candidate)) return candidate;
  }
  // Try with /index
  for (const ext of extensions) {
    const candidate = path.join(basePath, `index${ext}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * Render the root SKILL.md content for the centralized carbon-react skill.
 * @returns {string}
 */
function renderSkillRootContent() {
  return [
    "---",
    "name: carbon-react",
    "description: Carbon component catalog with typed props, Storybook usage examples, and curated docs references. Use proactively when the user asks about any Carbon component and its props, which component to use for a given UI need, migrating a deprecated component, usage guidance or when implementing or reviewing any UI built with carbon-react.",
    "---",
    "",
    "# Carbon Component Catalog",
    "",
    "Use `index.md` to find a component and its description.",
    "Use `components/{slug}/index.md` for a component's props and examples.",
    "Use `components/{slug}/examples/*.md` for example source code.",
    "",
    "## Deprecated components",
    "",
    "Deprecated components are marked in `index.md` and in their file.",
    "Prefer the non-legacy version (`button`) over the legacy one (`button-legacy`) unless explicitly asked.",
    "Do not use deprecated props unless explicitly asked.",
    "For migrating a deprecated component, read `references/docs/deprecation-migration.md`.",
    "",
    "## Reference docs",
    "",
    "- `references/docs/usage.md` — general usage guide",
    "- `references/docs/installation.md` — installation",
    "- `references/docs/recommended-practices.md` — recommended practices",
    "- `references/docs/validations.md` — validation for input components",
    "- `references/docs/useMediaQuery.md` — custom React hook and a JavaScript implementation of a CSS media query",
    "- `references/docs/deprecation-migration.md` — deprecated components migration guide",
    "- `references/docs/usage-with-routing.md` — using Carbon components with routing libraries",
    "- `references/docs/i18n.md` — how localisation works in Carbon",
    "",
  ].join("\n");
}

/**
 * Render the catalog index.md listing all components with descriptions, organized by category.
 * @param {Array<{title: string, slug: string, description: string, category: string, isDeprecated: boolean}>} entries
 * @returns {string}
 */
function renderIndexContent(entries) {
  // Group entries by category
  const byCategory = new Map();
  for (const entry of entries) {
    const cat = entry.category || "Other";
    if (!byCategory.has(cat)) {
      byCategory.set(cat, []);
    }
    byCategory.get(cat).push(entry);
  }

  // Sort categories, with "Other" at the end
  const categories = Array.from(byCategory.keys()).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  const lines = ["# Carbon Component Catalog", ""];

  for (const category of categories) {
    const entries = byCategory.get(category) || [];
    // Sort entries by title within each category
    entries.sort((a, b) => a.title.localeCompare(b.title));

    lines.push(`### ${category}`, "");
    lines.push("| Component | Description | Deprecated |");
    lines.push("| --- | --- | --- |");

    for (const entry of entries) {
      const deprecatedLabel = entry.isDeprecated ? "Yes" : "No";
      const link = `[${entry.title}](components/${entry.slug}/)`;
      lines.push(
        `| ${link} | ${entry.description || ""} | ${deprecatedLabel} |`,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ─── Main Build ─────────────────────────────────────────────────────────────

/** @type {Array<{path: string, content: string}>} */
const wouldWrite = [];

/** @type {Array<{title: string, slug: string, description: string, isDeprecated: boolean}>} */
const indexEntries = [];

let processedCount = 0;
let skippedCount = 0;

for (const entry of mdxEntries) {
  const slug = mdxToSlug.get(entry.mdxPath);
  if (!slug) {
    skippedCount++;
    continue;
  }

  const mdxDir = path.dirname(entry.mdxPath);
  const parsed = parseMdxFile(entry.content);

  // Collect for catalog index
  const descOneLine = parsed.description
    .replace(/\n+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, (_, t) => t.replace(/<[^>]+>/g, ""))
    .replace(/<[^>]+>/g, "")
    .trim();
  indexEntries.push({
    title: parsed.componentTitle,
    slug,
    description: descOneLine,
    category: parsed.category,
    isDeprecated: entry.isDeprecated,
  });

  // Resolve stories files
  /** @type {Map<string, string>} alias -> absolute path */
  const resolvedStories = new Map();
  for (const [alias, relativePath] of parsed.storiesImports.entries()) {
    const resolved = resolveStoriesPath(mdxDir, relativePath);
    if (resolved) {
      resolvedStories.set(alias, resolved);
      project.addSourceFileAtPathIfExists(resolved);
    }
  }

  // Extract examples
  /** @type {Array<{heading: string, fileName: string | null, description: string}>} */
  const exampleFiles = [];

  for (const example of parsed.examples) {
    for (const item of example.items) {
      const { canvasRef, description } = item;

      if (!canvasRef) {
        // Prose-only item: no example file, just description
        exampleFiles.push({
          heading: example.heading,
          fileName: null,
          description,
        });
        continue;
      }

      const storiesPath = resolvedStories.get(canvasRef.alias);
      if (!storiesPath) {
        console.warn(
          `[${slug}] Cannot resolve stories alias: ${canvasRef.alias}`,
        );
        continue;
      }
      const source = getStoryExportSource(storiesPath, canvasRef.exportName);
      if (!source) {
        console.warn(
          `[${slug}] Cannot find export "${canvasRef.exportName}" in ${path.basename(storiesPath)}`,
        );
        continue;
      }
      const fileName = `${canvasRef.exportName}.md`;
      const fileContent = "```tsx\n" + source + "\n```";
      const outputPath = path.join(
        componentsOutDir,
        slug,
        "examples",
        fileName,
      );
      wouldWrite.push({ path: outputPath, content: fileContent });
      exampleFiles.push({ heading: example.heading, fileName, description });
    }
  }

  // Extract props
  /** @type {Map<string, PropInfo[]>} */
  const propsMap = new Map();
  for (const argTypeRef of parsed.argTypeRefs) {
    const storiesPath = resolvedStories.get(argTypeRef.alias);
    const heading =
      argTypeRef.heading ?? argTypeRef.alias.replace(/Stories$/, "");
    if (!storiesPath) {
      console.warn(
        `[${slug}] Cannot resolve ArgTypes stories alias: ${argTypeRef.alias}`,
      );
      propsMap.set(heading, []);
      continue;
    }
    const props = resolvePropsForStories(storiesPath);
    propsMap.set(heading, props);
  }

  // Render component index.md
  const skillContent = renderSkillMd(
    parsed,
    propsMap,
    exampleFiles,
    entry.isDeprecated,
  );
  wouldWrite.push({
    path: path.join(componentsOutDir, slug, "index.md"),
    content: skillContent,
  });

  processedCount++;
}

// Generate root SKILL.md, index.md, and copy references/docs
wouldWrite.push({
  path: path.join(skillsRoot, "SKILL.md"),
  content: renderSkillRootContent(),
});
wouldWrite.push({
  path: path.join(skillsRoot, "index.md"),
  content: renderIndexContent(indexEntries),
});

for (const entry of docsReferenceFiles) {
  const relativePath = typeof entry === "string" ? entry : entry.source;
  const sourcePath = path.join(repoRoot, relativePath);
  if (!existsSync(sourcePath)) {
    continue;
  }
  const refFileName =
    typeof entry === "string"
      ? path.basename(sourcePath).replace(/\.mdx?$/, ".md")
      : entry.target;
  const targetPath = path.join(referencesDir, refFileName);
  const rawContent = await fs.readFile(sourcePath, "utf8");
  const processedContent = parseAndRenderReferenceMdx(rawContent, sourcePath);
  wouldWrite.push({
    path: targetPath,
    content: processedContent,
  });
}

// ─── Write Output ───────────────────────────────────────────────────────────

if (checkMode) {
  const expectedPaths = new Set(wouldWrite.map((w) => w.path));
  /** @type {string[]} */
  const diffs = [];

  for (const { path: filePath, content } of wouldWrite) {
    let existing;
    try {
      existing = await fs.readFile(filePath, "utf8");
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        err.code === "ENOENT"
      ) {
        diffs.push(`  Missing: ${path.relative(repoRoot, filePath)}`);
        continue;
      }
      throw err;
    }
    if (existing.replace(/\r\n/g, "\n") !== content.replace(/\r\n/g, "\n")) {
      diffs.push(`  Modified: ${path.relative(repoRoot, filePath)}`);
    }
  }

  // Check for stale files in components/, references/docs/, and references/docs/examples/
  for (const dir of [componentsOutDir, referencesDir, referencesExamplesDir]) {
    if (!existsSync(dir)) continue;
    const staleFiles = fg.sync(["**/*"], {
      cwd: dir,
      absolute: true,
      onlyFiles: true,
    });
    for (const fullPath of staleFiles) {
      if (!expectedPaths.has(fullPath)) {
        diffs.push(`  Extra: ${path.relative(repoRoot, fullPath)}`);
      }
    }
  }

  if (diffs.length > 0) {
    // eslint-disable-next-line no-console -- CI output
    console.error("Skills build check failed:\n");
    // eslint-disable-next-line no-console -- CI output
    console.error(diffs.join("\n"));
    process.exit(1);
  }
  // eslint-disable-next-line no-console -- CI output
  console.log(
    `Check passed: ${processedCount} component skill files are up to date.`,
  );
} else {
  // Clean entire output directory then recreate structure
  await fs.rm(skillsRoot, { recursive: true, force: true });

  for (const { path: filePath, content } of wouldWrite) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf8");
  }
  // eslint-disable-next-line no-console -- Log summary
  console.log(
    `Generated ${processedCount} component skill files in skills/carbon-react/components/`,
  );
  if (skippedCount > 0) {
    // eslint-disable-next-line no-console -- Log summary
    console.log(`Skipped ${skippedCount} entries (no slug mapping).`);
  }
}
