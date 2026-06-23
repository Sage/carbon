// @ts-check
import path from "node:path";
import fs from "node:fs/promises";
import fg from "fast-glob";
import { repoRoot } from "./skills-config.mjs";

/**
 * Discover all component MDX files, build their output slugs (giving `__next__`
 * variants priority and suffixing legacy duplicates with `-legacy`), and the
 * set of slugs available for link resolution.
 * @returns {Promise<{mdxEntries: import("./skills-types.mjs").MdxEntry[], mdxToSlug: Map<string, string>, availableSlugs: Set<string>}>}
 */
export async function discoverMdx() {
  const allMdxFiles = fg
    .sync(["src/components/**/*.mdx"], {
      cwd: repoRoot,
      absolute: true,
      ignore: ["**/__internal__/**", "**/node_modules/**"],
    })
    .sort();

  /** @type {import("./skills-types.mjs").MdxEntry[]} */
  const mdxEntries = [];

  for (const mdxPath of allMdxFiles) {
    const content = await fs.readFile(mdxPath, "utf8");
    const isDeprecated = content.includes("<DeprecationWarning");
    const isNext = mdxPath.includes("/__next__/");
    const baseName = path.basename(mdxPath, ".mdx");
    mdxEntries.push({ mdxPath, content, isNext, baseName, isDeprecated });
  }

  // ─── Output directory naming (priority to __next__) ───────────────────────

  /** @type {Map<string, string>} slug -> mdxPath */
  const slugToMdx = new Map();
  /** @type {Map<string, string>} mdxPath -> outputSlug */
  const mdxToSlug = new Map();

  // First pass: collect all base names, __next__ gets priority
  /** @type {Map<string, {nextPath: string | null, regularPath: string | null}>} */
  const nameConflicts = new Map();

  for (const entry of mdxEntries) {
    const existing = nameConflicts.get(entry.baseName) ?? {
      nextPath: null,
      regularPath: null,
    };
    if (entry.isNext) {
      existing.nextPath = entry.mdxPath;
    } else {
      existing.regularPath = entry.mdxPath;
    }
    nameConflicts.set(entry.baseName, existing);
  }

  for (const [baseName, { nextPath, regularPath }] of nameConflicts.entries()) {
    if (nextPath && regularPath) {
      // __next__ takes the simple name, regular gets -legacy
      mdxToSlug.set(nextPath, baseName);
      slugToMdx.set(baseName, nextPath);
      mdxToSlug.set(regularPath, `${baseName}-legacy`);
      slugToMdx.set(`${baseName}-legacy`, regularPath);
    } else if (nextPath) {
      mdxToSlug.set(nextPath, baseName);
      slugToMdx.set(baseName, nextPath);
    } else if (regularPath) {
      mdxToSlug.set(regularPath, baseName);
      slugToMdx.set(baseName, regularPath);
    }
  }

  // Build slug set for link resolution
  const availableSlugs = new Set(slugToMdx.keys());

  return { mdxEntries, mdxToSlug, availableSlugs };
}
