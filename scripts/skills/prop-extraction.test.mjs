import assert from "node:assert/strict";
import test from "node:test";
import { Project } from "ts-morph";

import { extractDefaultsFromDeclaration } from "./prop-extraction.mjs";

const createSourceFile = (code) =>
  new Project({ useInMemoryFileSystem: true }).createSourceFile(
    "component.tsx",
    code,
  );

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
