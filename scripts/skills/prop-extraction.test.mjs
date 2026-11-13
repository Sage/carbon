import assert from "node:assert/strict";
import test from "node:test";
import { Project } from "ts-morph";

import {
  extractDefaultsFromDeclaration,
  extractDefaultsFromExport,
  getLiteralUnionValues,
} from "./prop-extraction.mjs";

const createSourceFile = (code) =>
  new Project({
    useInMemoryFileSystem: true,
    compilerOptions: { strict: true },
  }).createSourceFile("component.tsx", code);

test("extracts destructured defaults from forwardRef and memo components", () => {
  const sourceFile = createSourceFile(`
    import React, { forwardRef, memo } from "react";
    export const Direct = forwardRef(({ size = "medium" }, ref) => null);
    export const Namespaced = React.forwardRef(function Render(
      { open = true },
      ref,
    ) {
      return null;
    });
    export const Memoised = memo(
      React.forwardRef(({ variant = "info" }, ref) => null),
    );
  `);

  const defaultsFor = (name) =>
    Object.fromEntries(
      extractDefaultsFromDeclaration(
        sourceFile.getVariableDeclarationOrThrow(name),
      ),
    );

  assert.deepEqual(defaultsFor("Direct"), { size: '"medium"' });
  assert.deepEqual(defaultsFor("Namespaced"), { open: "true" });
  assert.deepEqual(defaultsFor("Memoised"), { variant: '"info"' });
});

test("extracts defaults through re-exports when local and public names differ", () => {
  const project = new Project({ useInMemoryFileSystem: true });
  project.createSourceFile(
    "switch/switch.component.tsx",
    `
      import React from "react";
      const SwitchComponent = React.forwardRef(({ size = "small" }, ref) => null);
      export { SwitchComponent as Switch };
      export default SwitchComponent;
    `,
  );
  project.createSourceFile(
    "switch/index.ts",
    'export { default } from "./switch.component";',
  );
  const entryFile = project.createSourceFile(
    "index.ts",
    'export { default as Switch } from "./switch";',
  );

  assert.deepEqual(
    Object.fromEntries(extractDefaultsFromExport(entryFile, "Switch")),
    { size: '"small"' },
  );
  assert.equal(extractDefaultsFromExport(entryFile, "Missing").size, 0);
});

test("ignores calls that are not component wrappers", () => {
  const sourceFile = createSourceFile(`
    const wrap = (fn) => fn;
    export const Wrapped = wrap(({ size = "medium" }) => null);
  `);

  assert.equal(
    extractDefaultsFromDeclaration(
      sourceFile.getVariableDeclarationOrThrow("Wrapped"),
    ).size,
    0,
  );
});

test("lists literal values of optional and aliased union props", () => {
  const sourceFile = createSourceFile(`
    type Variant = "info" | "error";
    interface Props {
      required: Variant;
      aliased?: Variant;
      inline?: "small" | "large" | null;
      flag?: boolean;
      mixed?: Variant | string;
    }
  `);
  const props = sourceFile.getInterfaceOrThrow("Props");
  const literalsFor = (name) =>
    getLiteralUnionValues(props.getPropertyOrThrow(name).getType());

  assert.deepEqual(literalsFor("required"), ["info", "error"]);
  assert.deepEqual(literalsFor("aliased"), ["info", "error"]);
  assert.deepEqual(literalsFor("inline"), ["small", "large"]);
  assert.equal(literalsFor("flag"), null);
  assert.equal(literalsFor("mixed"), null);
});
