import React from "react";
import { render, screen } from "@testing-library/react";
import { Checkbox, CheckboxGroup } from "..";
import CarbonProvider from "../../carbon-provider";
import { testStyledSystemMargin } from "../../../__spec_helper__/__internal__/test-utils";

test("should render with the provided children", () => {
  render(
    <CheckboxGroup>
      <Checkbox value="1" label="label-1" onChange={() => {}} />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByText("label-1")).toBeVisible();
  expect(screen.getByText("label-2")).toBeVisible();
});

test("should render with the provided legend", () => {
  render(
    <CheckboxGroup legend="legend">
      <Checkbox value="1" label="label" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByText("legend")).toBeVisible();
});

test("should render legendHelp as a hint text when validationRedesignOptIn is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="legend" legendHelp="legendHelp">
        <Checkbox value="1" label="label" onChange={() => {}} />
      </CheckboxGroup>
    </CarbonProvider>,
  );

  expect(screen.getByText("legendHelp")).toBeVisible();
});

test("should render required checkbox children when required prop is set", () => {
  render(
    <CheckboxGroup legend="legend" required>
      <Checkbox value="1" label="label-1" onChange={() => {}} />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes[0]).toBeRequired();
  expect(checkboxes[1]).toBeRequired();
});

it("should append (optional) text on the legend when isOptional prop is set", () => {
  render(
    <CheckboxGroup legend="legend" isOptional>
      <Checkbox value="1" label="label-1" onChange={() => {}} />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByText("legend")).toHaveStyleRule(
    "content",
    '"(optional)"',
    { modifier: "::after" },
  );
});

test("should render error message when error prop is set and validationRedesignOptIn is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="legend" error="error">
        <Checkbox value="1" label="label" onChange={() => {}} />
      </CheckboxGroup>
    </CarbonProvider>,
  );

  expect(screen.getByText("error")).toBeVisible();
});

test("should render warning message when warning prop is set and validationRedesignOptIn is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="legend" warning="warning">
        <Checkbox value="1" label="label" onChange={() => {}} />
      </CheckboxGroup>
    </CarbonProvider>,
  );

  expect(screen.getByText("warning")).toBeVisible();
});

test("should render with expected styles when legendInline is true", () => {
  render(
    <CheckboxGroup legend="legend" legendInline>
      <Checkbox
        data-role="checkbox-1"
        value="1"
        label="label-1"
        onChange={() => {}}
      />
      <Checkbox value="2" label="label-2" onChange={() => {}} />
    </CheckboxGroup>,
  );

  expect(screen.getByTestId("checkbox-1")).toHaveStyle({ paddingTop: "4px" });
});

test("should render with expected styles when inline is true", () => {
  render(
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="legend" inline>
        <Checkbox value="1" label="label-1" onChange={() => {}} />
        <Checkbox value="2" label="label-2" onChange={() => {}} />
      </CheckboxGroup>
    </CarbonProvider>,
  );

  expect(screen.getByTestId("checkbox-group")).toHaveStyle({
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
      <Checkbox value="1" label="label" onChange={() => {}} />
    </CheckboxGroup>
  ),
  () => screen.getByTestId("checkbox-group-wrapper"),
);
