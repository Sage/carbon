import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(
  new URL("./rewrite-declaration-imports.mjs", import.meta.url),
);

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "carbon-types-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));

  return {
    write(file, content) {
      const target = path.join(directory, "lib", file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
      return target;
    },
    run() {
      return spawnSync(process.execPath, [script], {
        cwd: directory,
        encoding: "utf8",
      });
    },
  };
}

test("rewrites declaration imports to resolvable ESM paths", (t) => {
  const files = fixture(t);
  files.write(
    "components/button/button.component.d.ts",
    "export type ButtonProps = {};\n",
  );
  files.write(
    "components/button/index.d.ts",
    'export * from "./button.component";\n',
  );
  const entry = files.write(
    "components/entry.d.ts",
    [
      'import type { ButtonProps } from "./button/button.component";',
      'export { default as Button } from "./button";',
      'export type { ButtonProps } from "./button/button.component";',
      'type Props = import("./button/button.component").ButtonProps;',
      'declare module "./button" { interface Metadata { name: string; } }',
      'import type Tokens from "@sage/design-tokens/js/base/es6.js";',
      'import type { Store } from "./store.js";',
      "",
    ].join("\n"),
  );

  const result = files.run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Rewrote 6 imports in 2 declarations\./);
  assert.equal(
    fs.readFileSync(entry, "utf8"),
    [
      'import type { ButtonProps } from "./button/button.component.js";',
      'export { default as Button } from "./button/index.js";',
      'export type { ButtonProps } from "./button/button.component.js";',
      'type Props = import("./button/button.component.js").ButtonProps;',
      'declare module "./button/index.js" { interface Metadata { name: string; } }',
      'import type Tokens from "@sage/design-tokens/js/base/es6.js";',
      'import type { Store } from "./store.js";',
      "",
    ].join("\n"),
  );

  const secondRun = files.run();
  assert.equal(secondRun.status, 0, secondRun.stderr);
  assert.match(secondRun.stdout, /Rewrote 0 imports in 0 declarations\./);
});

test("fails when a relative declaration import has no emitted target", (t) => {
  const files = fixture(t);
  files.write("entry.d.ts", 'export * from "./missing";\n');

  const result = files.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Cannot resolve \.\/missing/);
});
