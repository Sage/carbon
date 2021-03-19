import * as React from "react";
import { Positions } from "../../utils/helpers/options-helper";
export interface IconProps {
  /** Icon type */
  type: string;
  /** Background size */
  bgSize?: "small" | "medium" | "large" | "extra-large";
  /** Background shape */
  bgShape?: "circle" | "rounded-rect" | "square";
  /** Background color theme */
  bgTheme?: "info" | "error" | "success" | "warning" | "business" | "none";
  /** Icon font size */
  fontSize?: "small" | "medium" | "large" | "extra-large";
  /** Icon color */
  iconColor?:
    | "default"
    | "on-light-background"
    | "on-dark-background"
    | "business-color";
  /** Override iconColor, provide any color from palette or any valid css color value. */
  color?: string;
  /** Override bgTheme, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
  /** Margin right, given number will be multiplied by base spacing unit (8) */
  mr?: number;
  /** Margin left, given number will be multiplied by base spacing unit (8) */
  ml?: number;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** The message string to be displayed in the tooltip */
  tooltipMessage?: string;
  /** The position to display the tooltip */
  tooltipPosition?: Positions;
  /** Control whether the tooltip is visible */
  tooltipVisible?: boolean;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip */
  tooltipFlipOverrides?: Positions[];
}

declare const Icon: React.ComponentType<IconProps>;
export default Icon;
