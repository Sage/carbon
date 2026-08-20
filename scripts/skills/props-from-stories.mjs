// @ts-check
import fg from "fast-glob";
import { SyntaxKind } from "ts-morph";
import { getOrAddSourceFile } from "./ts-project.mjs";
import {
  resolveModulePathFrom,
  getModuleDir,
  resolvePropsDefinition,
  collectDefaultProps,
  extractPropsFromDefinition,
} from "./props-extractor.mjs";

/**
 * Resolve component name and module from a stories file's default export.
 * @param {string} storiesFilePath
 * @returns {{componentName: string | null, componentModule: string | null}}
 */
export function resolveComponentFromStories(storiesFilePath) {
  const sourceFile = getOrAddSourceFile(storiesFilePath);
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
export function extractComponentFromMetaObject(objectLiteral, sourceFile) {
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
export function resolveObjectLiteral(expression, sourceFile) {
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
export function getIdentifierText(node) {
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
export function resolveImportModule(sourceFile, identifierName) {
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
 * @returns {import("./skills-types.mjs").PropInfo[]}
 */
export function resolvePropsForStories(storiesFilePath) {
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
    getOrAddSourceFile(filePath);
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

/**
 * Extract PropInfo from a stories file's meta argTypes object (fallback when no component prop).
 * @param {string} storiesFilePath
 * @returns {import("./skills-types.mjs").PropInfo[]}
 */
export function resolveArgTypesFromMeta(storiesFilePath) {
  const sourceFile = getOrAddSourceFile(storiesFilePath);
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

  /** @type {import("./skills-types.mjs").PropInfo[]} */
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
