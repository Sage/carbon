import React from "react";
import extractTextFromNode from ".";

test("returns empty string for null or undefined", () => {
  expect(extractTextFromNode(null)).toBe("");
  expect(extractTextFromNode(undefined)).toBe("");
});

test("returns empty string for boolean values", () => {
  expect(extractTextFromNode(true)).toBe("");
  expect(extractTextFromNode(false)).toBe("");
});

test("returns empty string for objects that are not React elements", () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  expect(extractTextFromNode({ key: "value" } as any)).toBe("");
});

test("returns empty string for functions", () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  expect(extractTextFromNode((() => {}) as any)).toBe("");
});

test("returns empty string for empty strings", () => {
  expect(extractTextFromNode("")).toBe("");
});

test("returns empty string for empty arrays", () => {
  expect(extractTextFromNode([])).toBe("");
});

test("returns empty string for elements without text children", () => {
  expect(extractTextFromNode(<img alt="test" />)).toBe("");
});

test("returns string content directly", () => {
  expect(extractTextFromNode("Hello World")).toBe("Hello World");
});

test("converts numbers to strings", () => {
  expect(extractTextFromNode(42)).toBe("42");
});

test("extracts text from simple React elements", () => {
  expect(extractTextFromNode(<span>Username</span>)).toBe("Username");
});

test("extracts text from nested React elements", () => {
  expect(
    extractTextFromNode(
      <div>
        First <strong>Second</strong> Third
      </div>,
    ),
  ).toBe("First Second Third");
});

test("handles deeply nested structures", () => {
  expect(
    extractTextFromNode(
      <div>
        <span>Level 1</span>
        <div>
          <strong>Level 2</strong>
        </div>
      </div>,
    ),
  ).toBe("Level 1 Level 2");
});

test("handles fragments", () => {
  expect(extractTextFromNode(<>First Second</>)).toBe("First Second");
});

test("handles arrays of nodes", () => {
  expect(extractTextFromNode(["Hello", " ", "World"])).toBe("Hello World");
});

test("handles arrays with mixed content", () => {
  expect(
    extractTextFromNode(["Text", 42, <span>Element</span>, null, undefined]),
  ).toBe("Text 42 Element");
});

test("handles arrays with single element without trailing space", () => {
  expect(extractTextFromNode(["Hello"])).toBe("Hello");
});

test("handles arrays with empty strings filtered out", () => {
  expect(extractTextFromNode(["Hello", "", "World"])).toBe("Hello World");
});

test("handles arrays with only empty values", () => {
  expect(extractTextFromNode(["", null, undefined, false])).toBe("");
});
