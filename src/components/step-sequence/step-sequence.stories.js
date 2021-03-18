import React from "react";
import { text, select } from "@storybook/addon-knobs";
import StepSequence from "./step-sequence.component";
import StepSequenceItem from "./step-sequence-item/step-sequence-item.component";
import OptionsHelper from "../../utils/helpers/options-helper";

export default {
  title: "Step Sequence/Test",
  component: StepSequence,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const stepSequence = () => {
  const orientation = select(
    "orientation",
    OptionsHelper.orientation,
    StepSequence.defaultProps.orientation
  );

  return (
    <StepSequence orientation={orientation}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
      >
        Name
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
      >
        Delivery Address
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
      >
        Delivery Details
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
      >
        Payment
      </StepSequenceItem>
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
      >
        Confirm
      </StepSequenceItem>
    </StepSequence>
  );
};

export const stepSequenceItem = () => {
  const indicator = text("indicator", "1");
  const status = select(
    "status",
    OptionsHelper.steps,
    StepSequenceItem.defaultProps.status
  );
  const hiddenCompleteLabel = text("hiddenCompleteLabel");
  const hiddenCurrentLabel = text("hiddenCurrentLabel");
  const ariaLabel = text("ariaLabel", "Step 1 of 5");
  const children = text("children", "Step Label");

  return (
    <StepSequenceItem
      aria-label={ariaLabel}
      indicator={indicator}
      status={status}
      hiddenCompleteLabel={hiddenCompleteLabel}
      hiddenCurrentLabel={hiddenCurrentLabel}
    >
      {children}
    </StepSequenceItem>
  );
};
