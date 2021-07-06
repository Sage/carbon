import * as React from "react";

export interface StepSequenceProps {
  /** The direction that step sequence items should be rendered */
  orientation?: "horizontal" | "vertical";
}

declare function StepSequence(props: React.PropsWithChildren<StepSequenceProps>): JSX.Element;

export default StepSequence;
