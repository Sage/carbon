import * as React from 'react';
import { IconTypes, Positions } from "../../utils/helpers/options-helper/options-helper";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface HelpProps extends MarginSpacingProps {
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
