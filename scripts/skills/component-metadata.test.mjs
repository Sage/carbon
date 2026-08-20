import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

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
