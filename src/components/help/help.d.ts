import * as React from 'react';
import { IconTypes } from "../../utils/helpers/options-helper/options-helper";

export interface HelpProps {
  className?: string;
  children?: string;
  helpId?: string;
  tabIndex?: number | string;
  as?: string;
  href?: string;
  isFocused?: boolean;
  type?: IconTypes;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  tooltipBgColor?: string;
  tooltipFontColor?: string;
}

declare const Help: React.ComponentType<HelpProps>;
export default Help;
