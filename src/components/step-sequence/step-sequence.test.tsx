import React from "react";
import { screen, within } from "@testing-library/react";
import {
  render,
  testStyledSystemSpacing,
} from "../../__spec_helper__/__internal__/test-utils";

import { StepSequence, StepSequenceItem } from ".";

test("renders with provided children", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1">Step 1</StepSequenceItem>
      <StepSequenceItem indicator="2">Step 2</StepSequenceItem>
    </StepSequence>,
  );

  const steps = within(screen.getByRole("list")).getAllByRole("listitem");

  expect(steps[0]).toHaveTextContent("Step 1");
  expect(steps[1]).toHaveTextContent("Step 2");
});

test("renders with `orientation` prop set to 'vertical'", () => {
  render(
    <StepSequence orientation="vertical">
      <StepSequenceItem indicator="1">Step 1</StepSequenceItem>
      <StepSequenceItem indicator="2">Step 2</StepSequenceItem>
    </StepSequence>,
  );

  expect(screen.getByRole("list")).toHaveStyle({
    flexDirection: "column",
    height: "100%",
  });
});

test("renders with provided data- attributes", () => {
  render(
    <StepSequence data-element="bar" data-role="baz">
      <StepSequenceItem indicator="1">Step 1</StepSequenceItem>
    </StepSequence>,
  );

  expect(screen.getByRole("list")).toHaveAttribute("data-element", "bar");
  expect(screen.getByRole("list")).toHaveAttribute("data-role", "baz");
});

testStyledSystemSpacing(
  (props) => (
    <StepSequence {...props}>
      <div>test</div>
    </StepSequence>
  ),
  () => screen.getByRole("list"),
);
