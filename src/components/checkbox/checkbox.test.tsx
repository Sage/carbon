import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from ".";
import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

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

test("should render with provided `inputHint`", () => {
  render(
    <Checkbox
      label="label"
      inputHint="hint text"
      checked
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("hint text")).toBeVisible();
  expect(screen.getByRole("checkbox")).toHaveAccessibleDescription("hint text");
});

test("should render with provided aria-labelledby", () => {
  render(<Checkbox aria-labelledby="labelId" checked onChange={() => {}} />);

  expect(screen.getByRole("checkbox")).toHaveAttribute(
    "aria-labelledby",
    "labelId",
  );
});

test("should render with provided aria-describedby", () => {
  render(
    <Checkbox aria-describedby="descriptionId" checked onChange={() => {}} />,
  );

  expect(screen.getByRole("checkbox")).toHaveAttribute(
    "aria-describedby",
    "descriptionId",
  );
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

test("should render an indeterminate checkbox when `indeterminate` prop is true", () => {
  render(
    <Checkbox
      label="label"
      onChange={() => {}}
      checked={false}
      indeterminate
    />,
  );

  expect(screen.getByRole("checkbox")).not.toBeChecked();
  expect(screen.getByTestId("indeterminate-svg")).toBeVisible();
});

test("should render with provided aria-controls", () => {
  render(<Checkbox aria-controls="checkbox-1" checked onChange={() => {}} />);

  expect(screen.getByRole("checkbox")).toHaveAttribute(
    "aria-controls",
    "checkbox-1",
  );
});

test("should render with provided `error`", () => {
  render(
    <Checkbox
      label="label"
      error="error message"
      checked
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("error message")).toBeVisible();
  expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(
    "error message",
  );
});

test("should render with provided `warning`", () => {
  render(
    <Checkbox
      label="label"
      warning="warning message"
      checked
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("warning message")).toBeVisible();
  expect(screen.getByRole("checkbox")).toHaveAccessibleDescription(
    "warning message",
  );
});

test("should render `labelHelp` as `inputHint`", () => {
  render(
    <Checkbox
      label="label"
      labelHelp="hint text"
      checked
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("hint text")).toBeVisible();
  expect(screen.getByRole("checkbox")).toHaveAccessibleDescription("hint text");
});

// coverage
test("should render with provided `validationMessagePositionTop` set to false", () => {
  render(
    <Checkbox
      label="label"
      error="error message"
      validationMessagePositionTop={false}
      checked
      onChange={() => {}}
    />,
  );

  expect(screen.getByText("error message")).toBeVisible();
});

// coverage - cannot test style overrides on jest
test("should render with expected styles when `size` is large", () => {
  render(<Checkbox label="label" size="large" checked onChange={() => {}} />);

  expect(screen.getByTestId("checkable-wrapper")).toBeVisible();
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
