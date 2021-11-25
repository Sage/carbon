import * as React from "react";
import { MarginProps } from "styled-system";
import { CommonCheckableInputProps } from "../../__internal__/checkable-input";

export interface CheckboxProps extends CommonCheckableInputProps, MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** The value of the checkbox, passed on form submit */
  value?: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

declare function Checkbox(props: CheckboxProps): JSX.Element;

export { Checkbox };
