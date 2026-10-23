import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

test("publishes the spacing CLI, ESLint rule, and its runtime dependency", () => {
  const cacheDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "carbon-npm-cache-"),
  );
  try {
    const result = spawnSync(
      "npm",
      [
        "pack",
        "--dry-run",
        "--json",
        "--ignore-scripts",
        "--cache",
        cacheDirectory,
      ],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);

    const [{ files }] = JSON.parse(result.stdout);
    const packedFiles = new Set(files.map(({ path: filePath }) => filePath));
    assert.ok(
      packedFiles.has("scripts/codemods/migrate-styled-system-spacing.mjs"),
    );
    assert.ok(
      packedFiles.has("scripts/eslint-rules/no-numeric-token-spacing.mjs"),
    );
    assert.ok(packedFiles.has("eslint.mjs"));

    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    assert.equal(
      packageJson.bin["carbon-migrate-spacing"],
      "scripts/codemods/migrate-styled-system-spacing.mjs",
    );
    assert.equal(packageJson.dependencies["ts-morph"], "^27.0.2");
  } finally {
    fs.rmSync(cacheDirectory, { recursive: true, force: true });
  }
});
