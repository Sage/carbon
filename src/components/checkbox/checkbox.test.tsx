import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from ".";
import CarbonProvider from "../carbon-provider";
import {
  mockMatchMedia,
  testStyledSystemMargin,
  assertDeprecationWarning,
} from "../../__spec_helper__/__internal__/test-utils";

test("displays a deprecation warning if `fieldHelp` is used", () => {
  assertDeprecationWarning({
    component: (
      <Checkbox
        value="1"
        label="label-1"
        onChange={() => {}}
        checked
        fieldHelp="help"
      />
    ),
    deprecationMessage:
      "The `fieldHelp` prop of the `Checkbox` component is deprecated and will soon be removed.",
  });
});

test("displays a deprecation warning if `adaptiveSpacingBreakpoint` is used", () => {
  assertDeprecationWarning({
    component: (
      <Checkbox
        value="1"
        label="label-1"
        onChange={() => {}}
        checked
        adaptiveSpacingBreakpoint={200}
      />
    ),
    deprecationMessage:
      "The `adaptiveSpacingBreakpoint` prop of the `Checkbox` component is deprecated and will soon be removed.",
  });
});

test("should call onChange when checkbox is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<Checkbox checked onChange={onChange} />);

  await user.click(screen.getByRole("checkbox"));
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("should call onClick when checkbox is clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Checkbox checked onChange={() => {}} onClick={onClick} />);

  await user.click(screen.getByRole("checkbox"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("should call onFocus when checkbox is focused", async () => {
  const user = userEvent.setup();
  const onFocus = jest.fn();
  render(<Checkbox checked onChange={() => {}} onFocus={onFocus} />);

  await user.tab();
  expect(onFocus).toHaveBeenCalledTimes(1);
});

test("should call onBlur when checkbox is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(<Checkbox checked onChange={() => {}} onBlur={onBlur} />);

  await user.tab();
  await user.tab();
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("should accept ref as an object", () => {
  const ref = { current: null };
  render(<Checkbox checked onChange={() => {}} ref={ref} />);

  expect(ref.current).not.toBeNull();
});

test("should accept ref as a callback", () => {
  const ref = jest.fn();
  render(<Checkbox checked onChange={() => {}} ref={ref} />);

  expect(ref).toHaveBeenCalledTimes(1);
});

test("should set ref to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(
    <Checkbox checked onChange={() => {}} ref={ref} />,
  );

  unmount();
  expect(ref.current).toBeNull();
});

test("should render with provided label", () => {
  render(<Checkbox label="label" checked onChange={() => {}} />);

  expect(screen.getByText("label")).toBeVisible();
});

test("should render with provided aria-labelledby", () => {
  render(<Checkbox aria-labelledby="labelId" checked onChange={() => {}} />);

  expect(screen.getByRole("checkbox")).toHaveAttribute(
    "aria-labelledby",
    "labelId",
  );
});

test("should render tooltip with provided labelHelp and helpAriaLabel", async () => {
  const user = userEvent.setup();
  render(
    <Checkbox
      label="label"
      labelHelp="labelHelp"
      helpAriaLabel="helpAriaLabel"
      checked
      onChange={() => {}}
    />,
  );

  const helpTooltip = screen.getByRole("button");
  expect(helpTooltip).toHaveAccessibleName("helpAriaLabel");

  await user.hover(helpTooltip);
  expect(helpTooltip).toHaveAccessibleDescription("labelHelp");
});

test("should render input with validation tooltip as its accessible description when the input is focused", async () => {
  const user = userEvent.setup();
  render(<Checkbox label="label" checked onChange={() => {}} error="error" />);

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toHaveAttribute("aria-describedby");

  await user.click(checkbox);
  expect(checkbox).toHaveAccessibleDescription("error");
});

test("should append the validation tooltip to the input's accessible description when fieldHelp is set and the input is focused", async () => {
  const user = userEvent.setup();
  render(
    <Checkbox
      label="label"
      checked
      onChange={() => {}}
      fieldHelp="fieldHelp"
      error="error"
    />,
  );

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).toHaveAccessibleDescription("fieldHelp");

  await user.click(checkbox);
  expect(checkbox).toHaveAccessibleDescription("fieldHelp error");
});

test("should render a required checkbox when the required prop is true", () => {
  render(<Checkbox label="label" checked onChange={() => {}} required />);

  expect(screen.getByRole("checkbox")).toBeRequired();
});

test("should render a disabled checkbox when disabled prop is true", () => {
  render(<Checkbox label="label" checked onChange={() => {}} disabled />);

  expect(screen.getByRole("checkbox")).toBeDisabled();
});

test("should render a checked checkbox when checked prop is true", () => {
  render(<Checkbox label="label" onChange={() => {}} checked />);

  expect(screen.getByRole("checkbox")).toBeChecked();
});

test("should render fieldHelp with expected styles when inputWidth is set", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      inputWidth={50}
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({
    marginLeft: "50% !important",
  });
});

test("should render fieldHelp with expected styles when inputWidth is set and reverse is true", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      inputWidth={50}
      reverse
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({
    marginRight: "50% !important",
  });
});

test("should render fieldHelp with expected styles when labelSpacing is 2", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      labelSpacing={2}
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({
    paddingLeft: "var(--spacing200)",
  });
});

test("should render with expected styles when fieldHelpInline is true", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      fieldHelpInline
    />,
  );

  expect(screen.getByText("label")).toHaveStyle({ flex: "0 1 auto" });
  expect(screen.getByText("fieldHelp")).toHaveStyle({ marginLeft: "0" });
});

test("should render with expected styles when fieldHelpInline is true and reverse is true", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      fieldHelpInline
      reverse
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({ paddingLeft: "6px" });
});

test("should render with expected styles when size is large", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      size="large"
    />,
  );

  expect(screen.getByText("fieldHelp")).toHaveStyle({ marginLeft: "24px" });
  expect(screen.getByTestId("checkable-svg")).toHaveStyle({
    height: "24px",
    width: "24px",
    minWidth: "24px",
  });
});

test("should render with expected styles when size is large and fieldHelpInline is true", () => {
  render(
    <Checkbox
      label="label"
      fieldHelp="fieldHelp"
      checked
      onChange={() => {}}
      size="large"
      fieldHelpInline
    />,
  );

  expect(screen.getByTestId("label-container")).toHaveStyle({
    alignSelf: "center",
  });
  expect(screen.getByText("fieldHelp")).toHaveStyle({ alignSelf: "center" });
});

test("should render checkbox svg with expected styles when validation props are true", () => {
  render(
    <>
      <Checkbox label="label-1" checked onChange={() => {}} error />
      <Checkbox label="label-2" checked onChange={() => {}} warning />
      <Checkbox label="label-3" checked onChange={() => {}} info />
    </>,
  );

  const checkboxes = screen.getAllByTestId("checkable-svg");
  expect(checkboxes[0]).toHaveStyle({
    border: "2px solid var(--colorsSemanticNegative500)",
  });
  expect(checkboxes[1]).toHaveStyle({
    border: "1px solid var(--colorsSemanticCaution500)",
  });
  expect(checkboxes[2]).toHaveStyle({
    border: "1px solid var(--colorsSemanticInfo500)",
  });
});

test("should render checkbox svg with expected styles when validationRedesignOptIn is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <Checkbox label="label-1" checked onChange={() => {}} warning />
      <Checkbox label="label-2" checked onChange={() => {}} info />
    </CarbonProvider>,
  );

  const checkboxes = screen.getAllByTestId("checkable-svg");
  expect(checkboxes[0]).toHaveStyle({
    border: "1px solid var(--colorsUtilityMajor300)",
  });
  expect(checkboxes[1]).toHaveStyle({
    border: "1px solid var(--colorsUtilityMinor300)",
  });
});

test("should render with expected styles when adaptiveSpacingBreakpoint set and screen is smaller than the breakpoint", () => {
  mockMatchMedia(false);
  render(
    <Checkbox
      data-role="checkbox-1"
      label="label"
      checked
      onChange={() => {}}
      adaptiveSpacingBreakpoint={1000}
      ml="10%"
    />,
  );

  expect(screen.getByTestId("checkbox-1")).toHaveStyle({ marginLeft: "0" });
});

test("should render with expected styles when adaptiveSpacingBreakpoint set and screen is larger than the breakpoint", () => {
  mockMatchMedia(true);
  render(
    <Checkbox
      data-role="checkbox-1"
      label="label"
      checked
      onChange={() => {}}
      adaptiveSpacingBreakpoint={1000}
      ml="10%"
    />,
  );

  expect(screen.getByTestId("checkbox-1")).toHaveStyle({ marginLeft: "10%" });
});

testStyledSystemMargin(
  (props) => (
    <Checkbox
      label="label"
      checked
      onChange={() => {}}
      data-role="checkbox-1"
      {...props}
    />
  ),
  () => screen.getByTestId("checkbox-1"),
);
