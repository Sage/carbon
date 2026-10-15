import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { digestFiles } from "./collect-metadata.mjs";

test("fingerprints ignore timestamps and checkout location, but detect content and workload changes", async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "carbon-fingerprint-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const first = path.join(root, "first");
  const second = path.join(root, "second");
  for (const directory of [first, second]) {
    await fs.mkdir(directory);
    await fs.writeFile(path.join(directory, "fixture.tsx"), "fixture code");
    await fs.writeFile(path.join(directory, "workload.ts"), "100 results");
  }
  const files = ["fixture.tsx", "workload.ts"];
  const fingerprint = await digestFiles(
    first,
    files.map((file) => path.join(first, file)),
  );
  await fs.utimes(path.join(first, "fixture.tsx"), 1, 1);
  assert.equal(
    await digestFiles(
      first,
      files.map((file) => path.join(first, file)),
    ),
    fingerprint,
  );
  assert.equal(
    await digestFiles(
      second,
      files.map((file) => path.join(second, file)).reverse(),
    ),
    fingerprint,
  );
  await fs.writeFile(path.join(first, "workload.ts"), "200 results");
  assert.notEqual(
    await digestFiles(
      first,
      files.map((file) => path.join(first, file)),
    ),
    fingerprint,
  );
});
