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

test("renders with provided title and step number", () => {
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

test(`renders with the correct styling for the "small" size`, () => {
  render(
    <StepSequence currentStep={1} size={"small"}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Early designs and scoping."}
      />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveStyle({
    "grid-template-columns": "var(--sizing300) 1fr",
    "min-width": "var(--sizing700)",
  });

  const title = screen.getByText("Planning");
  const description = screen.getByText("Early designs and scoping.");

  expect(title).toHaveStyle({
    "font-size": "var(--fontSizes200)",
    "font-weight": "var(--fontWeights500)",
    "font-style": "",
    color: "var(--progress-label-default)",
  });

  expect(description).toHaveStyle({
    "font-size": "var(--fontSizes100)",
    "font-weight": "var(--fontWeights400)",
    "font-style": "",
    color: "var(--progress-label-alt)",
  });
});

test(`renders with the correct styling for the "medium" size`, () => {
  render(
    <StepSequence currentStep={1} size={"medium"}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Early designs and scoping."}
      />
    </StepSequence>,
  );

  const step = screen.getByRole("listitem");

  expect(step).toHaveStyle({
    "grid-template-columns": "var(--sizing400) 1fr",
    "min-width": "var(--sizing800)",
  });

  const title = screen.getByText("Planning");
  const description = screen.getByText("Early designs and scoping.");

  expect(title).toHaveStyle({
    "font-size": "var(--fontSizes300)",
    "font-weight": "var(--fontWeights500)",
    color: "var(--progress-label-default)",
  });

  expect(description).toHaveStyle({
    "font-size": "var(--fontSizes200)",
    "font-weight": "var(--fontWeights400)",
    color: "var(--progress-label-alt)",
  });
});

test("renders with aria-current correctly", () => {
  render(
    <StepSequence currentStep={2}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Start."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Planning"
        description={"Middle."}
      />
      <StepSequenceItem stepNumber={3} title="Planning" description={"End."} />
    </StepSequence>,
  );

  const steps = screen.getAllByRole("listitem");
  expect(steps).toHaveLength(3);
  expect(steps[0]).not.toHaveAttribute("aria-current");
  expect(steps[1]).toHaveAttribute("aria-current", "step");
  expect(steps[2]).not.toHaveAttribute("aria-current");
});
