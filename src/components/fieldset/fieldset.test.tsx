import React from "react";
import { render, screen } from "@testing-library/react";
import Fieldset from ".";
import Textbox from "../textbox";
import Decimal from "../decimal";
import Password from "../password";
import DateInput from "../date";
import Textarea from "../textarea";
import TextEditor from "../text-editor";
import { Select, MultiSelect, FilterableSelect, Option } from "../select";
import { Checkbox } from "../checkbox";

test("should render with provided `legend`", () => {
  render(<Fieldset legend="Legend" />);

  expect(screen.getByText("Legend")).toBeVisible();
});

test("should render with provided `legendHint`", () => {
  render(<Fieldset legendHint="Hint Text" />);

  expect(screen.getByText("Hint Text")).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription("Hint Text");
});

test("should render with provided `error`", () => {
  render(<Fieldset legend="Legend" error="Error message" />);

  expect(screen.getByText("Error message")).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "Error message",
  );
});

test("should render with provided `warning`", () => {
  render(<Fieldset legend="Legend" warning="Warning message" />);

  expect(screen.getByText("Warning message")).toBeVisible();
  expect(screen.getByRole("group")).toHaveAccessibleDescription(
    "Warning message",
  );
});

test("should set Carbon child inputs as required when `required` is set", () => {
  render(
    <Fieldset legend="Legend" required>
      <Textbox label="Textbox" value="Input Text" onChange={() => {}} />
      <Decimal label="Decimal" value="0.00" onChange={() => {}} />
      <Password label="Password" value="Password" onChange={() => {}} />
      <DateInput label="DateInput" value="10/10/2010" onChange={() => {}} />
      <Checkbox label="Checkbox" checked onChange={() => {}} />
      <Textarea label="Textarea" value="textarea" onChange={() => {}} />
      <TextEditor labelText="TextEditor" onChange={() => {}} />
      <Select label="Simple Select" value="1" onChange={() => {}}>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <MultiSelect label="Multi Select" value={["1"]} onChange={() => {}}>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <FilterableSelect label="Filterable Select" value="1" onChange={() => {}}>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </FilterableSelect>
    </Fieldset>,
  );

  expect(screen.getByRole("textbox", { name: "Textbox" })).toBeRequired();
  expect(screen.getByRole("textbox", { name: "Decimal" })).toBeRequired();
  expect(screen.getByLabelText("Password")).toBeRequired();
  expect(screen.getByRole("textbox", { name: "DateInput" })).toBeRequired();
  expect(screen.getByRole("checkbox", { name: "Checkbox" })).toBeRequired();
  expect(screen.getByRole("textbox", { name: "Textarea" })).toBeRequired();
  expect(screen.getByRole("textbox", { name: "TextEditor" })).toBeRequired();
  expect(
    screen.getByRole("combobox", { name: "Simple Select" }),
  ).toBeRequired();
  expect(
    screen.getByRole("combobox", { name: "Multi Select Amber" }),
  ).toBeRequired();
  expect(
    screen.getByRole("combobox", { name: "Filterable Select" }),
  ).toBeRequired();
});

// coverage - style overrides cannot be tested in jest
test("should render child input label with bold font when `labelWeight` is set to 'bold'", () => {
  render(
    <Fieldset legend="Legend" labelWeight="bold">
      <Textbox label="Label" value="Input Text" onChange={() => {}} />
    </Fieldset>,
  );

  expect(screen.getByText("Label")).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
  );
});

// coverage
test("should render render with expected styles when `orientation` is 'horizontal'", () => {
  render(
    <Fieldset legend="Legend" orientation="horizontal">
      <Textbox label="Label" value="Input Text" onChange={() => {}} />
    </Fieldset>,
  );

  expect(screen.getByTestId("fieldset-content")).toHaveStyle({ flex: "row" });
});

// coverage
test("should render with `validationMessagePositionTop` set to false", () => {
  render(
    <Fieldset
      legend="Legend"
      error="Error message"
      validationMessagePositionTop={false}
    />,
  );

  expect(screen.getByText("Error message")).toBeVisible();
});
