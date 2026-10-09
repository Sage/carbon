import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import validateDependencies from "./validate-dependencies.mjs";

const entryPoint = fileURLToPath(new URL("./index.mjs", import.meta.url));
const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const packageEntry = "node_modules/@sage/design-tokens-fusion";
const outputs = [
  "src/components/tokens-wrapper/__internal__/static-tokens/index.js",
  "src/components/dialog/__internal__/__next__/__internal__/tokens/index.ts",
  "src/components/textarea/__internal__/tokens/index.ts",
];

const temporaryProject = (t) => {
  const root = fs.mkdtempSync(
    path.join(os.tmpdir(), "carbon-token-generation-"),
  );
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
};

const writeJSON = (root, file, value) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(value));
};

const writeLock = (root) =>
  writeJSON(root, "package-lock.json", {
    packages: {
      [packageEntry]: { name: "@sage/design-tokens", version: "18.15.0" },
    },
  });

test("missing node_modules fails before token imports with install instructions", (t) => {
  const root = temporaryProject(t);
  writeLock(root);
  const result = spawnSync(process.execPath, [entryPoint, "--include-dark"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Dependencies are missing.*npm ci/);
  assert.equal(fs.existsSync(path.join(root, "src")), false);
});

test("missing or mismatched installed token package is rejected", (t) => {
  const root = temporaryProject(t);
  writeLock(root);
  fs.mkdirSync(path.join(root, "node_modules"));
  assert.throws(
    () => validateDependencies(root),
    /Token dependency .* is missing.*npm ci/,
  );
  writeJSON(root, `${packageEntry}/package.json`, {
    name: "@sage/design-tokens",
    version: "18.14.0",
  });
  assert.throws(
    () => validateDependencies(root),
    /requires 18\.15\.0.*18\.14\.0 is installed.*npm ci/,
  );
});

test("missing lockfile or locked token version is rejected", (t) => {
  const root = temporaryProject(t);
  assert.throws(
    () => validateDependencies(root),
    /requires this checkout's package-lock/,
  );
  writeJSON(root, "package-lock.json", { packages: {} });
  fs.mkdirSync(path.join(root, "node_modules"));
  assert.throws(() => validateDependencies(root), /No locked version/);
});

test("the npm alias is accepted when its installed version matches the lockfile", (t) => {
  const root = temporaryProject(t);
  writeLock(root);
  writeJSON(root, `${packageEntry}/package.json`, {
    name: "@sage/design-tokens",
    version: "18.15.0",
  });
  assert.doesNotThrow(() => validateDependencies(root));
});

test("generation recreates missing outputs, preserves unchanged files and updates changed content", (t) => {
  const root = temporaryProject(t);
  fs.copyFileSync(
    path.join(projectRoot, "package-lock.json"),
    path.join(root, "package-lock.json"),
  );
  fs.symlinkSync(
    path.join(projectRoot, "node_modules"),
    path.join(root, "node_modules"),
    "dir",
  );
  const generate = () => {
    const result = spawnSync(process.execPath, [entryPoint, "--include-dark"], {
      cwd: root,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
  };
  generate();
  const contents = outputs.map((file) =>
    fs.readFileSync(path.join(root, file), "utf8"),
  );
  // An old timestamp makes accidental rewrites detectable on any filesystem.
  outputs.forEach((file) => fs.utimesSync(path.join(root, file), 1, 1));
  generate();
  outputs.forEach((file, index) => {
    assert.equal(fs.statSync(path.join(root, file)).mtimeMs, 1000);
    assert.equal(
      fs.readFileSync(path.join(root, file), "utf8"),
      contents[index],
    );
  });
  fs.rmSync(path.join(root, path.dirname(outputs[0])), { recursive: true });
  fs.unlinkSync(path.join(root, outputs[1]));
  fs.writeFileSync(path.join(root, outputs[2]), "stale tokens");
  generate();
  outputs.forEach((file, index) => {
    assert.equal(
      fs.readFileSync(path.join(root, file), "utf8"),
      contents[index],
    );
  });
});
