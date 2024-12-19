import React from "react";
import { render, screen } from "@testing-library/react";
import FormField from ".";
import TabContext from "../../components/tabs/tab/__internal__/tab.context";
import { mockMatchMedia } from "../../__spec_helper__/__internal__/test-utils";

test("throws a console error when `isOptional` and `isRequired` are both true", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => {
    render(<FormField id="mock-input" isOptional isRequired />);
  }).toThrow(
    "an input cannot be set to both required and optional at the same time",
  );

  consoleSpy.mockRestore();
});

test("does not throw a console error when `isRequired` is true and `isOptional` is false", () => {
  expect(() => {
    render(<FormField id="mock-input" isRequired />);
  }).not.toThrow();
});

test("does not throw a console error when `isOptional` is true and `isRequired` is false", () => {
  expect(() => {
    render(<FormField id="mock-input" isOptional />);
  }).not.toThrow();
});

test("throws a console error when `error` and `disabled` are both true", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => {
    render(<FormField id="mock-input" error disabled />);
  }).toThrow(
    `Prop \`error\` cannot be used in conjunction with \`disabled\`. ` +
      "Use `readOnly` if you require users to see validations with a non-interactive field",
  );

  consoleSpy.mockRestore();
});

test("throws a console error when `warning` and `disabled` are both true", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => {
    render(<FormField id="mock-input" warning disabled />);
  }).toThrow(
    `Prop \`warning\` cannot be used in conjunction with \`disabled\`. ` +
      "Use `readOnly` if you require users to see validations with a non-interactive field",
  );

  consoleSpy.mockRestore();
});

test("throws a console error when `info` and `disabled` are both true", () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => {
    render(<FormField id="mock-input" info disabled />);
  }).toThrow(
    `Prop \`info\` cannot be used in conjunction with \`disabled\`. ` +
      "Use `readOnly` if you require users to see validations with a non-interactive field",
  );

  consoleSpy.mockRestore();
});

test("calls `setError` passed from `TabContext` when `error` is true", () => {
  const setError = jest.fn();
  render(
    <TabContext.Provider value={{ setError }}>
      <FormField id="foo" error />
    </TabContext.Provider>,
  );

  expect(setError).toHaveBeenCalledWith("foo", true);
});

test("calls `setWarning` passed from `TabContext` when `warning` is true", () => {
  const setWarning = jest.fn();
  render(
    <TabContext.Provider value={{ setWarning }}>
      <FormField id="foo" warning />
    </TabContext.Provider>,
  );

  expect(setWarning).toHaveBeenCalledWith("foo", true);
});

test("calls `setInfo` passed from `TabContext` when `info` is true", () => {
  const setInfo = jest.fn();
  render(
    <TabContext.Provider value={{ setInfo }}>
      <FormField id="foo" info />
    </TabContext.Provider>,
  );

  expect(setInfo).toHaveBeenCalledWith("foo", true);
});

test("should not render with `labelInline` when `adaptiveLabelBreakpoint` set and screen is smaller than the breakpoint", () => {
  mockMatchMedia(false);
  render(
    <FormField
      id="mock-input"
      label="label"
      labelInline
      adaptiveLabelBreakpoint={1000}
    />,
  );

  expect(screen.getByTestId("field-line")).toHaveStyle("display: block");
});

test("should render with `labelInline` when `adaptiveLabelBreakpoint` set and screen is bigger than the breakpoint", () => {
  mockMatchMedia(true);
  render(
    <FormField
      id="mock-input"
      label="label"
      labelInline
      adaptiveLabelBreakpoint={1000}
    />,
  );

  expect(screen.getByTestId("field-line")).toHaveStyle("display: flex");
});

test("should render with `maxWidth` when provided", () => {
  render(<FormField id="mock-input" label="label" maxWidth="fit-content" />);

  expect(screen.getByTestId("field-line")).toHaveStyle(
    "max-width: fit-content",
  );
});
