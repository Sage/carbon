// @ts-check
import path from "node:path";
import { referencesExamplesDir } from "./skills-config.mjs";
import { getOrAddSourceFile } from "./ts-project.mjs";
import { extractStoriesImports } from "./mdx-parser.mjs";
import { getStoryExportSource } from "./story-source.mjs";
import {
  resolvePropsForStories,
  resolveArgTypesFromMeta,
} from "./props-from-stories.mjs";
import { renderPropsTable } from "./renderers.mjs";
import { transformLinksForRefDoc } from "./links.mjs";
import { resolveStoriesPath } from "./utils.mjs";

/**
 * Process a reference MDX file: strip Storybook boilerplate, expand Canvas/ArgTypes, transform links.
 * @param {string} rawContent
 * @param {string} sourcePath
 * @param {Set<string>} availableSlugs
 * @returns {{content: string, exampleFiles: import("./skills-types.mjs").OutputFile[]}}
 */
export function parseAndRenderReferenceMdx(
  rawContent,
  sourcePath,
  availableSlugs,
) {
  const mdxDir = path.dirname(sourcePath);
  const content = rawContent.replace(/\r\n/g, "\n");

  /** @type {import("./skills-types.mjs").OutputFile[]} */
  const exampleFiles = [];

  // Extract storiesImports before stripping import lines
  const storiesImports = extractStoriesImports(content);

  // Resolve stories files to absolute paths
  /** @type {Map<string, string>} alias -> absolute path */
  const resolvedStories = new Map();
  for (const [alias, relativePath] of storiesImports.entries()) {
    const resolved = resolveStoriesPath(mdxDir, relativePath);
    if (resolved) {
      resolvedStories.set(alias, resolved);
      getOrAddSourceFile(resolved);
    }
  }

  let result = content;

  // Strip top-level import lines (those outside fenced code blocks)
  // Process line by line to avoid stripping import statements inside code examples
  {
    const lines = result.split("\n");
    let inCodeBlock = false;
    result = lines
      .filter((line) => {
        if (line.startsWith("```")) inCodeBlock = !inCodeBlock;
        if (inCodeBlock) return true;
        return !/^import\s/.test(line);
      })
      .join("\n");
  }

  // Strip <Meta .../> tags
  result = result.replace(/<Meta\s[^>]*\/>\s*\n?/g, "");

  // Strip ## Contents section (heading + all content until next ## heading)
  const contentsMatch = result.match(/^## Contents\s*$/m);
  if (contentsMatch) {
    const afterContents = result.slice(
      contentsMatch.index + contentsMatch[0].length,
    );
    const nextH2 = afterContents.match(/^## /m);
    result =
      result.slice(0, contentsMatch.index) +
      (nextH2 ? afterContents.slice(nextH2.index) : "");
  }

  // Replace <Canvas of={Alias.ExportName}/> with example file references
  result = result.replace(
    /<Canvas\s+of=\{(\w+)\.(\w+)\}\s*\/>/g,
    (match, alias, exportName) => {
      const storiesPath = resolvedStories.get(alias);
      if (!storiesPath) {
        // eslint-disable-next-line no-console -- build warning
        console.warn(`[ref] Cannot resolve stories alias: ${alias}`);
        return "";
      }
      const source = getStoryExportSource(storiesPath, exportName);
      if (!source) {
        // eslint-disable-next-line no-console -- build warning
        console.warn(
          `[ref] Cannot find export "${exportName}" in ${path.basename(storiesPath)}`,
        );
        return "";
      }
      const fileName = `${exportName}.md`;
      const fileContent = "```tsx\n" + source + "\n```";
      exampleFiles.push({
        path: path.join(referencesExamplesDir, fileName),
        content: fileContent,
      });
      return `\nSee: \`examples/${fileName}\``;
    },
  );

  // Replace <ArgTypes of={alias}/> with rendered props table
  result = result.replace(
    /<ArgTypes[\s\S]*?of=\{(\w+)\}[\s\S]*?\/>/g,
    (match, alias) => {
      const storiesPath = resolvedStories.get(alias);
      if (!storiesPath) {
        // eslint-disable-next-line no-console -- build warning
        console.warn(`[ref] Cannot resolve ArgTypes alias: ${alias}`);
        return "";
      }
      let props = resolvePropsForStories(storiesPath);
      if (!props.length) {
        props = resolveArgTypesFromMeta(storiesPath);
      }
      return renderPropsTable(props);
    },
  );

  // Transform Storybook links to skill-relative paths
  result = transformLinksForRefDoc(result, availableSlugs);

  // Collapse 3+ consecutive blank lines to 2
  result = result.replace(/\n{3,}/g, "\n\n");

  return { content: result.trim() + "\n", exampleFiles };
}
