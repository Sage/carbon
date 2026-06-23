// @ts-check
import path from "node:path";
import { existsSync, statSync } from "node:fs";
import fg from "fast-glob";
import { SyntaxKind } from "ts-morph";
import { getOrAddSourceFile } from "./ts-project.mjs";

/**
 * Resolve a module specifier relative to a base file path.
 * @param {string} baseFilePath
 * @param {string} moduleSpecifier
 * @returns {string | null}
 */
export function resolveModulePathFrom(baseFilePath, moduleSpecifier) {
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
export function getModuleDir(modulePath) {
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
 * @returns {import("./skills-types.mjs").PropsDefinition | null}
 */
export function findTypeDefinitionInFiles(filePaths, typeName) {
  for (const filePath of filePaths) {
    const sourceFile = getOrAddSourceFile(filePath);
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
 * @returns {import("./skills-types.mjs").PropsDefinition | null}
 */
export function resolvePropsDefinition(modulePath, moduleFiles, propsName) {
  const directMatch = findTypeDefinitionInFiles(moduleFiles, propsName);
  if (directMatch) return directMatch;

  const entryFile = getOrAddSourceFile(modulePath);
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
 * @param {import("./skills-types.mjs").PropsDefinition} propsDefinition
 * @param {Map<string, string>} defaultsMap
 * @returns {import("./skills-types.mjs").PropInfo[]}
 */
export function extractPropsFromDefinition(propsDefinition, defaultsMap) {
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
export function getLiteralUnionValues(type) {
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
export function collectDefaultProps(filePaths, componentName) {
  const defaults = new Map();

  for (const filePath of filePaths) {
    const sourceFile = getOrAddSourceFile(filePath);
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
export function extractDefaultsFromDeclaration(declaration) {
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
export function extractFromParameters(parameters, defaults) {
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
export function getDeprecationFromJsDocs(jsDocs) {
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
export function normalizeJsDocComment(comment) {
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
