import * as React from "react";
import { MarginProps } from "styled-system";
import { BackgroundShape, BackgroundTheme, IconColor, IconSize, IconTypes, TooltipPositions } from "./icon-types";

export interface IconProps extends MarginProps {
  /** Icon type */
  type: IconTypes;
  /** Background size */
  bgSize?: IconSize;
  /** Background shape */
  bgShape?: BackgroundShape;
  /** Background color theme */
  bgTheme?: BackgroundTheme;
  /** Icon font size */
  fontSize?: IconSize;
  /** Icon color */
  iconColor?: IconColor;
  /** Override iconColor, provide any color from palette or any valid css color value. */
  color?: string;
  /** Override bgTheme, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** The message string to be displayed in the tooltip */
  tooltipMessage?: string;
  /** The position to display the tooltip */
  tooltipPosition?: TooltipPositions;
  /** Control whether the tooltip is visible */
  tooltipVisible?: boolean;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip */
  tooltipFlipOverrides?: TooltipPositions[];
}

declare function Icon(props: IconProps & React.RefAttributes<HTMLSpanElement>): JSX.Element;

export default Icon;
