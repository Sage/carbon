import React from "react";
import { StepSequenceProvider } from "./__internal__/step-sequence.context";
import StyledStepSequence from "./step-sequence.style";
import { SpaceProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface StepSequenceProps extends SpaceProps, TagProps {
  /** Step sequence items to be rendered */
  children: React.ReactNode;
  /** The active step within the sequence */
  currentStep: number;
  /** The orientation to display the sequence in */
  orientation?: "horizontal" | "vertical";
}

export const StepSequence = ({
  children,
  currentStep,
  orientation = "vertical",
  ...props
}: StepSequenceProps) => {
  return (
    <StepSequenceProvider value={{ currentStep, orientation }}>
      <StyledStepSequence
        orientation={orientation}
        p={0}
        {...props}
        {...tagComponent("step-sequence", props)}
      >
        {children}
      </StyledStepSequence>
    </StepSequenceProvider>
  );
};

export default StepSequence;
