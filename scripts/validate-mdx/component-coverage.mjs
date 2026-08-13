// @ts-check
import path from "node:path";
import { existsSync, readdirSync } from "node:fs";
import { MDX_COVERAGE_EXCLUSIONS } from "./config.mjs";

/**
 * @param {string[]} componentFolders
 * @param {string[]} mdxFiles
 * @param {string} componentsDir
 * @param {Set<string>} [exclusions]
 */
export function findMissingMdxFolders(
  componentFolders,
  mdxFiles,
  componentsDir,
  exclusions = MDX_COVERAGE_EXCLUSIONS,
) {
  const coveredFolders = new Set(
    mdxFiles
      .map((filePath) => path.relative(componentsDir, filePath))
      .filter((relativePath) => !relativePath.startsWith(`..${path.sep}`))
      .map((relativePath) => relativePath.split(path.sep)[0]),
  );
  return componentFolders
    .filter((folder) => !exclusions.has(folder))
    .filter((folder) => !coveredFolders.has(folder))
    .sort();
}

/** @param {string} folderPath */
function diagnosticPath(folderPath) {
  for (const indexFile of ["index.ts", "index.tsx", "index.js", "index.jsx"]) {
    const candidate = path.join(folderPath, indexFile);
    if (existsSync(candidate)) return candidate;
  }
  return folderPath;
}

/** @param {string} repoRoot @param {string[]} mdxFiles */
export default function validateComponentCoverage(repoRoot, mdxFiles) {
  const componentsDir = path.join(repoRoot, "src", "components");
  const componentFolders = readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return findMissingMdxFolders(componentFolders, mdxFiles, componentsDir).map(
    (folder) => ({
      filePath: diagnosticPath(path.join(componentsDir, folder)),
      rule: "coverage/missing-mdx",
      message: `Component folder “${folder}” must contain at least one non-internal MDX file or be added to MDX_COVERAGE_EXCLUSIONS with a documented reason.`,
      severity: "error",
      line: 1,
      column: 1,
    }),
  );
}
