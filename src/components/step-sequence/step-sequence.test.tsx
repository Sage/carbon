import React from "react";
import { render, screen, within } from "@testing-library/react";
import { testStyledSystemSpacing } from "../../__spec_helper__/__internal__/test-utils";
import { StepSequence, StepSequenceItem } from ".";

test("renders with provided children", () => {
  render(
    <StepSequence currentStep={2}>
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
    </StepSequence>,
  );

  const steps = within(screen.getByRole("list")).getAllByRole("listitem");

  expect(steps[0]).toHaveTextContent("Planning");
  expect(steps[1]).toHaveTextContent("Design");
});

test("renders with `orientation` prop set to 'horizontal'", () => {
  render(
    <StepSequence currentStep={1} orientation="horizontal">
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <StepSequenceItem
        stepNumber={2}
        title="Design"
        description={"This is step 2"}
      />
    </StepSequence>,
  );

  expect(screen.getByRole("list")).toHaveStyle({
    flexDirection: "row",
  });
});

test("renders with provided data- attributes", () => {
  render(
    <StepSequence currentStep={1} data-element="bar" data-role="baz">
      <StepSequenceItem
        stepNumber={1}
        title="Planning"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
    </StepSequence>,
  );

  expect(screen.getByRole("list")).toHaveAttribute("data-element", "bar");
  expect(screen.getByRole("list")).toHaveAttribute("data-role", "baz");
});

testStyledSystemSpacing(
  (props) => (
    <StepSequence currentStep={1} {...props}>
      <div>test</div>
    </StepSequence>
  ),
  () => screen.getByRole("list"),
);
