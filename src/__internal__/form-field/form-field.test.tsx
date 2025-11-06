import React from "react";
import { render, screen } from "@testing-library/react";
import FormField from ".";
import { TabsContext } from "../../components/tabs/__next__/tabs.context";
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

test("calls `setErrors` passed from `TabContext` when `error` is true", () => {
  const setErrors = jest.fn();
  render(
    <TabsContext.Provider
      value={{
        setErrors,
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
        setWarnings: () => {},
        size: "medium",
        errors: {},
        warnings: {},
        setInfos: () => {},
        infos: {},
      }}
    >
      <FormField id="foo" error />
    </TabsContext.Provider>,
  );

  expect(setErrors).toHaveBeenCalledWith("foo", "", true);
});

test("calls `setWarnings` passed from `TabContext` when `warning` is true", () => {
  const setWarnings = jest.fn();
  render(
    <TabsContext.Provider
      value={{
        setWarnings,
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
        setErrors: () => {},
        setInfos: () => {},
        infos: {},
        size: "medium",
        errors: {},
        warnings: {},
      }}
    >
      <FormField id="foo" warning />
    </TabsContext.Provider>,
  );

  expect(setWarnings).toHaveBeenCalledWith("foo", "", true);
});

test("calls `setInfos` passed from `TabContext` when `info` is true", () => {
  const setInfos = jest.fn();
  render(
    <TabsContext.Provider
      value={{
        setErrors: () => {},
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
        setWarnings: () => {},
        size: "medium",
        errors: {},
        warnings: {},
        setInfos,
        infos: {},
      }}
    >
      <FormField id="foo" info />
    </TabsContext.Provider>,
  );

  expect(setInfos).toHaveBeenCalledWith("foo", "", true);
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
