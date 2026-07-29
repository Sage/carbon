import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledStepSequence from "./step-sequence.style";
import { StepSequenceProvider } from "./__internal__/step-sequence.context";

export interface StepSequenceProps extends SpaceProps, TagProps {
  /** Step sequence items to be rendered. */
  children: React.ReactNode;
  /** Orientation of the component. */
  orientation?: "horizontal" | "vertical";
  /** The size of the component. */
  size?: "small" | "medium";
}

export const StepSequence = ({
  children,
  orientation = "horizontal",
  size = "medium",
  ...props
}: StepSequenceProps) => {
  return (
    <StyledStepSequence
      $orientation={orientation}
      {...props}
      {...tagComponent("step-sequence", props)}
    >
      <StepSequenceProvider value={{ orientation, size }}>
        {children}
      </StepSequenceProvider>
    </StyledStepSequence>
  );
};

export default StepSequence;
