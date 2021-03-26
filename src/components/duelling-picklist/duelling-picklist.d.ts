import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface DuellingPicklistProps extends MarginSpacingProps {
  children?: React.ReactNode;
  /** Indicate if component is disabled */
  disabled?: boolean;
  /** Place for components like Search or Filter placed above the left list */
  leftControls?: React.ReactNode;
  /** Place for components like Search or Filter placed above the right list */
  rightControls?: React.ReactNode;
  /** Left list label */
  leftLabel?: string;
  /** Right list label */
  rightLabel?: string;
}

declare function DuellingPicklist(props: DuellingPicklistProps): JSX.Element;

export default DuellingPicklist;
