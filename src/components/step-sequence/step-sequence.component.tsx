import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledStepSequence from "./step-sequence.style";
import { StepSequenceProvider } from "./__internal__/step-sequence.context";

export interface StepSequenceProps extends SpaceProps, TagProps {
  /** Step sequence items to be rendered */
  children: React.ReactNode;
  /** The direction that step sequence items should be rendered */
  orientation?: "horizontal" | "vertical";
}

export const StepSequence = ({
  children,
  orientation = "horizontal",
  ...props
}: StepSequenceProps) => {
  return (
    <StyledStepSequence
      orientation={orientation}
      p={0}
      {...props}
      {...tagComponent("step-sequence", props)}
    >
      <StepSequenceProvider value={{ orientation }}>
        {children}
      </StepSequenceProvider>
    </StyledStepSequence>
  );
};

export default StepSequence;
