import React from "react";
import StepSequence from "./step-sequence.component";
import StepSequenceItem, {
  StepSequenceItemProps,
} from "./step-sequence-item/step-sequence-item.component";

export const StepSequenceComponent = ({ ...props }) => {
  return (
    <StepSequence currentStep={3} {...props}>
      <StepSequenceItem aria-label="Step 1 of 5" stepNumber={1} title="Name" />
      <StepSequenceItem
        aria-label="Step 2 of 5"
        stepNumber={2}
        title="Delivery Address"
      />
      <StepSequenceItem
        aria-label="Step 3 of 5"
        stepNumber={3}
        title="Delivery Details"
      />
      <StepSequenceItem
        aria-label="Step 4 of 5"
        stepNumber={4}
        title="Payment"
      />
      <StepSequenceItem
        aria-label="Step 5 of 5"
        stepNumber={5}
        title="Confirm"
      />
    </StepSequence>
  );
};

export const StepSequenceItemCustom = (props: StepSequenceItemProps) => {
  return (
    <StepSequence currentStep={1}>
      <StepSequenceItem {...props} />
    </StepSequence>
  );
};
