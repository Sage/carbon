import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import ts from "typescript";

import { validateComponentMetadata } from "./component-metadata.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

test("accepts concise authored component guidance", () => {
  const metadata = validateComponentMetadata({
    component: "Pill",
    summary: "Compact visual indicator.",
    useWhen: ["Showing a short status."],
    avoidWhen: ["The element performs an action."],
    alternatives: [{ component: "Badge", when: "Showing a count." }],
    pitfalls: ["Label removable pills."],
    examples: [{ story: "Wrapped", description: "Allow long labels to wrap." }],
  });

  assert.equal(metadata.component, "Pill");
});

test("does not require guidance that would only repeat the summary", () => {
  const metadata = validateComponentMetadata({
    component: "Pill",
    summary: "Compact visual indicator.",
  });

  assert.equal(metadata.component, "Pill");
  assert.equal(metadata.useWhen, undefined);
});

test("rejects duplicate curated stories", () => {
  assert.throws(
    () =>
      validateComponentMetadata({
        component: "Pill",
        summary: "Compact visual indicator.",
        useWhen: ["Showing a short status."],
        examples: [
          { story: "Wrapped", description: "First." },
          { story: "Wrapped", description: "Second." },
        ],
      }),
    /selects story "Wrapped" more than once/,
  );
});

test("rejects unknown fields so guidance cannot be silently dropped", () => {
  assert.throws(
    () =>
      validateComponentMetadata({
        component: "Pill",
        summary: "Compact visual indicator.",
        useWhen: ["Showing a short status."],
        usage: "This field is not supported.",
      }),
    /unknown field "usage"/,
  );
});

test("rejects unknown nested fields so guidance cannot be silently dropped", () => {
  assert.throws(
    () =>
      validateComponentMetadata({
        component: "Pill",
        summary: "Compact visual indicator.",
        examples: [
          {
            story: "Wrapped",
            description: "Allow long labels to wrap.",
            source: "pill.stories.tsx",
          },
        ],
      }),
    /examples\[0\] contains unknown field "source"/,
  );
});

test("rejects empty optional sections", () => {
  assert.throws(
    () =>
      validateComponentMetadata({
        component: "Pill",
        summary: "Compact visual indicator.",
        pitfalls: [],
      }),
    /field "pitfalls" must be a non-empty array when provided/,
  );
});

test("keeps authored metadata and generated skills out of the npm package", () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"),
  );

  assert.deepEqual([...packageJson.files].sort(), ["esm", "lib"]);
  assert.equal(
    path
      .relative(repoRoot, path.join(repoRoot, "docs", "component-metadata"))
      .split(path.sep)[0],
    "docs",
  );
});

test("generated curated examples contain valid TSX", () => {
  const exampleFiles = fg.sync("skills/carbon-react/examples/**/*.md", {
    cwd: repoRoot,
    absolute: true,
  });
  assert.ok(exampleFiles.length, "expected at least one curated example");

  for (const filePath of exampleFiles) {
    const markdown = fs.readFileSync(filePath, "utf8");
    const snippets = [...markdown.matchAll(/```tsx\n([\s\S]*?)```/g)];
    assert.ok(
      snippets.length,
      `${path.relative(repoRoot, filePath)} must contain a TSX snippet`,
    );

    for (const [, code] of snippets) {
      const sourceFile = ts.createSourceFile(
        filePath.replace(/\.md$/, ".tsx"),
        code,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      assert.deepEqual(
        sourceFile.parseDiagnostics.map((diagnostic) =>
          ts.flattenDiagnosticMessageText(diagnostic.messageText, " "),
        ),
        [],
        `${path.relative(repoRoot, filePath)} contains invalid TSX`,
      );
    }
  }
});
