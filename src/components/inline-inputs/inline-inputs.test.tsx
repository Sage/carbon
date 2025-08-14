import React from "react";
import { render, screen } from "@testing-library/react";
import InlineInputs from ".";
import Textbox from "../textbox";
import {
  mockMatchMedia,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";

test("renders single child", () => {
  render(
    <InlineInputs>
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByRole("textbox")).toBeVisible();
});

test("renders multiple children", () => {
  render(
    <InlineInputs>
      <Textbox onChange={() => {}} />
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getAllByRole("textbox")).toHaveLength(2);
});

test("renders with provided label", () => {
  render(
    <InlineInputs label="Inputs Label">
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByText("Inputs Label")).toBeVisible();
});

test("renders with provided labelId", () => {
  render(
    <InlineInputs label="Inputs Label" labelId="inputs-label">
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByText("Inputs Label")).toHaveAttribute(
    "id",
    "inputs-label",
  );
});

test("renders with provided htmlFor", () => {
  render(
    <InlineInputs label="Inputs Label" htmlFor="inputs">
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByText("Inputs Label")).toHaveAttribute("for", "inputs");
});

test("renders required children when required prop is true", () => {
  render(
    <InlineInputs required>
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByRole("textbox")).toBeRequired();
});

test("renders with provided data-attributes", () => {
  render(
    <InlineInputs data-element="bar" data-role="baz">
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

// coverage
test("should render with expected styles when adaptiveLabelBreakpoint set and screen is smaller than the breakpoint", () => {
  mockMatchMedia(false);
  render(
    <InlineInputs
      data-role="inline-inputs"
      label="Inputs Label"
      adaptiveLabelBreakpoint={1000}
    >
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByTestId("inline-inputs")).toHaveStyle({
    display: "block",
  });
  expect(screen.getByTestId("label-container")).toHaveStyle({
    marginBottom: "8px",
  });
});

// coverage
test("should render with expected styles when adaptiveLabelBreakpoint set and screen is larger than the breakpoint", () => {
  mockMatchMedia(true);
  render(
    <InlineInputs
      data-role="inline-inputs"
      label="Inputs Label"
      adaptiveLabelBreakpoint={1000}
    >
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByTestId("inline-inputs")).toHaveStyle({
    display: "flex",
  });
});

// coverage
test("renders with expected styles when labelWidth is provided", () => {
  render(
    <InlineInputs
      data-role="inline-inputs"
      label="Inputs Label"
      labelWidth={50}
    >
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByTestId("label-container")).toHaveStyle({
    flex: "0 0 50%",
  });
});

// coverage
test("renders with expected styles when inputWidth is provided", () => {
  render(
    <InlineInputs inputWidth={50}>
      <Textbox onChange={() => {}} />
    </InlineInputs>,
  );

  expect(screen.getByTestId("inline-inputs-container")).toHaveStyle({
    flex: "0 0 50%",
  });
});

testStyledSystemMargin(
  (props) => (
    <InlineInputs data-role="inline-inputs" label="label" {...props} />
  ),
  () => screen.getByTestId("inline-inputs"),
);
