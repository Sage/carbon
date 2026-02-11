// @ts-check
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import { JSDoc, Project, SyntaxKind } from "ts-morph";

/**
 * @typedef {Object} ComponentCandidate
 * @property {string} name
 * @property {string} moduleSpecifier
 */

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
 * @typedef {Object} ComponentData
 * @property {string} name
 * @property {string} moduleSpecifier
 * @property {PropInfo[]} props
 * @property {boolean} missingPropsInterface
 * @property {string | null} propsInterfaceName
 * @property {boolean} hasDefaultExport
 * @property {boolean} deprecated
 * @property {string | null} deprecationReason
 */

/**
 * @typedef {Object} StoryEntry
 * @property {string} name
 * @property {string | null} argsText
 * @property {string | null} renderText
 * @property {"csf" | "mdx"} kind
 * @property {string} [source]
 */

/**
 * @typedef {Object} StoryMeta
 * @property {string | null} title
 * @property {string | null} componentIdentifier
 * @property {string | null} componentModule
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const packageName = "carbon-sage";
const buildOutputFolder = "lib";
const indexFilePath = path.join(repoRoot, "src", "index.ts");
const skillsRoot = path.join(repoRoot, "skills", "carbon-react");
const componentsOutDir = path.join(skillsRoot, "components");
const referencesDir = path.join(skillsRoot, "references", "docs");

/** @type {string[]} */
const docsReferenceFiles = [
  "docs/usage.mdx",
  "docs/installation.mdx",
  "docs/recommended-practices.mdx",
  "docs/usage-with-routing.mdx",
  "docs/extending-styles-using-styled-components.mdx",
  "docs/colors.mdx",
  "docs/i18n.mdx",
  "docs/deprecation-migration.mdx",
];

const docsReferenceTargets = docsReferenceFiles.map(
  (relativePath) =>
    `references/docs/${path.basename(relativePath).replace(/\.mdx?$/, ".md")}`,
);

const project = new Project({
  tsConfigFilePath: path.join(repoRoot, "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});

project.addSourceFileAtPath(indexFilePath);
project.addSourceFilesAtPaths([
  path.join(repoRoot, "src", "components", "**", "*.ts"),
  path.join(repoRoot, "src", "components", "**", "*.tsx"),
]);

const indexFile = project.getSourceFileOrThrow(indexFilePath);

/** @type {ComponentCandidate[]} */
const componentCandidates = [];

for (const exportDecl of indexFile.getExportDeclarations()) {
  const moduleSpecifier = exportDecl.getModuleSpecifierValue();
  if (!moduleSpecifier || !moduleSpecifier.startsWith("./components/")) {
    continue;
  }

  const namedExports = exportDecl.getNamedExports();
  if (exportDecl.isTypeOnly()) {
    continue;
  }

  // Only treat runtime exports from src/index.ts as components. Type-only
  // exports (Props, handles) would create false component entries.

  for (const namedExport of namedExports) {
    const exportName =
      namedExport.getAliasNode()?.getText() ?? namedExport.getName();
    if (exportName === "default" || exportName.endsWith("Props")) {
      continue;
    }
    if (!/^[A-Z]/.test(exportName)) {
      continue;
    }
    componentCandidates.push({
      name: exportName,
      moduleSpecifier,
    });
  }
}

/** @type {ComponentData[]} */
const componentData = [];

for (const candidate of componentCandidates) {
  const modulePath = resolveModulePath(
    indexFilePath,
    candidate.moduleSpecifier,
  );
  if (!modulePath) {
    continue;
  }

  const moduleDir = getModuleDir(modulePath);
  const moduleFiles = fg.sync(["**/*.{ts,tsx}"], {
    cwd: moduleDir,
    absolute: true,
    ignore: [
      "**/*.spec.*",
      "**/*.test.*",
      "**/*.stories.*",
      "**/*.pw.*",
      "**/*.mdx",
      "**/__internal__/**",
    ],
  });

  for (const filePath of moduleFiles) {
    project.addSourceFileAtPathIfExists(filePath);
  }

  const propsName = `${candidate.name}Props`;
  const propsDefinition = resolvePropsDefinition(
    project,
    modulePath,
    moduleFiles,
    propsName,
  );
  // Use ts-morph to follow type re-exports (e.g., AlertProps -> DialogProps)
  // so deprecated components still yield accurate props.
  const defaultsMap = collectDefaultProps(project, moduleFiles, candidate.name);
  const hasDefaultExport = moduleHasDefaultExport(project, modulePath);
  const deprecationInfo = detectDeprecation(
    project,
    modulePath,
    moduleFiles,
    candidate.name,
  );

  // Deprecation can be attached to the component export, its props interface,
  // or a type alias, so we scan multiple nodes in detectDeprecation().

  const props = propsDefinition
    ? extractPropsFromDefinition(propsDefinition, defaultsMap)
    : [];

  componentData.push({
    name: candidate.name,
    moduleSpecifier: candidate.moduleSpecifier,
    props,
    missingPropsInterface: !propsDefinition,
    propsInterfaceName: propsDefinition?.name ?? null,
    hasDefaultExport,
    deprecated: deprecationInfo.deprecated,
    deprecationReason: deprecationInfo.reason,
  });
}

const storyDataByComponent = await extractStoryData(project, repoRoot);

await fs.rm(componentsOutDir, { recursive: true, force: true });
await fs.rm(referencesDir, { recursive: true, force: true });
await fs.mkdir(componentsOutDir, { recursive: true });
await fs.mkdir(skillsRoot, { recursive: true });
await fs.mkdir(referencesDir, { recursive: true });

await writeSkillRoot(skillsRoot);
await copyDocsReferences(repoRoot, referencesDir);

const indexLines = ["# Carbon Component Catalog", "", "## Components", ""];

for (const component of componentData.sort((a, b) =>
  a.name.localeCompare(b.name),
)) {
  const stories = storyDataByComponent.get(component.name) ?? [];
  const fileName = `${toKebabCase(component.name)}.md`;
  const filePath = path.join(componentsOutDir, fileName);
  const markdown = renderComponentMarkdown(component, stories);

  await fs.writeFile(filePath, markdown, "utf8");
  const deprecatedLabel = component.deprecated ? " (deprecated)" : "";
  indexLines.push(
    `- [${component.name}](components/${fileName})${deprecatedLabel}`,
  );
}

await fs.writeFile(
  path.join(skillsRoot, "index.md"),
  indexLines.join("\n"),
  "utf8",
);

// eslint-disable-next-line no-console -- Log summary of generated components and output location
console.log(
  `Generated ${componentData.length} component skill files in ${path.relative(
    repoRoot,
    componentsOutDir,
  )}`,
);

/**
 * Resolve a module specifier from the index file to an absolute file path.
 * @param {string} indexPath
 * @param {string} moduleSpecifier
 * @returns {string | null}
 */
function resolveModulePath(indexPath, moduleSpecifier) {
  return resolveModulePathFrom(indexPath, moduleSpecifier);
}

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
 * @param {import("ts-morph").Project} projectInstance
 * @param {string[]} filePaths
 * @param {string} typeName
 * @returns {PropsDefinition | null}
 */
function findTypeDefinitionInFiles(projectInstance, filePaths, typeName) {
  for (const filePath of filePaths) {
    const sourceFile =
      projectInstance.getSourceFile(filePath) ||
      projectInstance.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) {
      continue;
    }
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
 * @param {import("ts-morph").Project} projectInstance
 * @param {string} modulePath
 * @param {string[]} moduleFiles
 * @param {string} propsName
 * @returns {PropsDefinition | null}
 */
function resolvePropsDefinition(
  projectInstance,
  modulePath,
  moduleFiles,
  propsName,
) {
  const directMatch = findTypeDefinitionInFiles(
    projectInstance,
    moduleFiles,
    propsName,
  );
  if (directMatch) {
    return directMatch;
  }

  // Props are sometimes re-exported from another module; follow the type-only
  // export to locate the real definition.

  const entryFile =
    projectInstance.getSourceFile(modulePath) ||
    projectInstance.addSourceFileAtPathIfExists(modulePath);
  if (!entryFile) {
    return null;
  }

  for (const exportDecl of entryFile.getExportDeclarations()) {
    if (!exportDecl.isTypeOnly()) {
      continue;
    }
    const moduleSpecifier = exportDecl.getModuleSpecifierValue();
    if (!moduleSpecifier) {
      continue;
    }
    for (const namedExport of exportDecl.getNamedExports()) {
      const alias = namedExport.getAliasNode()?.getText();
      const exportedName = namedExport.getName();
      if (alias !== propsName && exportedName !== propsName) {
        continue;
      }

      const targetName = alias ? exportedName : propsName;
      const resolved = resolveModulePathFrom(modulePath, moduleSpecifier);
      if (!resolved) {
        continue;
      }
      const targetFiles = fg.sync(["**/*.{ts,tsx}"], {
        cwd: getModuleDir(resolved),
        absolute: true,
        ignore: [
          "**/*.spec.*",
          "**/*.test.*",
          "**/*.stories.*",
          "**/*.pw.*",
          "**/*.mdx",
        ],
      });

      const resolvedDefinition = findTypeDefinitionInFiles(
        projectInstance,
        targetFiles,
        targetName,
      );
      if (resolvedDefinition) {
        return resolvedDefinition;
      }
    }
  }

  return null;
}

/**
 * Determine if a module has a default export.
 * @param {import("ts-morph").Project} projectInstance
 * @param {string} modulePath
 * @returns {boolean}
 */
function moduleHasDefaultExport(projectInstance, modulePath) {
  const sourceFile =
    projectInstance.getSourceFile(modulePath) ||
    projectInstance.addSourceFileAtPathIfExists(modulePath);
  if (!sourceFile) {
    return false;
  }
  if (sourceFile.getDefaultExportSymbol()) {
    return true;
  }
  const exportAssignment = sourceFile
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());
  return Boolean(exportAssignment);
}

/**
 * Extract prop metadata from a props definition, including defaults and deprecations.
 * @param {PropsDefinition} propsDefinition
 * @param {Map<string, string>} defaultsMap
 * @returns {PropInfo[]}
 */
function extractPropsFromDefinition(propsDefinition, defaultsMap) {
  const type = propsDefinition.node.getType();
  return type.getProperties().map((symbol) => {
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

    return {
      name: symbol.getName(),
      type: propType.getText(declaration ?? propsDefinition.node),
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
 * Return literal values for simple union types when all members are literals.
 * @param {import("ts-morph").Type} type
 * @returns {Array<string | number | boolean> | null}
 */
function getLiteralUnionValues(type) {
  if (!type.isUnion()) {
    return null;
  }
  const unionTypes = type.getUnionTypes();
  /** @type {Array<string | number | boolean>} */
  const literals = [];

  for (const unionType of unionTypes) {
    if (unionType.isStringLiteral()) {
      const literalValue = unionType.getLiteralValue();
      if (literalValue === undefined) {
        return null;
      }
      literals.push(String(literalValue));
      continue;
    }
    if (unionType.isNumberLiteral()) {
      const literalValue = unionType.getLiteralValue();
      if (literalValue === undefined) {
        return null;
      }
      literals.push(
        typeof literalValue === "number" ? literalValue : String(literalValue),
      );
      continue;
    }
    if (unionType.isBooleanLiteral()) {
      const literalValue = unionType.getLiteralValue();
      if (literalValue === undefined) {
        return null;
      }
      literals.push(Boolean(literalValue));
      continue;
    }
    return null;
  }

  return literals;
}

/**
 * Collect default prop values from destructured parameters and defaultProps.
 * @param {import("ts-morph").Project} projectInstance
 * @param {string[]} filePaths
 * @param {string} componentName
 * @returns {Map<string, string>}
 */
function collectDefaultProps(projectInstance, filePaths, componentName) {
  const defaults = new Map();

  for (const filePath of filePaths) {
    const sourceFile =
      projectInstance.getSourceFile(filePath) ||
      projectInstance.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) {
      continue;
    }

    const defaultExportSymbol = sourceFile.getDefaultExportSymbol();
    if (defaultExportSymbol) {
      const declarations = defaultExportSymbol.getDeclarations();
      for (const declaration of declarations) {
        const defaultsFromDeclaration =
          extractDefaultsFromDeclaration(declaration);
        for (const [key, value] of defaultsFromDeclaration.entries()) {
          defaults.set(key, value);
        }
      }
    }

    const namedFunction = sourceFile
      .getFunctions()
      .find((fn) => fn.getName() === componentName);
    if (namedFunction) {
      const defaultsFromDeclaration =
        extractDefaultsFromDeclaration(namedFunction);
      for (const [key, value] of defaultsFromDeclaration.entries()) {
        defaults.set(key, value);
      }
    }

    const namedVariable = sourceFile
      .getVariableDeclarations()
      .find((decl) => decl.getName() === componentName);
    if (namedVariable) {
      const defaultsFromDeclaration =
        extractDefaultsFromDeclaration(namedVariable);
      for (const [key, value] of defaultsFromDeclaration.entries()) {
        defaults.set(key, value);
      }
    }

    const assignments = sourceFile.getDescendantsOfKind(
      SyntaxKind.BinaryExpression,
    );
    for (const assignment of assignments) {
      const left = assignment.getLeft();
      const right = assignment.getRight();
      if (!right || !right.isKind(SyntaxKind.ObjectLiteralExpression)) {
        continue;
      }

      if (!left.isKind(SyntaxKind.PropertyAccessExpression)) {
        continue;
      }

      const expressionText = left.getExpression().getText();
      const nameText = left.getName();
      if (expressionText !== componentName || nameText !== "defaultProps") {
        continue;
      }

      for (const prop of right.getProperties()) {
        if (!prop.isKind(SyntaxKind.PropertyAssignment)) {
          continue;
        }
        const propName = prop.getName();
        const initializer = prop.getInitializer();
        if (initializer) {
          defaults.set(propName, initializer.getText());
        }
      }
    }
  }

  return defaults;
}

/**
 * Extract defaults from a component declaration (function or variable initializer).
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
  if (!parameters || parameters.length === 0) {
    return;
  }

  const firstParam = parameters[0];
  const nameNode = firstParam.getNameNode();
  if (!nameNode || !nameNode.isKind(SyntaxKind.ObjectBindingPattern)) {
    return;
  }

  for (const element of nameNode.getElements()) {
    const initializer = element.getInitializer();
    if (!initializer) {
      continue;
    }
    const propName =
      element.getPropertyNameNode()?.getText() ?? element.getName();
    defaults.set(propName, initializer.getText());
  }
}

/**
 * Extract story data from CSF and MDX files for usage examples.
 * @param {import("ts-morph").Project} projectInstance
 * @param {string} rootDir
 * @returns {Promise<Map<string, StoryEntry[]>>}
 */
async function extractStoryData(projectInstance, rootDir) {
  const storyFiles = fg.sync(
    ["src/**/*.stories.@(js|jsx|ts|tsx)", "docs/**/*.stories.@(js|jsx|ts|tsx)"],
    { cwd: rootDir, absolute: true },
  );
  const mdxFiles = fg.sync(["src/**/*.mdx", "docs/**/*.mdx"], {
    cwd: rootDir,
    absolute: true,
  });

  /** @type {Map<string, StoryEntry[]>} */
  const storyMap = new Map();

  for (const filePath of storyFiles) {
    const sourceFile =
      projectInstance.getSourceFile(filePath) ||
      projectInstance.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) {
      continue;
    }

    const meta = extractStoryMeta(sourceFile);
    const stories = extractStoryExports(sourceFile);
    const componentName = inferComponentName(meta, filePath, rootDir);

    if (!componentName) {
      continue;
    }

    const existing = storyMap.get(componentName) ?? [];
    for (const story of stories) {
      existing.push({
        ...story,
        source: path.relative(rootDir, filePath),
      });
    }
    storyMap.set(componentName, existing);
  }

  for (const filePath of mdxFiles) {
    if (!filePath.includes(`${path.sep}src${path.sep}components${path.sep}`)) {
      continue;
    }
    const componentName = inferComponentNameFromPath(filePath, rootDir);
    if (!componentName) {
      continue;
    }
    const content = await fs.readFile(filePath, "utf8");
    const examples = extractMdxExamples(content);
    if (!examples.length) {
      continue;
    }
    const existing = storyMap.get(componentName) ?? [];
    for (const example of examples) {
      existing.push({
        name: example.name,
        argsText: example.code,
        renderText: null,
        source: path.relative(rootDir, filePath),
        kind: "mdx",
      });
    }
    storyMap.set(componentName, existing);
  }

  return storyMap;
}

/**
 * Extracts story metadata from a source file by looking for the default export and analyzing its structure to find properties like "title" and "component". It resolves any references to identifiers or imported modules to determine the associated component information. The function returns an object containing the extracted metadata.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {StoryMeta}
 */
function extractStoryMeta(sourceFile) {
  const exportAssignment = sourceFile
    .getExportAssignments()
    .find((assignment) => !assignment.isExportEquals());
  if (!exportAssignment) {
    return { title: null, componentIdentifier: null, componentModule: null };
  }

  const expression = exportAssignment.getExpression();
  const objectLiteral = resolveObjectLiteral(expression, sourceFile);
  if (!objectLiteral) {
    return { title: null, componentIdentifier: null, componentModule: null };
  }

  const titleProp = objectLiteral.getProperty("title");
  const title = titleProp?.isKind(SyntaxKind.PropertyAssignment)
    ? getStringLiteralValue(titleProp.getInitializer())
    : null;

  const componentProp = objectLiteral.getProperty("component");
  const componentIdentifier = componentProp?.isKind(
    SyntaxKind.PropertyAssignment,
  )
    ? getIdentifierText(componentProp.getInitializer())
    : null;

  const componentModule = componentIdentifier
    ? resolveImportModule(sourceFile, componentIdentifier)
    : null;

  return { title, componentIdentifier, componentModule };
}

/**
 * Extracts story exports from a source file by looking for exported functions and variables, as well as any associated story metadata such as story names and args. It returns an array of story entries with the extracted information.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {StoryEntry[]}
 */
function extractStoryExports(sourceFile) {
  /** @type {StoryEntry[]} */
  const stories = [];
  const exported = sourceFile.getExportedDeclarations();
  const storyNameOverrides = new Map();
  const storyArgsOverrides = new Map();

  const assignments = sourceFile.getDescendantsOfKind(
    SyntaxKind.BinaryExpression,
  );
  for (const assignment of assignments) {
    const left = assignment.getLeft();
    const right = assignment.getRight();
    if (!left.isKind(SyntaxKind.PropertyAccessExpression) || !right) {
      continue;
    }
    const targetName = left.getExpression().getText();
    const propertyName = left.getName();
    if (propertyName === "storyName") {
      const value = getStringLiteralValue(right);
      if (value) {
        storyNameOverrides.set(targetName, value);
      }
    }
    if (
      propertyName === "args" &&
      right.isKind(SyntaxKind.ObjectLiteralExpression)
    ) {
      storyArgsOverrides.set(targetName, right.getText());
    }
  }

  for (const [exportName, declarations] of exported.entries()) {
    if (exportName === "default") {
      continue;
    }

    for (const declaration of declarations) {
      if (declaration.isKind(SyntaxKind.FunctionDeclaration)) {
        stories.push({
          name: storyNameOverrides.get(exportName) ?? exportName,
          argsText: storyArgsOverrides.get(exportName) ?? null,
          renderText: declaration.getText(),
          kind: "csf",
        });
        continue;
      }

      if (!declaration.isKind(SyntaxKind.VariableDeclaration)) {
        continue;
      }

      const initializer = declaration.getInitializer();
      if (!initializer) {
        continue;
      }

      if (initializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
        // CSF object style: export const Story = { args, render }
        const argsProperty = initializer.getProperty("args");
        const renderProperty = initializer.getProperty("render");
        const argsText = argsProperty?.isKind(SyntaxKind.PropertyAssignment)
          ? (argsProperty.getInitializer()?.getText() ?? null)
          : (storyArgsOverrides.get(exportName) ?? null);
        const renderText = renderProperty?.isKind(SyntaxKind.PropertyAssignment)
          ? (renderProperty.getInitializer()?.getText() ?? null)
          : null;

        stories.push({
          name: storyNameOverrides.get(exportName) ?? exportName,
          argsText,
          renderText,
          kind: "csf",
        });
        continue;
      }

      if (
        initializer.isKind(SyntaxKind.ArrowFunction) ||
        initializer.isKind(SyntaxKind.FunctionExpression)
      ) {
        // CSF function style: export const Story = () => <Component />
        stories.push({
          name: storyNameOverrides.get(exportName) ?? exportName,
          argsText: storyArgsOverrides.get(exportName) ?? null,
          renderText: initializer.getText(),
          kind: "csf",
        });
      }
    }
  }

  return stories;
}

/**
 * Infers the component name associated with a story by checking the story's metadata for a title or component reference, and if those are not available, by analyzing the file path to find the nearest directory that likely corresponds to the component name. The function uses PascalCase formatting for the inferred component name.
 * @param {StoryMeta} meta
 * @param {string} filePath
 * @param {string} rootDir
 * @returns {string | null}
 */
function inferComponentName(meta, filePath, rootDir) {
  if (meta?.title) {
    // Storybook titles are often "Category/Component"; the last segment
    // typically matches the component name in Carbon.
    const lastSegment = meta.title.split("/").pop() ?? "";
    return toPascalCase(lastSegment);
  }

  if (meta?.componentModule) {
    const resolved = resolveModulePath(filePath, meta.componentModule);
    if (resolved && resolved.includes(`${path.sep}components${path.sep}`)) {
      return inferComponentNameFromPath(resolved, rootDir);
    }
  }

  return inferComponentNameFromPath(filePath, rootDir);
}

/**
 * @param {string} filePath
 * @param {string} rootDir
 * @returns {string | null}
 */
function inferComponentNameFromPath(filePath, rootDir) {
  const relative = path.relative(rootDir, filePath);
  const parts = relative.split(path.sep);
  const componentsIndex = parts.indexOf("components");
  if (componentsIndex === -1 || componentsIndex === parts.length - 1) {
    return null;
  }
  const immediateDir = path.basename(path.dirname(filePath));
  if (immediateDir && immediateDir !== "__internal__") {
    return toPascalCase(immediateDir);
  }

  const fallbackFolder = parts[componentsIndex + 1];
  return toPascalCase(fallbackFolder);
}

/**
 * @param {import("ts-morph").Expression | undefined} expression
 * @param {import("ts-morph").SourceFile} sourceFile
 * @returns {import("ts-morph").ObjectLiteralExpression | null}
 */
function resolveObjectLiteral(expression, sourceFile) {
  if (!expression) {
    return null;
  }
  if (expression.isKind(SyntaxKind.ObjectLiteralExpression)) {
    return expression;
  }
  if (expression.isKind(SyntaxKind.Identifier)) {
    const name = expression.getText();
    const variable = sourceFile.getVariableDeclaration(name);
    if (variable) {
      const initializer = variable.getInitializer();
      if (initializer?.isKind(SyntaxKind.ObjectLiteralExpression)) {
        return initializer;
      }
    }
  }
  return null;
}

/**
 * @param {import("ts-morph").Node | undefined} node
 * @returns {string | null}
 */
function getStringLiteralValue(node) {
  if (!node) {
    return null;
  }
  if (node.isKind(SyntaxKind.StringLiteral)) {
    return node.getLiteralValue();
  }
  if (node.isKind(SyntaxKind.NoSubstitutionTemplateLiteral)) {
    return node.getLiteralValue();
  }
  return null;
}

/**
 * @param {import("ts-morph").Node | undefined} node
 * @returns {string | null}
 */
function getIdentifierText(node) {
  if (!node) {
    return null;
  }
  if (node.isKind(SyntaxKind.Identifier)) {
    return node.getText();
  }
  if (node.isKind(SyntaxKind.AsExpression)) {
    return getIdentifierText(node.getExpression());
  }
  if (node.isKind(SyntaxKind.TypeAssertionExpression)) {
    return getIdentifierText(node.getExpression());
  }
  return null;
}

/**
 * Normalizes a JSDoc comment by converting it to a single line and trimming whitespace.
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} identifierName
 * @returns {string | null}
 */
function resolveImportModule(sourceFile, identifierName) {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const defaultImport = importDecl.getDefaultImport();
    if (defaultImport?.getText() === identifierName) {
      return moduleSpecifier;
    }
    const namedImports = importDecl.getNamedImports();
    for (const namedImport of namedImports) {
      const importName = namedImport.getName();
      const alias = namedImport.getAliasNode()?.getText();
      if (importName === identifierName || alias === identifierName) {
        return moduleSpecifier;
      }
    }
  }
  return null;
}

/**
 * Extracts code examples from MDX content by looking for code blocks and returns them as an array of objects containing the example name and code.
 * @param {string} content
 * @returns {Array<{name: string, code: string}>}
 */
function extractMdxExamples(content) {
  const examples = [];
  const codeBlockRegex = /```(?:tsx|jsx|ts|js)?\n([\s\S]*?)```/g;
  let match;
  let index = 1;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const code = match[1]?.trim();
    if (!code) {
      continue;
    }
    examples.push({
      name: `MDX Example ${index}`,
      code,
    });
    index += 1;
  }

  return examples;
}

/**
 * Writes the root skill file with metadata and instructions for the Carbon React skill.
 * @param {string} rootDir
 * @returns {Promise<void>}
 */
async function writeSkillRoot(rootDir) {
  const skillFilePath = path.join(rootDir, "SKILL.md");
  const docsList = docsReferenceTargets
    .map((fileName) => `- \`${fileName}\``)
    .join("\n");
  const content = `---\nname: carbon-react\ndescription: Carbon component catalog with typed props, Storybook usage examples, and curated docs references. Use when answering questions about Carbon components, props, and usage guidance.\n---\n\n# Carbon Component Catalog\n\nUse \`index.md\` to find the component file.\nUse \`components/*.md\` to read props and examples.\nUse these docs references:\n${docsList}\nDeprecated components are marked in \`index.md\` and in each component file.\n`;

  await fs.mkdir(rootDir, { recursive: true });
  await fs.writeFile(skillFilePath, content, "utf8");
}

/**
 * Copies the specified documentation reference files from the root directory to the output directory, converting them to markdown format if necessary.
 * @param {string} rootDir
 * @param {string} outputDir
 * @returns {Promise<void>}
 */
async function copyDocsReferences(rootDir, outputDir) {
  for (const relativePath of docsReferenceFiles) {
    const sourcePath = path.join(rootDir, relativePath);
    if (!existsSync(sourcePath)) {
      continue;
    }
    const fileName = path.basename(sourcePath);
    const targetPath = path.join(outputDir, fileName).replace(/\.mdx?$/, ".md");
    const content = await fs.readFile(sourcePath, "utf8");
    await fs.writeFile(targetPath, content, "utf8");
  }
}

/**
 * Detect deprecation markers on component declarations and types.
 * @param {import("ts-morph").Project} projectInstance
 * @param {string} modulePath
 * @param {string[]} moduleFiles
 * @param {string} componentName
 * @returns {{deprecated: boolean, reason: string | null}}
 */
function detectDeprecation(
  projectInstance,
  modulePath,
  moduleFiles,
  componentName,
) {
  /** @type {import("ts-morph").Node[]} */
  const candidates = [];

  const entryFile =
    projectInstance.getSourceFile(modulePath) ||
    projectInstance.addSourceFileAtPathIfExists(modulePath);
  if (entryFile) {
    const defaultExportSymbol = entryFile.getDefaultExportSymbol();
    if (defaultExportSymbol) {
      candidates.push(...defaultExportSymbol.getDeclarations());
    }
  }

  for (const filePath of moduleFiles) {
    const sourceFile =
      projectInstance.getSourceFile(filePath) ||
      projectInstance.addSourceFileAtPathIfExists(filePath);
    if (!sourceFile) {
      continue;
    }

    const namedFunction = sourceFile
      .getFunctions()
      .find((fn) => fn.getName() === componentName);
    if (namedFunction) {
      candidates.push(namedFunction);
    }

    const namedClass = sourceFile
      .getClasses()
      .find((decl) => decl.getName() === componentName);
    if (namedClass) {
      candidates.push(namedClass);
    }

    const namedVariable = sourceFile
      .getVariableDeclarations()
      .find((decl) => decl.getName() === componentName);
    if (namedVariable) {
      candidates.push(namedVariable);
      const variableStatement = namedVariable.getVariableStatement();
      if (variableStatement) {
        // Some components place @deprecated on the export const statement.
        candidates.push(variableStatement);
      }
    }

    const namedInterface = sourceFile.getInterface(componentName);
    if (namedInterface) {
      candidates.push(namedInterface);
    }

    const namedTypeAlias = sourceFile.getTypeAlias(componentName);
    if (namedTypeAlias) {
      candidates.push(namedTypeAlias);
    }

    const propsInterface = sourceFile.getInterface(`${componentName}Props`);
    if (propsInterface) {
      candidates.push(propsInterface);
    }

    const propsTypeAlias = sourceFile.getTypeAlias(`${componentName}Props`);
    if (propsTypeAlias) {
      candidates.push(propsTypeAlias);
    }
  }

  for (const candidate of candidates) {
    const jsDocs = getJsDocsFromNode(candidate);
    for (const doc of jsDocs) {
      for (const tag of doc.getTags()) {
        if (tag.getTagName() === "deprecated") {
          const comment = normalizeJsDocComment(tag.getComment());
          const docComment = doc.getDescription().trim();
          return {
            deprecated: true,
            reason: comment || docComment || null,
          };
        }
      }
    }
  }

  return { deprecated: false, reason: null };
}

/**
 * Safely read JSDoc arrays from arbitrary nodes.
 * @param {import("ts-morph").Node} node
 * @returns {import("ts-morph").JSDoc[]}
 */
function getJsDocsFromNode(node) {
  if (JSDoc.isJSDocable(node)) {
    return node.getJsDocs();
  }
  return [];
}

/**
 * @param {ReturnType<import("ts-morph").JSDocTag["getComment"]>} comment
 * @returns {string | null}
 */
function normalizeJsDocComment(comment) {
  if (!comment) {
    return null;
  }
  if (typeof comment === "string") {
    return comment.trim() || null;
  }
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
        return {
          deprecated: true,
          reason: comment || docComment || null,
        };
      }
    }
  }
  return { deprecated: false, reason: null };
}

/**
 * Render a component markdown file with props and examples.
 * @param {ComponentData} component
 * @param {StoryEntry[]} stories
 * @returns {string}
 */
function renderComponentMarkdown(component, stories) {
  const frontmatter = [
    "---",
    `name: carbon-component-${toKebabCase(component.name)}`,
    `description: Carbon ${component.name} component props and usage examples.`,
    "---",
    "",
  ].join("\n");

  const lines = [frontmatter, `# ${component.name}`, ""];

  const importPath = `${packageName}/${buildOutputFolder}/${component.moduleSpecifier.replace("./", "")}`;
  const importStatement = component.hasDefaultExport
    ? `import ${component.name} from "${importPath}";`
    : `import { ${component.name} } from "${importPath}";`;

  lines.push("## Import");
  lines.push(`\`${importStatement}\`\n`);

  lines.push("## Source");
  lines.push(`- Export: \`${component.moduleSpecifier}\``);
  if (component.propsInterfaceName) {
    lines.push(`- Props interface: \`${component.propsInterfaceName}\``);
  } else if (component.missingPropsInterface) {
    lines.push("- Props interface: not found");
  }
  if (component.deprecated) {
    lines.push("- Deprecated: Yes");
    if (component.deprecationReason) {
      lines.push(`- Deprecation reason: ${component.deprecationReason}`);
    }
  }
  lines.push("");

  lines.push("## Props");
  if (!component.props.length) {
    lines.push("No props metadata found.");
  } else {
    const hasDeprecatedProps = component.props.some((prop) => prop.deprecated);
    if (hasDeprecatedProps) {
      lines.push(
        "| Name | Type | Required | Literals | Deprecated | Deprecation reason | Description | Default |",
        "| --- | --- | --- | --- | --- | --- | --- | --- |",
      );
    } else {
      lines.push(
        "| Name | Type | Required | Literals | Description | Default |",
        "| --- | --- | --- | --- | --- | --- |",
      );
    }
    for (const prop of component.props) {
      const literals = prop.literals?.join(" | ") ?? "";
      const description = prop.description?.replace(/\s+/g, " ") ?? "";
      const defaultValue = prop.defaultValue ?? "";
      if (hasDeprecatedProps) {
        const deprecated = prop.deprecated ? "Yes" : "";
        const deprecationReason = prop.deprecationReason ?? "";
        lines.push(
          `| ${prop.name} | ${escapePipes(prop.type)} | ${prop.required ? "Yes" : "No"} | ${escapePipes(literals)} | ${deprecated} | ${escapePipes(deprecationReason)} | ${escapePipes(description)} | ${escapePipes(defaultValue)} |`,
        );
      } else {
        lines.push(
          `| ${prop.name} | ${escapePipes(prop.type)} | ${prop.required ? "Yes" : "No"} | ${escapePipes(literals)} | ${escapePipes(description)} | ${escapePipes(defaultValue)} |`,
        );
      }
    }
  }
  lines.push("");

  lines.push("## Examples");
  if (!stories.length) {
    lines.push("No Storybook examples found.");
  } else {
    for (const story of stories) {
      lines.push(`### ${story.name}`);
      lines.push("");
      if (story.argsText) {
        lines.push("**Args**", "", "```tsx", story.argsText, "```", "");
      }
      if (story.renderText) {
        lines.push("**Render**", "", "```tsx", story.renderText, "```", "");
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}

/**
 * Escape pipes for markdown table cells.
 * @param {string} value
 * @returns {string}
 */
function escapePipes(value) {
  return value?.replace(/\|/g, "\\|") ?? "";
}

/**
 * Convert a string to kebab-case.
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
 * Capitalize the first character of a string.
 * @param {string} value
 * @returns {string}
 */
function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Convert a string to PascalCase.
 * @param {string} value
 * @returns {string | null}
 */
function toPascalCase(value) {
  if (!value) {
    return null;
  }
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((part) => capitalizeFirstLetter(part))
    .join("");
}
