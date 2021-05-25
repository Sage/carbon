import * as React from "react";

export interface StepSequenceItemProps {
  /** Aria label */
  ariaLabel?: string;
  /** Hidden label to be displayed if item is complete */
  hiddenCompleteLabel?: string;
  /** Hidden label to be displayed if item is current */
  hiddenCurrentLabel?: string;
  /** Value to be displayed before text for uncomplete steps */
  indicator: string;
  /** Status for the step */
  status?: "complete" | "current" | "incomplete";
}

declare function StepSequenceItem(props: React.PropsWithChildren<StepSequenceItemProps>): JSX.Element;

export default StepSequenceItem;
