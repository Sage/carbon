import React from "react";
import { render, screen } from "@testing-library/react";

import { RadioButton, RadioButtonGroup } from "..";

test("renders with RadioButton children", () => {
  render(
    <RadioButtonGroup name="radio-group" value="" onChange={() => {}}>
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  expect(
    screen.getByRole("radio", { name: "Radio Button" }),
  ).toBeInTheDocument();
  expect(screen.getByTestId("radio-svg")).toBeVisible();
});

test("renders with provided `legend`", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
    >
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  expect(
    screen.getByRole("group", { name: "Radio Group Legend" }),
  ).toBeVisible();
});

test("renders with provided `legendHint`", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      legendHint="Legend Hint"
    >
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  expect(screen.getByText("Legend Hint")).toBeVisible();
  expect(
    screen.getByRole("group", { name: "Radio Group Legend" }),
  ).toHaveAccessibleDescription("Legend Hint");
});

test("renders with `error` message", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      error="Error Message"
    >
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  const group = screen.getByRole("group", { name: "Radio Group Legend" });

  expect(screen.getByText("Error Message")).toBeVisible();
  expect(group).toHaveAccessibleDescription("Error Message");
});

test("checks the correct RadioButton based on `value`", () => {
  render(
    <RadioButtonGroup name="radio-group" value="radio-2" onChange={() => {}}>
      <RadioButton value="radio-1" label="Radio Button 1" />
      <RadioButton value="radio-2" label="Radio Button 2" />
    </RadioButtonGroup>,
  );

  expect(
    screen.getByRole("radio", { name: "Radio Button 1" }),
  ).not.toBeChecked();
  expect(screen.getByRole("radio", { name: "Radio Button 2" })).toBeChecked();
});

test("renders RadioButton children as requires when `RadioButtonGroup` is required", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      required
    >
      <RadioButton value="radio-1" label="Radio Button 1" />
      <RadioButton value="radio-2" label="Radio Button 2" />
    </RadioButtonGroup>,
  );

  expect(screen.getByRole("radio", { name: "Radio Button 1" })).toBeRequired();
  expect(screen.getByRole("radio", { name: "Radio Button 2" })).toBeRequired();
});

test("renders RadioButton children as disabled when `disabled` is true", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      disabled
    >
      <RadioButton value="radio-1" label="Radio Button 1" />
      <RadioButton value="radio-2" label="Radio Button 2" />
    </RadioButtonGroup>,
  );

  expect(screen.getByRole("radio", { name: "Radio Button 1" })).toBeDisabled();
  expect(screen.getByRole("radio", { name: "Radio Button 2" })).toBeDisabled();
});
