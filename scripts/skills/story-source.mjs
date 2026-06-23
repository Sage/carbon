// @ts-check
import { SyntaxKind } from "ts-morph";
import { getOrAddSourceFile } from "./ts-project.mjs";

/**
 * Get the full source text of a named export from a stories file.
 * @param {string} filePath
 * @param {string} exportName
 * @returns {string | null}
 */
export function getStoryExportSource(filePath, exportName) {
  const sourceFile = getOrAddSourceFile(filePath);
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
