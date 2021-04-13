import * as React from "react";
import * as OptionsHelper from "../../utils/helpers/options-helper";

export interface StepSequenceProps {
  /** The direction that step sequence items should be rendered */
  orientation?: OptionsHelper.Orientation;
}

declare function StepSequence(props: React.PropsWithChildren<StepSequenceProps>): JSX.Element;

export default StepSequence;
