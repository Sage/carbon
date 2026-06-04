// @ts-check
import { SyntaxKind } from "ts-morph";
import { getOrAddSourceFile } from "./ts-project.mjs";
import { resolveStoryExample } from "./story-resolver.mjs";

/**
 * Get a clean, runnable example snippet for a named story export, resolving
 * `render`/args plumbing and inlining args. Falls back to the raw source text
 * when the story cannot be statically resolved.
 * @param {string} filePath
 * @param {string} exportName
 * @returns {Promise<string | null>}
 */
export async function getStoryExampleSource(filePath, exportName) {
  try {
    const resolved = await resolveStoryExample(filePath, exportName);
    if (resolved) return resolved;
  } catch {
    // Fall back to the raw source below.
  }
  return getStoryExportSource(filePath, exportName);
}

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
