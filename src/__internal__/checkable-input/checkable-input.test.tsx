import React from "react";
import { act, render, screen } from "@testing-library/react";
import CheckableInput from ".";

test("renders `label` with expected id when `id` prop is passed", () => {
  render(<CheckableInput type="checkbox" label="label" id="foo" />);

  expect(screen.getByText("label")).toHaveAttribute("id", "foo-label");
});

test("renders `fieldHelp` with expected id when `id` prop is passed", () => {
  render(<CheckableInput type="checkbox" fieldHelp="fieldHelp" id="foo" />);

  expect(screen.getByText("fieldHelp")).toHaveAttribute("id", "foo-field-help");
});

test("renders input with provided `aria-labelledby`", () => {
  render(<CheckableInput type="checkbox" ariaLabelledBy="foo" />);

  expect(screen.getByRole("checkbox")).toHaveAttribute(
    "aria-labelledby",
    "foo",
  );
});

test("renders input with 'aria-describedby' as the id of the `fieldHelp`", () => {
  render(<CheckableInput type="checkbox" fieldHelp="fieldHelp" id="foo" />);

  const input = screen.getByRole("checkbox");

  expect(input).toHaveAccessibleDescription("fieldHelp");
});

// we are not able to test the computed accessible description here as the validation tooltip is rendered in consuming components
// tested in Checkbox component
test("renders input with 'aria-describedby' as the id of the validation tooltip when the input is focused", () => {
  render(<CheckableInput type="checkbox" id="foo" error="error" />);

  const input = screen.getByRole("checkbox");

  expect(input).not.toHaveAttribute("aria-describedby");

  act(() => {
    input.focus();
  });

  expect(input).toHaveAttribute("aria-describedby", "foo-validation-0");
});

test("appends the id of the validation tooltip to the input's 'aria-describedby' when fieldHelp is set and the input is focused", () => {
  render(
    <CheckableInput
      type="checkbox"
      fieldHelp="fieldHelp"
      id="foo"
      error="error"
    />,
  );

  const input = screen.getByRole("checkbox");

  expect(input).toHaveAttribute("aria-describedby", "foo-field-help");

  act(() => {
    input.focus();
  });

  expect(input).toHaveAttribute(
    "aria-describedby",
    "foo-field-help foo-validation-0",
  );
});

test("sets 'aria-invalid' to 'true' on the input when `error` prop is passed", () => {
  render(<CheckableInput type="checkbox" error="error" />);

  expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
});

test("renders a required input when `required` prop is true", () => {
  render(<CheckableInput type="checkbox" required />);

  expect(screen.getByRole("checkbox")).toBeRequired();
});

test("renders a disabled input when the `disabled` prop is true", () => {
  render(<CheckableInput type="checkbox" disabled />);

  expect(screen.getByRole("checkbox")).toBeDisabled();
});

// coverage
test("renders label with expected width when `labelWidth` prop is passed", () => {
  render(<CheckableInput type="checkbox" label="label" labelWidth={30} />);

  expect(screen.getByTestId("label-container")).toHaveStyle({ width: "30%" });
});
