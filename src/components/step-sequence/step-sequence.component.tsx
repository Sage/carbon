import React from "react";
import { StepSequenceProvider } from "./__internal__/step-sequence.context";
import StyledStepSequence from "./step-sequence.style";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface StepSequenceProps extends SpaceProps, TagProps {
  /** Step sequence items to be rendered */
  children: React.ReactNode;
  /** The active step within the sequence */
  currentStep: number;
  /** Hidden label to be used when a step is completed */
  hiddenCompleteLabel?: string;
  /** Hidden label to be used when a step is the current step */
  hiddenCurrentLabel?: string;
  /** Hidden label to be used when a step is incomplete */
  hiddenIncompleteLabel?: string;
  /** The orientation to display the sequence in */
  orientation?: "horizontal" | "vertical";
  /** The size of the component. */
  size?: "small" | "medium";
}

export const StepSequence = ({
  children,
  currentStep,
  hiddenCompleteLabel = "complete",
  hiddenCurrentLabel = "current",
  hiddenIncompleteLabel = "incomplete",
  orientation = "vertical",
  size = "medium",
  ...props
}: StepSequenceProps) => {
  return (
    <StepSequenceProvider
      value={{
        currentStep,
        hiddenCompleteLabel,
        hiddenCurrentLabel,
        hiddenIncompleteLabel,
        orientation,
        size,
      }}
    >
      <StyledStepSequence
        orientation={orientation}
        {...props}
        {...tagComponent("step-sequence", props)}
      >
        {children}
      </StyledStepSequence>
    </StepSequenceProvider>
  );
};

export default StepSequence;
