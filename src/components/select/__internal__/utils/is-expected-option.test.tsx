import React from "react";
import Option from "../../option";
import isExpectedOption from "./is-expected-option";

test("returns false when the element is not an Option", () => {
  expect(isExpectedOption(<div>mock</div>, "foo")).toBeFalsy();
});

test("returns true when the element is an Option whose value property matches expectedValue", () => {
  expect(
    isExpectedOption(<Option value="foo" text="bar" />, "foo"),
  ).toBeTruthy();
});

test("returns false when the element is an Option whose value property does not match expectedValue", () => {
  expect(
    isExpectedOption(<Option value="foo" text="bar" />, "bar"),
  ).toBeFalsy();
});

test("returns true when the element is an Option whose value property is an object whose id property matches that of expectedValue", () => {
  expect(
    isExpectedOption(
      <Option value={{ id: "foo", value: "foo" }} text="bar" />,
      { id: "foo", value: "foo" },
    ),
  ).toBeTruthy();
});

test("returns false when the element is an Option whose value property is an object whose id property does not match that of expectedValue", () => {
  expect(
    isExpectedOption(
      <Option value={{ id: "foo", value: "foo" }} text="bar" />,
      { id: "bar", value: "foo" },
    ),
  ).toBeFalsy();
});

it.each([
  ["null", null],
  ["undefined", undefined],
  ["empty string", ""],
  ["empty object", {}],
])("returns false when expectedValue is `%s`", (_, expectedValue) => {
  expect(
    isExpectedOption(
      <Option text="bar" value={{ id: "foo", value: "foo" }} />,
      expectedValue,
    ),
  ).toBe(false);
});
