// @ts-check
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import fg from "fast-glob";
import {
  repoRoot,
  skillsRoot,
  componentsOutDir,
  referencesDir,
  referencesExamplesDir,
  docsReferenceFiles,
} from "./skills-config.mjs";
import { discoverMdx } from "./mdx-discovery.mjs";
import { parseMdxFile } from "./mdx-parser.mjs";
import { getOrAddSourceFile } from "./ts-project.mjs";
import { getStoryExampleSource } from "./story-source.mjs";
import { resolvePropsForStories } from "./props-from-stories.mjs";
import { parseAndRenderReferenceMdx } from "./reference-mdx.mjs";
import {
  renderSkillMd,
  renderSkillRootContent,
  renderIndexContent,
} from "./renderers.mjs";
import { resolveStoriesPath } from "./utils.mjs";

const checkMode = process.argv.includes("--check");

const { mdxEntries, mdxToSlug, availableSlugs } = await discoverMdx();

/** @type {import("./skills-types.mjs").OutputFile[]} */
const wouldWrite = [];

/** @type {Array<{title: string, slug: string, description: string, category: string, isDeprecated: boolean}>} */
const indexEntries = [];

let processedCount = 0;
let skippedCount = 0;

for (const entry of mdxEntries) {
  const slug = mdxToSlug.get(entry.mdxPath);
  if (!slug) {
    skippedCount++;
    continue;
  }

  const mdxDir = path.dirname(entry.mdxPath);
  const parsed = parseMdxFile(entry.content);

  // Collect for catalog index
  const descOneLine = parsed.description
    .replace(/\n+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, (_, t) => t.replace(/<[^>]+>/g, ""))
    .replace(/<[^>]+>/g, "")
    .trim();
  indexEntries.push({
    title: parsed.componentTitle,
    slug,
    description: descOneLine,
    category: parsed.category ?? "",
    isDeprecated: entry.isDeprecated,
  });

  // Resolve stories files
  /** @type {Map<string, string>} alias -> absolute path */
  const resolvedStories = new Map();
  for (const [alias, relativePath] of parsed.storiesImports.entries()) {
    const resolved = resolveStoriesPath(mdxDir, relativePath);
    if (resolved) {
      resolvedStories.set(alias, resolved);
      getOrAddSourceFile(resolved);
    }
  }

  // Extract examples
  /** @type {import("./skills-types.mjs").ExampleFile[]} */
  const exampleFiles = [];

  for (const example of parsed.examples) {
    for (const item of example.items) {
      const { canvasRef, description } = item;

      if (!canvasRef) {
        // Prose-only item: no example file, just description
        exampleFiles.push({
          heading: example.heading,
          fileName: null,
          description,
        });
        continue;
      }

      const storiesPath = resolvedStories.get(canvasRef.alias);
      if (!storiesPath) {
        console.warn(
          `[${slug}] Cannot resolve stories alias: ${canvasRef.alias}`,
        );
        continue;
      }
      const source = await getStoryExampleSource(
        storiesPath,
        canvasRef.exportName,
      );
      if (!source) {
        console.warn(
          `[${slug}] Cannot find export "${canvasRef.exportName}" in ${path.basename(storiesPath)}`,
        );
        continue;
      }
      const fileName = `${canvasRef.exportName}.md`;
      const fileContent = "```tsx\n" + source + "\n```";
      const outputPath = path.join(
        componentsOutDir,
        slug,
        "examples",
        fileName,
      );
      wouldWrite.push({ path: outputPath, content: fileContent });
      exampleFiles.push({ heading: example.heading, fileName, description });
    }
  }

  // Extract props
  /** @type {Map<string, import("./skills-types.mjs").PropInfo[]>} */
  const propsMap = new Map();
  for (const argTypeRef of parsed.argTypeRefs) {
    const storiesPath = resolvedStories.get(argTypeRef.alias);
    const heading =
      argTypeRef.heading ?? argTypeRef.alias.replace(/Stories$/, "");
    if (!storiesPath) {
      console.warn(
        `[${slug}] Cannot resolve ArgTypes stories alias: ${argTypeRef.alias}`,
      );
      propsMap.set(heading, []);
      continue;
    }
    const props = resolvePropsForStories(storiesPath);
    propsMap.set(heading, props);
  }

  // Render component index.md
  const skillContent = renderSkillMd(
    parsed,
    propsMap,
    exampleFiles,
    entry.isDeprecated,
    availableSlugs,
  );
  wouldWrite.push({
    path: path.join(componentsOutDir, slug, "index.md"),
    content: skillContent,
  });

  processedCount++;
}

// Generate root SKILL.md, index.md, and copy references/docs
wouldWrite.push({
  path: path.join(skillsRoot, "SKILL.md"),
  content: renderSkillRootContent(),
});
wouldWrite.push({
  path: path.join(skillsRoot, "index.md"),
  content: renderIndexContent(indexEntries),
});

for (const entry of docsReferenceFiles) {
  const relativePath = typeof entry === "string" ? entry : entry.source;
  const sourcePath = path.join(repoRoot, relativePath);
  if (!existsSync(sourcePath)) {
    continue;
  }
  const refFileName =
    typeof entry === "string"
      ? path.basename(sourcePath).replace(/\.mdx?$/, ".md")
      : entry.target;
  const targetPath = path.join(referencesDir, refFileName);
  const rawContent = await fs.readFile(sourcePath, "utf8");
  const { content: processedContent, exampleFiles } =
    await parseAndRenderReferenceMdx(rawContent, sourcePath, availableSlugs);
  wouldWrite.push(...exampleFiles);
  wouldWrite.push({
    path: targetPath,
    content: processedContent,
  });
}

// ─── Write Output ───────────────────────────────────────────────────────────

if (checkMode) {
  const expectedPaths = new Set(wouldWrite.map((w) => w.path));
  /** @type {string[]} */
  const diffs = [];

  for (const { path: filePath, content } of wouldWrite) {
    let existing;
    try {
      existing = await fs.readFile(filePath, "utf8");
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        err.code === "ENOENT"
      ) {
        diffs.push(`  Missing: ${path.relative(repoRoot, filePath)}`);
        continue;
      }
      throw err;
    }
    if (existing.replace(/\r\n/g, "\n") !== content.replace(/\r\n/g, "\n")) {
      diffs.push(`  Modified: ${path.relative(repoRoot, filePath)}`);
    }
  }

  // Check for stale files in components/, references/docs/, and references/docs/examples/
  for (const dir of [componentsOutDir, referencesDir, referencesExamplesDir]) {
    if (!existsSync(dir)) continue;
    const staleFiles = fg.sync(["**/*"], {
      cwd: dir,
      absolute: true,
      onlyFiles: true,
    });
    for (const fullPath of staleFiles) {
      if (!expectedPaths.has(fullPath)) {
        diffs.push(`  Extra: ${path.relative(repoRoot, fullPath)}`);
      }
    }
  }

  if (diffs.length > 0) {
    // eslint-disable-next-line no-console -- CI output
    console.error("Skills build check failed:\n");
    // eslint-disable-next-line no-console -- CI output
    console.error(diffs.join("\n"));
    process.exit(1);
  }
  // eslint-disable-next-line no-console -- CI output
  console.log(
    `Check passed: ${processedCount} component skill files are up to date.`,
  );
} else {
  // Clean entire output directory then recreate structure
  await fs.rm(skillsRoot, { recursive: true, force: true });

  for (const { path: filePath, content } of wouldWrite) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf8");
  }
  // eslint-disable-next-line no-console -- Log summary
  console.log(
    `Generated ${processedCount} component skill files in skills/carbon-react/components/`,
  );
  if (skippedCount > 0) {
    // eslint-disable-next-line no-console -- Log summary
    console.log(`Skipped ${skippedCount} entries (no slug mapping).`);
  }
}
