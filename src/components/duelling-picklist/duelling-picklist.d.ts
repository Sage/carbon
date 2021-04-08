import * as React from "react";

export interface DuellingPicklistProps {
  children?: React.ReactNode;
  /** Indicate if component is disabled */
  disabled?: boolean;
  /** Place for components like Search or Filter placed above the left list */
  leftControls?: React.ReactNode;
  /** Left list label */
  leftLabel?: string;
  /** Place for components like Search or Filter placed above the right list */
  rightControls?: React.ReactNode;
  /** Right list label */
  rightLabel?: string;
}

declare function DuellingPicklist(props: DuellingPicklistProps): JSX.Element;

export default DuellingPicklist;
