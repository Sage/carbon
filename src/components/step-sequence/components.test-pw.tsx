import React from "react";
import StepSequence from "./step-sequence.component";
import StepSequenceItem, {
  StepSequenceItemProps,
} from "./step-sequence-item/step-sequence-item.component";

export const StepSequenceComponent = ({ ...props }) => {
  return (
    <StepSequence {...props}>
      <StepSequenceItem
        aria-label="Step 1 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="1"
        status="complete"
        title="Name"
      />
      <StepSequenceItem
        aria-label="Step 2 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="2"
        status="complete"
        title="Delivery Address"
      />
      <StepSequenceItem
        aria-label="Step 3 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="3"
        status="current"
        title="Delivery Details"
      />
      <StepSequenceItem
        aria-label="Step 4 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="4"
        status="incomplete"
        title="Payment"
      />
      <StepSequenceItem
        aria-label="Step 5 of 5"
        hiddenCompleteLabel="Complete"
        hiddenCurrentLabel="Current"
        indicator="5"
        status="incomplete"
        title="Confirm"
      />
    </StepSequence>
  );
};

export const StepSequenceItemComponent = (
  props: Partial<StepSequenceItemProps>,
) => {
  return (
    <StepSequence>
      <StepSequenceItem indicator="1" title="Step" {...props} />
    </StepSequence>
  );
};
