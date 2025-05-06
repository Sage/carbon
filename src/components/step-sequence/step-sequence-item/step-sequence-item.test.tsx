import React from "react";
import { render, screen, within } from "@testing-library/react";

import StepSequenceItem from ".";

import StepSequence from "../step-sequence.component";
import Logger from "../../../__internal__/utils/logger";

test("logs error when not used within StepSequence", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<StepSequenceItem indicator="1">Step</StepSequenceItem>);

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon StepSequence: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});

test("renders with provided children and indicator", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1">Step</StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toBeVisible();
  expect(step).toHaveTextContent("1Step");
});

test("does not render indicator when `hideIndicator` is true", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" hideIndicator>
        Step
      </StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).not.toHaveTextContent("1");
});

test("renders with provided accessible label", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" ariaLabel="Aria Label">
        Step
      </StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveAccessibleName("Aria Label");
});

test("renders with hidden label when status is 'complete'", () => {
  render(
    <StepSequence>
      <StepSequenceItem
        indicator="1"
        status="complete"
        hiddenCompleteLabel="Completed"
      >
        Step
      </StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveTextContent("Completed");
});

test("renders with hidden label when status is 'current'", () => {
  render(
    <StepSequence>
      <StepSequenceItem
        indicator="1"
        status="current"
        hiddenCurrentLabel="Current"
      >
        Step
      </StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveTextContent("Current");
});

test("renders with a tick Icon when status is 'complete'", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" status="complete">
        Step
      </StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(within(step).getByTestId("icon")).toHaveAttribute("type", "tick");
});

test("renders with provided data- attributes", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" data-element="bar" data-role="baz">
        Step
      </StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveAttribute("data-element", "bar");
  expect(step).toHaveAttribute("data-role", "baz");
});
