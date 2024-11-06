import isExpectedValue from "./is-expected-value";

test("returns true when currentValue is a string and matches expectedValue", () => {
  expect(isExpectedValue("foo", "foo")).toBeTruthy();
});

test("returns false when currentValue is a string and does match expectedValue", () => {
  expect(isExpectedValue("foo", "bar")).toBeFalsy();
});

test("returns true when currentValue is an object whose id property matches that of expectedValue", () => {
  expect(
    isExpectedValue({ id: "foo", value: "foo" }, { id: "foo", value: "foo" }),
  ).toBeTruthy();
});

test("returns false when currentValue is an object whose id property does not match that of expectedValue", () => {
  expect(
    isExpectedValue({ id: "foo", value: "foo" }, { id: "bar", value: "foo" }),
  ).toBeFalsy();
});
