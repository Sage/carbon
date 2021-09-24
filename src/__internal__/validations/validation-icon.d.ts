import * as React from "react";

import { ValidationPropTypes } from ".";

export interface ValidationIconProps extends ValidationPropTypes {
  /** A small string to indicate the size of the icon */
  size?: "extra-small" | "small" | "medium" | "large";
  /** The unique id of the component (used with aria-describedby for accessibility) */
  iconId?: string;
  /** Define position of the tooltip */
  tooltipPosition?: string;
  /**
   * Overrides the default flip behaviour of the Tooltip,
   * must be an array containing some or all of ["top", "bottom", "left", "right"]
   * (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)
   */
  tooltipFlipOverrides?: ["top" | "bottom" | "left" | "right"];
  /** An onClick handler */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** An onBlur handler */
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** An onFocus handler */
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  /** A boolean to indicate if the icon is part of an input */
  isPartOfInput?: boolean;
  /** Overrides the default tabindex of the component */
  tabIndex?: number;
  /** Margin right, given number will be multiplied by base spacing unit (8) */
  mr?: number;
  /** Margin left, given number will be multiplied by base spacing unit (8) */
  ml?: number;
}

declare function ValidationIcon(props: ValidationIconProps): JSX.Element;

export default ValidationIcon;
