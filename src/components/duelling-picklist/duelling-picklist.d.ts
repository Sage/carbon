import * as React from "react";
import { MarginProps } from "styled-system";
import { Expand } from "../../__internal__/utils/helpers/types";

export interface DuellingPicklistProps extends Expand<MarginProps> {
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
