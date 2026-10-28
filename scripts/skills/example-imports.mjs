/**
 * Parse the normalised import statements emitted for a curated example.
 *
 * @param {string} importsText
 * @returns {Array<{moduleSpecifier: string, defaultImport: string | null, namedImports: string[], namespaceImport: string | null}>}
 */
export function parseExampleImports(importsText) {
  const declarations = [];
  const importPattern =
    /(?:^|\n)\s*import\s+(?:type\s+)?(.+?)\s+from\s+["']([^"']+)["'];?/g;
  let match;

  while ((match = importPattern.exec(importsText)) !== null) {
    const clause = match[1].trim();
    const moduleSpecifier = match[2];
    const namespaceImport =
      clause.match(/(?:^|,)\s*\*\s+as\s+([A-Za-z_$][\w$]*)\s*$/)?.[1] ?? null;
    let defaultImport = null;

    if (!clause.startsWith("{") && !clause.startsWith("*")) {
      defaultImport = clause.split(",", 1)[0].trim();
    }

    const namedClause = clause.match(/\{([^}]*)\}/)?.[1] ?? "";
    const namedImports = namedClause
      .split(",")
      .map(
        (specifier) =>
          specifier
            .trim()
            .replace(/^type\s+/, "")
            .split(/\s+as\s+/, 1)[0],
      )
      .filter(Boolean);

    declarations.push({
      moduleSpecifier,
      defaultImport,
      namedImports,
      namespaceImport,
    });
  }

  return declarations;
}

/**
 * @param {string} importsText
 * @param {string} modulePrefix
 * @returns {boolean}
 */
export function hasNamespaceImportFrom(importsText, modulePrefix) {
  return parseExampleImports(importsText).some(
    ({ moduleSpecifier, namespaceImport }) =>
      namespaceImport !== null && moduleSpecifier.startsWith(modulePrefix),
  );
}

/**
 * @param {string} importsText
 * @returns {boolean}
 */
export function hasStorybookImport(importsText) {
  return /(?:from\s+|import\s*)["'](?:@storybook|storybook)\//.test(
    importsText,
  );
}

/**
 * Find the deprecated component binding used by an example without rejecting
 * active siblings exported from the same module.
 *
 * @param {string} importsText
 * @param {Array<{name: string, importName: string, importPath: string, supportsDefaultImport: boolean, supportsNamedImport: boolean}>} deprecatedComponents
 * @returns {{name: string, importName: string, importPath: string, supportsDefaultImport: boolean, supportsNamedImport: boolean} | null}
 */
export function findDeprecatedImport(importsText, deprecatedComponents) {
  const declarations = parseExampleImports(importsText);

  for (const component of deprecatedComponents) {
    const matchingDeclarations = declarations.filter(
      ({ moduleSpecifier }) => moduleSpecifier === component.importPath,
    );
    if (!matchingDeclarations.length) continue;

    const importsComponent = matchingDeclarations.some((declaration) =>
      Boolean(
        (component.supportsDefaultImport &&
          (declaration.defaultImport ||
            declaration.namedImports.includes("default"))) ||
          (component.supportsNamedImport &&
            declaration.namedImports.includes(component.importName)),
      ),
    );
    if (importsComponent) {
      return component;
    }
  }

  return null;
}
