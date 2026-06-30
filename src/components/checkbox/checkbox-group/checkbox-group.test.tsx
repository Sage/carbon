import React from "react";
import { render, screen } from "@testing-library/react";
import { Checkbox, CheckboxGroup } from "..";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

test("should render with the provided children", () => {
  render(
    <CheckboxGroup>
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByText("label-1")).toBeVisible();
  expect(screen.getByText("label-2")).toBeVisible();
});

test("should render with the provided `legend`", () => {
  render(
    <CheckboxGroup legend="legend">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByText("legend")).toBeVisible();
});

test("should render with the provided `legendHint`", () => {
  render(
    <CheckboxGroup legend="legend" legendHint="hint text">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(screen.getByText("hint text")).toBeVisible();
  expect(fieldset).toHaveAccessibleDescription("hint text");
});

test("should render required checkbox children when `required` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" required>
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[0]).toBeRequired();
  expect(checkboxes[1]).toBeRequired();
});

test("should render disabled checkbox children when `disabled` prop is set", () => {
  render(
    <CheckboxGroup legend="legend" disabled>
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[0]).toBeDisabled();
  expect(checkboxes[1]).toBeDisabled();
});

test("should render with provided `error`", () => {
  render(
    <CheckboxGroup legend="legend" error="error message">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(screen.getByText("error message")).toBeVisible();
  expect(fieldset).toHaveAccessibleDescription("error message");
});

test("should render with provided `warning`", () => {
  render(
    <CheckboxGroup legend="legend" warning="warning message">
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group", { name: "legend" });
  expect(screen.getByText("warning message")).toBeVisible();
  expect(fieldset).toHaveAccessibleDescription("warning message");
});

test("should render with provided data- attributes", () => {
  render(
    <CheckboxGroup data-role="bar" data-element="baz">
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveAttribute("data-role", "bar");
  expect(fieldset).toHaveAttribute("data-element", "baz");
});

test("should render with `legendHelp` as 'legendHint`", () => {
  render(
    <CheckboxGroup legendHelp="legend help">
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByRole("group")).toHaveAccessibleDescription("legend help");
  expect(screen.getByText("legend help")).toBeVisible();
});

// coverage
test("should render with expected styles when `inline` is true", () => {
  render(
    <CheckboxGroup inline>
      <Checkbox value="1" label="label-1" onChange={() => {}} checked />
      <Checkbox value="2" label="label-2" onChange={() => {}} checked />
    </CheckboxGroup>,
  );

  expect(screen.getByTestId("checkbox-group-content")).toHaveStyle({
    flexDirection: "row",
  });
});

testStyledSystemMargin(
  (props) => (
    <CheckboxGroup
      data-role="checkbox-group-wrapper"
      legend="legend"
      {...props}
    >
      <Checkbox value="1" label="label" onChange={() => {}} checked />
    </CheckboxGroup>
  ),
  () => screen.getByTestId("checkbox-group-wrapper"),
);
