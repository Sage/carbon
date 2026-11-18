// @ts-check
import { SyntaxKind } from "ts-morph";

const supportedDeclarationKinds = new Set([
  SyntaxKind.InterfaceDeclaration,
  SyntaxKind.TypeAliasDeclaration,
  SyntaxKind.EnumDeclaration,
]);

/**
 * Resolve selected public types and the local declarations required to
 * understand them. Dependencies are deliberately restricted to the component
 * module so library and platform types are not copied into generated skills.
 *
 * @param {import("ts-morph").SourceFile} publicEntryFile
 * @param {string[]} typeNames
 * @param {Set<string>} componentFilePaths
 * @returns {string[]}
 */
export function extractRelatedTypeDeclarations(
  publicEntryFile,
  typeNames,
  componentFilePaths,
) {
  /** @type {import("ts-morph").Node[]} */
  const roots = [];

  for (const typeName of typeNames) {
    const declarations = publicEntryFile
      .getExportedDeclarations()
      .get(typeName);
    const declaration = declarations?.find((candidate) =>
      supportedDeclarationKinds.has(candidate.getKind()),
    );

    if (!declaration) {
      throw new Error(
        `Related type ${typeName} is not a public interface, type alias or enum exported by ${publicEntryFile.getBaseName()}`,
      );
    }
    roots.push(declaration);
  }

  /** @type {import("ts-morph").Node[]} */
  const orderedDeclarations = [];
  const visiting = new Set();
  const visited = new Set();

  /** @param {import("ts-morph").Node} declaration */
  const visit = (declaration) => {
    const key = declarationKey(declaration);
    if (visited.has(key) || visiting.has(key)) return;
    visiting.add(key);

    for (const identifier of declaration.getDescendantsOfKind(
      SyntaxKind.Identifier,
    )) {
      const symbol = identifier.getSymbol();
      const resolvedSymbol = symbol?.getAliasedSymbol() ?? symbol;
      for (const dependency of resolvedSymbol?.getDeclarations() ?? []) {
        if (!supportedDeclarationKinds.has(dependency.getKind())) continue;
        if (!componentFilePaths.has(dependency.getSourceFile().getFilePath())) {
          continue;
        }
        visit(dependency);
      }
    }

    visiting.delete(key);
    visited.add(key);
    orderedDeclarations.push(declaration);
  };

  for (const root of roots) visit(root);

  return orderedDeclarations.map((declaration) =>
    declaration.getFullText().trim(),
  );
}

/** @param {import("ts-morph").Node} declaration */
function declarationKey(declaration) {
  return `${declaration.getSourceFile().getFilePath()}:${declaration.getStart()}`;
}
