import React from "react";
import { render, screen } from "@testing-library/react";

import StepSequenceItem from ".";

import StepSequence from "../step-sequence.component";
import Logger from "../../../__internal__/utils/logger";

test("logs error when not used within StepSequence", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(
    <StepSequenceItem
      stepNumber={1}
      title="Planning"
      description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
    />,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon StepSequence: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );
  loggerSpy.mockRestore();
});

test("renders with provided children and indicator", () => {
  render(
    <StepSequence currentStep={1}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toBeVisible();
  expect(step).toHaveTextContent("Planning");
});

test("renders with provided data- attributes", () => {
  render(
    <StepSequence currentStep={1}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        data-element="bar"
        data-role="baz"
      />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveAttribute("data-element", "bar");
  expect(step).toHaveAttribute("data-role", "baz");
});
