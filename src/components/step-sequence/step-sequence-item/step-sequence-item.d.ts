import * as React from "react";
import * as OptionsHelper from "../../../utils/helpers/options-helper";

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
  status?: OptionsHelper.Steps;
}

declare function StepSequenceItem(props: React.PropsWithChildren<StepSequenceItemProps>): JSX.Element;

export default StepSequenceItem;
