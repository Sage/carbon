import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import ts from "typescript";

import { validateComponentMetadata } from "./component-metadata.mjs";
import {
  findDeprecatedImport,
  hasStorybookImport,
} from "./example-imports.mjs";

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

test("checks deprecations against the imported binding rather than its module", () => {
  const deprecatedComponents = [
    {
      name: "List",
      importName: "List",
      importPath: "carbon-react/lib/components/typography",
      supportsDefaultImport: false,
      supportsNamedImport: true,
    },
  ];

  assert.equal(
    findDeprecatedImport(
      'import Typography from "carbon-react/lib/components/typography";',
      deprecatedComponents,
    ),
    null,
  );
  assert.equal(
    findDeprecatedImport(
      'import { List as LegacyList } from "carbon-react/lib/components/typography";',
      deprecatedComponents,
    )?.name,
    "List",
  );
});

test("identifies Storybook-only example imports", () => {
  assert.equal(
    hasStorybookImport('import { action } from "storybook/actions";'),
    true,
  );
  assert.equal(
    hasStorybookImport('import { Meta } from "@storybook/react-vite";'),
    true,
  );
  assert.equal(hasStorybookImport('import "storybook/preview-api";'), true);
  assert.equal(hasStorybookImport('import { useState } from "react";'), false);
});

test("generated component imports match their public export binding", () => {
  const expectedImports = new Map([
    [
      "typography.md",
      'import Typography from "carbon-react/lib/components/typography";',
    ],
    [
      "list.md",
      'import { List } from "carbon-react/lib/components/typography";',
    ],
    ["pages.md", 'import Pages from "carbon-react/lib/components/pages";'],
    ["page.md", 'import { Page } from "carbon-react/lib/components/pages";'],
    ["card.md", 'import Card from "carbon-react/lib/components/card";'],
    [
      "card-column.md",
      'import { CardColumn } from "carbon-react/lib/components/card";',
    ],
    [
      "radio-button.md",
      'import RadioButton from "carbon-react/lib/components/radio-button";',
    ],
    [
      "radio-button-group.md",
      'import { RadioButtonGroup } from "carbon-react/lib/components/radio-button";',
    ],
  ]);

  for (const [fileName, importStatement] of expectedImports) {
    const markdown = fs.readFileSync(
      path.join(repoRoot, "skills", "carbon-react", "components", fileName),
      "utf8",
    );
    assert.ok(
      markdown.includes(`\`${importStatement}\``),
      `${fileName} should document ${importStatement}`,
    );
  }
});

test("generated curated examples contain valid TSX", () => {
  const exampleFiles = fg.sync("skills/carbon-react/examples/**/*.md", {
    cwd: repoRoot,
    absolute: true,
  });
  assert.ok(exampleFiles.length, "expected at least one curated example");

  for (const filePath of exampleFiles) {
    const markdown = fs.readFileSync(filePath, "utf8");
    assert.doesNotMatch(
      markdown,
      /Source story:/,
      `${path.relative(repoRoot, filePath)} must not reference repository-only story source`,
    );
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
