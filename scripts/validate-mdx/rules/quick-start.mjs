// @ts-check
import path from "node:path";
import diagnostic from "../diagnostics.mjs";
import { parseQuickStartImports } from "../parse-mdx.mjs";

/** @param {string} filePath */
function componentRootName(filePath) {
  const parts = path.normalize(filePath).split(path.sep);
  const componentsIndex = parts.lastIndexOf("components");
  return componentsIndex >= 0
    ? parts[componentsIndex + 1]
    : path.basename(path.dirname(filePath));
}

/**
 * @param {ReturnType<import('../parse-mdx.mjs').parseMdxDocument>} document
 * @param {import('../source-inspector.mjs').default} inspector
 */
export default function validateQuickStart(document, inspector) {
  const diagnostics = [];
  const quickStart = document.section("Quick start");
  if (!quickStart) return { diagnostics, componentImports: [] };
  const { imports, parseErrors } = parseQuickStartImports(quickStart.content);
  for (const error of parseErrors) {
    diagnostics.push(
      diagnostic(
        document,
        "quick-start/syntax",
        `Quick start code cannot be parsed: ${error.message}`,
        quickStart.start + error.index,
      ),
    );
  }
  const componentImports = imports.filter(({ source }) =>
    source.startsWith("carbon-react/lib/components/"),
  );
  if (!componentImports.length) {
    diagnostics.push(
      diagnostic(
        document,
        "quick-start/import",
        "Quick start must import the documented component from carbon-react/lib/components/…",
        quickStart.start,
      ),
    );
  }
  for (const [importIndex, importInfo] of componentImports.entries()) {
    const result = inspector.inspectComponentImport(importInfo);
    if (!result?.sourcePath) {
      diagnostics.push(
        diagnostic(
          document,
          "quick-start/module",
          `Component module “${importInfo.source}” does not resolve in src/components.`,
          quickStart.start + importInfo.index,
        ),
      );
      continue;
    }
    if (
      importIndex === 0 &&
      componentRootName(result.sourcePath) !==
        componentRootName(document.filePath)
    ) {
      diagnostics.push(
        diagnostic(
          document,
          "quick-start/component-module",
          `The first component import must document this component family, not “${importInfo.source}”.`,
          quickStart.start + importInfo.index,
        ),
      );
    }
    if (result.missingExports.length) {
      diagnostics.push(
        diagnostic(
          document,
          "quick-start/export",
          `Import references missing public export${result.missingExports.length > 1 ? "s" : ""}: ${result.missingExports.join(", ")}.`,
          quickStart.start + importInfo.index,
        ),
      );
    }
  }
  return { diagnostics, componentImports };
}
