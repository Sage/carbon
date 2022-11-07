import React from "react";
import { MarginProps } from "styled-system";

import { Expand } from "../../__internal__/utils/helpers/types";
import StepSequenceStyle from "./step-sequence.style";

export const StepSequenceContext = React.createContext<{
  orientation: "horizontal" | "vertical";
}>({ orientation: "horizontal" });

export interface StepSequenceProps extends Expand<MarginProps> {
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
    <StepSequenceStyle
      data-component="step-sequence"
      orientation={orientation}
      {...props}
    >
      <StepSequenceContext.Provider value={{ orientation }}>
        {children}
      </StepSequenceContext.Provider>
    </StepSequenceStyle>
  );
};

export default StepSequence;
