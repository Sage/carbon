import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton, RadioButtonGroup } from "..";

const ControlledRadioButtonGroup = () => {
  const [value, setValue] = useState("radio1");

  return (
    <RadioButtonGroup
      name="radio-group"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Button 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Button 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Button 3" />
    </RadioButtonGroup>
  );
};

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

test("renders with provided data- attributes", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      data-role="bar"
      data-element="baz"
    >
      <RadioButton value="radio1" label="Radio Button 1" />
    </RadioButtonGroup>,
  );

  const fieldset = screen.getByRole("group");

  expect(fieldset).toHaveAttribute("data-role", "bar");
  expect(fieldset).toHaveAttribute("data-element", "baz");
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

test("renders with `warning` message", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      warning="Warning Message"
    >
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  const group = screen.getByRole("group", { name: "Radio Group Legend" });

  expect(screen.getByText("Warning Message")).toBeVisible();
  expect(group).toHaveAccessibleDescription("Warning Message");
});

test("checks the correct RadioButton when `value` is set", () => {
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

test("renders RadioButton children as required when `RadioButtonGroup` is required", () => {
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

test("checks correct `RadioButton` child when clicked", async () => {
  const user = userEvent.setup();
  render(<ControlledRadioButtonGroup />);

  const radio1 = screen.getByRole("radio", { name: "Radio Button 1" });
  const radio2 = screen.getByRole("radio", { name: "Radio Button 2" });
  const radio3 = screen.getByRole("radio", { name: "Radio Button 3" });

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
  expect(radio3).not.toBeChecked();
});

// coverage
test("renders with expected styles when `inline` is true", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      inline
    >
      <RadioButton value="radio-1" label="Radio Button 1" />
      <RadioButton value="radio-2" label="Radio Button 2" />
    </RadioButtonGroup>,
  );

  const groupContentWrapper = screen.getByTestId("radio-button-group-content");
  expect(groupContentWrapper).toHaveStyle({ flexDirection: "row" });
});

test("renders with `legendHelp` as 'legendHint`", () => {
  render(
    <RadioButtonGroup
      name="radio-group"
      value=""
      onChange={() => {}}
      legend="Radio Group Legend"
      legendHelp="Legend Help"
    >
      <RadioButton value="radio" label="Radio Button" />
    </RadioButtonGroup>,
  );

  expect(
    screen.getByRole("group", { name: "Radio Group Legend" }),
  ).toHaveAccessibleDescription("Legend Help");
  expect(screen.getByText("Legend Help")).toBeVisible();
});
