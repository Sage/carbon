import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { discoverMdx } from "./mdx-discovery.mjs";
import { parseMdxFile } from "./mdx-parser.mjs";
import { repoRoot } from "./skills-config.mjs";
import { resolveStoryExample } from "./story-resolver.mjs";
import { resolveStoriesPath } from "./utils.mjs";

async function resolve(relativePath, exportName) {
  const result = await resolveStoryExample(
    path.join(repoRoot, relativePath),
    exportName,
  );
  assert.ok(result, `${exportName} should resolve`);
  return result;
}

test("resolves story and args spreads using JavaScript object semantics", async () => {
  const result = await resolve(
    "src/components/accordion/accordion.stories.tsx",
    "Subtitle",
  );

  assert.match(result, /<Accordion title="Title" subTitle="Subtitle">/);
  assert.doesNotMatch(result, /\.\.\.args|\.args\b/);
});

test("inlines arg property reads and omits undefined args", async () => {
  const result = await resolve(
    "src/components/pill/pill.stories.tsx",
    "InverseOnDarkBackground",
  );

  assert.match(result, /<Pill variant="blue" size="M" inverse>/);
  assert.match(result, /<Pill variant="blue" size="M" inverse fill>/);
  assert.match(result, />\s*Label\s*<\/Pill>/);
  assert.doesNotMatch(result, /args|onDelete|icon/);
});

test("resolves referenced render functions and destructured rest args", async () => {
  const result = await resolve(
    "src/components/button-toggle/button-toggle.stories.tsx",
    "Default",
  );

  assert.match(result, /aria-label="Button Toggle Group"/);
  assert.match(result, /useState\("default-2"\)/);
  assert.doesNotMatch(result, /\.\.\.args|\.args\b/);
});

test("replaces args copied by a top-level story spread", async () => {
  const result = await resolve(
    "src/components/button-toggle/button-toggle.stories.tsx",
    "WithLabelAndHint",
  );

  assert.match(result, /label="Label"/);
  assert.match(result, /inputHint="Hint Text"/);
  assert.doesNotMatch(result, /aria-label/);
});

test("resolves nested story args composition", async () => {
  const result = await resolve(
    "src/components/checkbox/checkbox.stories.tsx",
    "WithInputHint",
  );

  assert.match(result, /label="Checkbox"/);
  assert.match(result, /inputHint="Input Hint"/);
  assert.doesNotMatch(result, /\.\.\.args|\.args\b/);
});

test("falls back to the meta render", async () => {
  const result = await resolve(
    "src/components/content/content.stories.tsx",
    "InlineContent",
  );

  assert.match(result, /<Content title="Title" inline>/);
  assert.match(result, /This is an example of some content/);
  assert.doesNotMatch(result, /\.\.\.args|\.args\b/);
});

test("synthesizes Storybook's default component render", async () => {
  const result = await resolve(
    "src/components/menu/menu-full-screen/menu-full-screen.stories.tsx",
    "Default",
  );

  assert.match(result, /<MenuFullscreen children=\{\[\]\} \/>/);
});

test("resolves every story referenced by a component MDX Canvas", async () => {
  const { mdxEntries } = await discoverMdx();
  const failures = [];
  let canvasCount = 0;

  for (const entry of mdxEntries) {
    const parsed = parseMdxFile(entry.content);
    for (const example of parsed.examples) {
      for (const item of example.items) {
        if (!item.canvasRef) continue;
        canvasCount++;

        const storiesImport = parsed.storiesImports.get(item.canvasRef.alias);
        const storiesPath = storiesImport
          ? resolveStoriesPath(path.dirname(entry.mdxPath), storiesImport)
          : null;
        if (!storiesPath) {
          failures.push(`${entry.baseName}/${item.canvasRef.exportName}`);
          continue;
        }

        try {
          const result = await resolveStoryExample(
            storiesPath,
            item.canvasRef.exportName,
          );
          if (!result || /(?:\.\.\.args\b|\bargs\s*[.[])/.test(result)) {
            failures.push(`${entry.baseName}/${item.canvasRef.exportName}`);
          }
        } catch {
          failures.push(`${entry.baseName}/${item.canvasRef.exportName}`);
        }
      }
    }
  }

  assert.ok(canvasCount > 0);
  assert.deepEqual(failures, []);
});
