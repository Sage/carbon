import assert from "node:assert/strict";

import {
  compareDeclarations,
  declarationsFromSource,
  hasBreakingChangeFooter,
} from "./checker.mjs";

const compare = (before, after) =>
  compareDeclarations(
    "ExampleProps",
    declarationsFromSource("example.ts", before).get("ExampleProps"),
    declarationsFromSource("example.ts", after).get("ExampleProps"),
  );

test("requires a BREAKING CHANGE footer to acknowledge API breaks", () => {
  assert.equal(hasBreakingChangeFooter("fix: require spacing"), false);
  assert.equal(
    hasBreakingChangeFooter("fix: mention BREAKING CHANGE: in prose"),
    false,
  );
  assert.equal(
    hasBreakingChangeFooter(
      "feat!: require spacing\n\nBREAKING CHANGE: labelSpacing is now required.",
    ),
    true,
  );
});

test("allows additive optional props", () => {
  assert.deepEqual(
    compare(
      "export interface ExampleProps { value: string }",
      "export interface ExampleProps { value: string; label?: string }",
    ),
    [],
  );
});

test("allows additive optional methods", () => {
  assert.deepEqual(
    compare(
      "export interface ExampleProps { value: string }",
      "export interface ExampleProps { value: string; validate?(): void }",
    ),
    [],
  );
});

test("allows a required prop to become optional", () => {
  assert.deepEqual(
    compare(
      "export interface ExampleProps { value: string }",
      "export interface ExampleProps { value?: string }",
    ),
    [],
  );
});

test("allows a prop type to widen", () => {
  assert.deepEqual(
    compare(
      'export interface ExampleProps { value: "one" }',
      'export interface ExampleProps { value: "one" | "two" }',
    ),
    [],
  );
});

test("allows an unresolved named type to be retained in a wider union", () => {
  assert.deepEqual(
    compare(
      "export interface ExampleProps { value: ExternalValue }",
      "export interface ExampleProps { value: ExternalValue | string }",
    ),
    [],
  );
});

test("ignores documentation-only changes", () => {
  assert.deepEqual(
    compare(
      "/** Old description. */ export interface ExampleProps { value: string }",
      "/** New description. */ export interface ExampleProps { /** @deprecated */ value: string }",
    ),
    [],
  );
});

test("detects removed props", () => {
  assert.match(
    compare(
      "export interface ExampleProps { value: string; label?: string }",
      "export interface ExampleProps { value: string }",
    )[0],
    /ExampleProps\.label was removed\./,
  );
});

test("detects narrowed prop types", () => {
  assert.match(
    compare(
      "export interface ExampleProps { value: string }",
      'export interface ExampleProps { value: "one" | "two" }',
    )[0],
    /ExampleProps\.value changed type from `string` to `"one" \| "two"`\./,
  );
});

test("detects required props", () => {
  assert.match(
    compare(
      "export interface ExampleProps { value: string }",
      "export interface ExampleProps { value: string; label: string }",
    )[0],
    /ExampleProps\.label was added as a required member\./,
  );
});

test("explains when an optional prop becomes required", () => {
  assert.deepEqual(
    compare(
      "export interface ExampleProps { labelSpacing?: 1 | 2 }",
      "export interface ExampleProps { labelSpacing: 1 | 2 }",
    ),
    ["ExampleProps.labelSpacing changed from optional to required."],
  );
});

test("detects callback signature changes", () => {
  assert.match(
    compare(
      "export interface ExampleProps { onChange?: (value: string) => void }",
      "export interface ExampleProps { onChange?: (value: number) => void }",
    )[0],
    /ExampleProps\.onChange changed type from/,
  );
});

test("detects callback changes on exported const functions", () => {
  const before = declarationsFromSource(
    "example.ts",
    "export const subscribe = (callback: (value: string) => void) => callback('value')",
  ).get("subscribe");
  const after = declarationsFromSource(
    "example.ts",
    "export const subscribe = (callback: (value: number) => void) => callback(1)",
  ).get("subscribe");

  assert.match(
    compareDeclarations("subscribe", before, after)[0],
    /changed its variable signature/,
  );
});
