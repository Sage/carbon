// @ts-check
import path from "node:path";
import { existsSync } from "node:fs";

/**
 * @param {string} value
 * @returns {string}
 */
export function escapePipes(value) {
  return value?.replace(/\|/g, "\\|") ?? "";
}

/**
 * Resolve a stories import path to an absolute file path.
 * @param {string} mdxDir
 * @param {string} relativePath
 * @returns {string | null}
 */
export function resolveStoriesPath(mdxDir, relativePath) {
  const basePath = path.resolve(mdxDir, relativePath);
  const extensions = [".ts", ".tsx", ".js", ".jsx"];

  if (existsSync(basePath)) return basePath;
  for (const ext of extensions) {
    const candidate = basePath + ext;
    if (existsSync(candidate)) return candidate;
  }
  // Try with /index
  for (const ext of extensions) {
    const candidate = path.join(basePath, `index${ext}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}
