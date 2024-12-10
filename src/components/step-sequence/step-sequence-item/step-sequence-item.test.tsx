import React from "react";
import { render, screen, within } from "@testing-library/react";
import StepSequenceItem from ".";

test("renders with provided children and indicator", () => {
  render(<StepSequenceItem indicator="1">Step</StepSequenceItem>);

  const step = screen.getByRole("listitem");

  expect(step).toBeVisible();
  expect(step).toHaveTextContent("1Step");
});

test("does not render indicator when `hideIndicator` is true", () => {
  render(
    <StepSequenceItem indicator="1" hideIndicator>
      Step
    </StepSequenceItem>,
  );

  const step = screen.getByRole("listitem");

  expect(step).not.toHaveTextContent("1");
});

test("renders with provided accessible label", () => {
  render(
    <StepSequenceItem indicator="1" ariaLabel="Aria Label">
      Step
    </StepSequenceItem>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveAccessibleName("Aria Label");
});

test("renders with hidden label when status is 'complete'", () => {
  render(
    <StepSequenceItem
      indicator="1"
      status="complete"
      hiddenCompleteLabel="Completed"
    >
      Step
    </StepSequenceItem>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveTextContent("Completed");
});

test("renders with hidden label when status is 'current'", () => {
  render(
    <StepSequenceItem
      indicator="1"
      status="current"
      hiddenCurrentLabel="Current"
    >
      Step
    </StepSequenceItem>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveTextContent("Current");
});

test("renders with a tick Icon when status is 'complete'", () => {
  render(
    <StepSequenceItem indicator="1" status="complete">
      Step
    </StepSequenceItem>,
  );

  const step = screen.getByRole("listitem");

  expect(within(step).getByTestId("icon")).toHaveAttribute("type", "tick");
});
