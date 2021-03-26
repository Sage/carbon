import * as React from "react";
import {
  IconTypes,
  Positions,
} from "../../utils/helpers/options-helper/options-helper";

export interface HelpProps {
  /** Overrides the default 'as' attribute of the Help component */
  as?: string;
  /** Message to display in tooltip */
  children?: string;
  /** The unique id of the component (used with aria-describedby for accessibility) */
  helpId?: string;
  /** A path for the anchor */
  href?: string;
  /** A boolean received from IconWrapper */
  isFocused?: boolean;
  /** Overrides the default tabindex of the component */
  tabIndex?: number | string;
  /** Help Icon type */
  type?: IconTypes;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip,
   *  must be an array containing some or all of ["top", "bottom", "left", "right"]
   * (see https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)
   */
  tooltipFlipOverrides?: Positions[];
  /** Position of tooltip relative to target */
  tooltipPosition?: Positions;
  /** [Legacy] A custom class name for the component. */
  className?: string;
}

declare function Help(props: HelpProps): JSX.Element;

export default Help;
