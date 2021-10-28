import * as React from "react";
import { MarginProps } from "styled-system";
import { CommonCheckableInputProps } from "../../__internal__/checkable-input";

export type LabelAlign = "left" | "right";

export interface SwitchProps extends CommonCheckableInputProps, MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Set the default value of the Switch if component is meant to be used as uncontrolled */
  defaultChecked?: boolean;
  /** Overrides the default tabindex of the Help component */
  helpTabIndex?: number | string;
  /** Text alignment of the label */
  labelAlign?: LabelAlign;
  /** When true label is inline */
  labelInline?: boolean;
  /** Triggers loading animation */
  loading?: boolean;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the switch, passed on form submit */
  value?: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

declare function Switch(props: SwitchProps): JSX.Element;

export { Switch as BaseSwitch };
export default Switch;
