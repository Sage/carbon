import React from "react";
import { SpaceProps } from "styled-system";
import Logger from "../../__internal__/utils/logger";

import StyledStepSequence from "./step-sequence.style";

export const StepSequenceContext = React.createContext<{
  orientation: "horizontal" | "vertical";
}>({ orientation: "horizontal" });

export interface StepSequenceProps extends SpaceProps {
  /** Step sequence items to be rendered */
  children: React.ReactNode;
  /** The direction that step sequence items should be rendered */
  orientation?: "horizontal" | "vertical";
}

let deprecateWarnTriggered = false;

export const StepSequence = ({
  children,
  orientation = "horizontal",
  ...props
}: StepSequenceProps) => {
  if (!deprecateWarnTriggered) {
    deprecateWarnTriggered = true;
    Logger.deprecate(
      "The `StepSequence` component is deprecated and will soon be removed," +
        " please use the `StepFlow` component instead."
    );
  }
  return (
    <StyledStepSequence
      data-component="step-sequence"
      orientation={orientation}
      p={0}
      {...props}
    >
      <StepSequenceContext.Provider value={{ orientation }}>
        {children}
      </StepSequenceContext.Provider>
    </StyledStepSequence>
  );
};

export default StepSequence;
