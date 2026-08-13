import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { findMissingMdxFolders } from "./component-coverage.mjs";

const componentsDir = path.resolve("/virtual/src/components");

test("requires one MDX per top-level component folder", () => {
  const missing = findMissingMdxFolders(
    ["button", "select", "undocumented"],
    [
      path.join(componentsDir, "button", "button.mdx"),
      path.join(componentsDir, "select", "simple-select", "simple-select.mdx"),
    ],
    componentsDir,
    new Set(),
  );

  assert.deepEqual(missing, ["undocumented"]);
});

test("allows explicitly excluded component folders", () => {
  const missing = findMissingMdxFolders(
    ["documented", "covered-elsewhere"],
    [path.join(componentsDir, "documented", "documented.mdx")],
    componentsDir,
    new Set(["covered-elsewhere"]),
  );

  assert.deepEqual(missing, []);
});
