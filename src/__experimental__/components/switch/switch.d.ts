import * as React from "react";
import { MarginProps } from "styled-system";
import { CommonCheckableInputProps } from "../../../__internal__/checkable-input";

export type SwitchSize = "small" | "large";
export type LabelAlign = "left" | "right";

export interface SwitchProps extends CommonCheckableInputProps, MarginProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Set the default value of the Switch if component is meant to be used as uncontrolled */
  defaultChecked?: boolean;
  /** Overrides the default tabindex of the Help component */
  helpTabIndex?: number | string;
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** Text alignment of the label */
  labelAlign?: LabelAlign;
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** When true label is inline */
  labelInline?: boolean;
  /** Triggers loading animation */
  loading?: boolean;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Size of the switch */
  size?: SwitchSize;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the switch, passed on form submit */
  value?: string;
}

declare function Switch(props: SwitchProps): JSX.Element;

export { Switch as BaseSwitch };
export default Switch;
