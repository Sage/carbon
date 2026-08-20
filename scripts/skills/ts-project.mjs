// @ts-check
import path from "node:path";
import { Project } from "ts-morph";
import { repoRoot } from "./skills-config.mjs";

export const project = new Project({
  tsConfigFilePath: path.join(repoRoot, "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});

project.addSourceFilesAtPaths([
  path.join(repoRoot, "src", "components", "**", "*.ts"),
  path.join(repoRoot, "src", "components", "**", "*.tsx"),
]);

/**
 * Get a source file already known to the project, otherwise add it from disk.
 * @param {string} filePath
 * @returns {import("ts-morph").SourceFile | undefined}
 */
export function getOrAddSourceFile(filePath) {
  return (
    project.getSourceFile(filePath) ||
    project.addSourceFileAtPathIfExists(filePath)
  );
}
