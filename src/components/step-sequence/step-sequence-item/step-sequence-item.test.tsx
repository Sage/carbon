import React from "react";
import { render, screen, within } from "@testing-library/react";

import StepSequenceItem from ".";

import StepSequence from "../step-sequence.component";
import Logger from "../../../__internal__/utils/logger";

test("logs error when not used within StepSequence", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<StepSequenceItem indicator="1" title="Step" />);

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon StepSequence: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );
  loggerSpy.mockRestore();
});

test("renders with provided title and indicator", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" title="Step" />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toBeVisible();
  expect(step).toHaveTextContent("1Step");
});

test("renders with provided title when passed as children", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1">Step</StepSequenceItem>
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toBeVisible();
  expect(step).toHaveTextContent("1Step");
});

test("renders with provided description", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" title="Step" description="Description" />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toBeVisible();
  expect(step).toHaveTextContent("Description");
});

test("renders with provided accessible label", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" title="Step" aria-label="Aria Label" />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveAccessibleName("Aria Label");
});

test("renders with provided accessible label when `ariaLabel` is passed", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" title="Step" ariaLabel="Aria Label" />
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
        title="Step"
      />
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
        title="Step"
      />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveTextContent("Current");
});

test("renders with a tick Icon when status is 'complete'", () => {
  render(
    <StepSequence>
      <StepSequenceItem indicator="1" status="complete" title="Step" />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(within(step).getByTestId("icon")).toHaveAttribute(
    "type",
    "tick_circle",
  );
});

// coverage - captured in chromatic
test("renders with medium icon when `size` is small", () => {
  render(
    <StepSequence size="small">
      <StepSequenceItem indicator="1" status="complete" title="Step" />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");
  expect(within(step).getByTestId("icon")).toBeVisible();
});

test("renders with provided data- attributes", () => {
  render(
    <StepSequence>
      <StepSequenceItem
        indicator="1"
        title="Step"
        data-element="bar"
        data-role="baz"
      />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveAttribute("data-element", "bar");
  expect(step).toHaveAttribute("data-role", "baz");
});
