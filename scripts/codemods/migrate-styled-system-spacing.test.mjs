import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const codemod = path.resolve(
  "scripts/codemods/migrate-styled-system-spacing.mjs",
);
const withFixture = (source, run) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "carbon-spacing-"));
  const fixture = path.join(directory, "example.tsx");
  fs.writeFileSync(fixture, source);

  try {
    run(fixture);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
};

const runCodemod = (args) => {
  const result = spawnSync(process.execPath, [codemod, ...args], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  return result;
};

test("prints help", () => {
  const result = runCodemod(["--help"]);
  assert.match(result.stdout, /--assume-base-theme/);
  assert.match(result.stdout, /--write/);
});

test("requires base-theme confirmation without modifying files", () => {
  const source = `import { Box } from "carbon-react";\n<Box p={2} />;\n`;
  withFixture(source, (fixture) => {
    const result = runCodemod([fixture]);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /pass --assume-base-theme/);
    assert.equal(fs.readFileSync(fixture, "utf8"), source);
  });
});

test("rewrites every supported base-theme index for Carbon import aliases", () => {
  const elements = Array.from(
    { length: 11 },
    (_, index) => `<CarbonBox p={${index}} />`,
  ).join("\n");
  const source = `import { Box as CarbonBox } from "carbon-react";\n${elements}\n`;
  withFixture(source, (fixture) => {
    const result = runCodemod(["--assume-base-theme", fixture]);
    assert.match(result.stdout, /p="var\(--global-space-none\)"/);
    assert.match(result.stdout, /p="var\(--global-space-layout-3-xs\)"/);
    assert.match(result.stdout, /p="var\(--global-space-layout-4-xl\)"/);
    assert.match(
      result.stderr,
      /Would update 11 static spacing prop\(s\); 0 require manual review/,
    );
    assert.equal(fs.readFileSync(fixture, "utf8"), source);
  });
});

test("rewrites Carbon deep and namespace imports in write mode", () => {
  const source = `
    import * as Carbon from "carbon-react";
    import Box from "carbon-react/lib/components/box";
    <Carbon.Button p={2} />;
    <Box mt={0} />;
  `;
  withFixture(source, (fixture) => {
    const result = runCodemod(["--assume-base-theme", "--write", fixture]);

    const migrated = fs.readFileSync(fixture, "utf8");
    assert.match(migrated, /p="var\(--global-space-layout-2-xs\)"/);
    assert.match(migrated, /mt="var\(--global-space-none\)"/);
    assert.match(
      result.stderr,
      /Updated 2 static spacing prop\(s\); 0 require manual review/,
    );
  });
});

test("leaves token-first, unverified, dynamic, responsive, negative, and unsupported values for review", () => {
  const source = `
    import { Box, BoxNext as TokenBox } from "carbon-react";
    <TokenBox p={8} />;
    <Box p={size} mx={[1, 2]} mt={-2} mb={11} />;
    <ThirdParty p={2} />;
  `;
  withFixture(source, (fixture) => {
    const result = runCodemod(["--assume-base-theme", fixture]);
    assert.equal(result.stdout, "");
    assert.match(
      result.stderr,
      /p requires manual review \(value is not a static non-negative integer\)/,
    );
    assert.match(
      result.stderr,
      /mx requires manual review \(value is not a static non-negative integer\)/,
    );
    assert.match(
      result.stderr,
      /mt requires manual review \(value is not a static non-negative integer\)/,
    );
    assert.match(
      result.stderr,
      /mb requires manual review \(value is outside the supported legacy index range \(0-10\)\)/,
    );
    assert.match(
      result.stderr,
      /p requires manual review \(component is not imported from carbon-react\)/,
    );
    assert.match(
      result.stderr,
      /Would update 0 static spacing prop\(s\); 5 require manual review/,
    );
  });
});
