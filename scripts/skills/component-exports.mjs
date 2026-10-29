/**
 * Determine whether a source file exports a runtime value under a given name.
 * Type-only declarations such as interfaces and type aliases have no value
 * declaration and must not be treated as valid component imports.
 *
 * @param {import("ts-morph").SourceFile} sourceFile
 * @param {string} exportName
 * @returns {boolean}
 */
export function sourceFileHasRuntimeExport(sourceFile, exportName) {
  const declarations =
    sourceFile.getExportedDeclarations().get(exportName) ?? [];

  return declarations.some(
    (declaration) =>
      declaration.getSymbol()?.getValueDeclaration() !== undefined,
  );
}
