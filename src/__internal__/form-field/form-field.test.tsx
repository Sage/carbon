import React from "react";
import { render, screen } from "@testing-library/react";
import FormField from ".";
import { TabsContext } from "../../components/tabs/tabs.context";
import { mockMatchMedia } from "../../__spec_helper__/__internal__/test-utils";

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
  const setTabErrors = jest.fn();
  render(
    <TabsContext.Provider
      value={{
        setTabErrors,
        activeTab: "tab-1",
        currentTabId: "tab-1",
        focusIndex: "tab-1",
        isInTab: false,
        labelledBy: "",
        orientation: "horizontal",
        selectedTabId: "",
        setActiveTab: () => {},
        setFocusIndex: () => {},
        setCurrentTabId: () => {},
        setTabWarnings: () => {},
        size: "medium",
        tabErrors: {},
        tabWarnings: {},
      }}
    >
      <FormField id="foo" error />
    </TabsContext.Provider>,
  );

  expect(setTabErrors).toHaveBeenCalledWith("foo", "", true);
});

test("calls `setWarning` passed from `TabContext` when `warning` is true", () => {
  const setTabWarnings = jest.fn();
  render(
    <TabsContext.Provider
      value={{
        setTabWarnings,
        activeTab: "tab-1",
        currentTabId: "tab-1",
        focusIndex: "tab-1",
        isInTab: false,
        labelledBy: "",
        orientation: "horizontal",
        selectedTabId: "",
        setActiveTab: () => {},
        setFocusIndex: () => {},
        setCurrentTabId: () => {},
        setTabErrors: () => {},
        size: "medium",
        tabErrors: {},
        tabWarnings: {},
      }}
    >
      <FormField id="foo" warning />
    </TabsContext.Provider>,
  );

  expect(setTabWarnings).toHaveBeenCalledWith("foo", "", true);
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
