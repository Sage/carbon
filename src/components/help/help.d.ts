import * as React from "react";
import {
  IconTypes,
  Positions,
} from "../../utils/helpers/options-helper/options-helper";

export interface HelpProps {
  className?: string;
  children?: string;
  helpId?: string;
  tabIndex?: number | string;
  as?: string;
  href?: string;
  isFocused?: boolean;
  type?: IconTypes;
  tooltipPosition?: Positions;
  tooltipBgColor?: string;
  tooltipFontColor?: string;
  tooltipFlipOverrides?: Positions[];
}

declare const Help: React.ComponentType<HelpProps>;
export default Help;
