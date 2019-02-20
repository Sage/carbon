import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/option-helper';
export interface LinkProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: IconTypes;
  iconAlign?: 'left' | 'right';
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  tabbable?: boolean;
  to?: string;
  tooltipMessage?: string;
  tooltipPosition?: 'bottom' | 'left' | 'right' | 'top';
  tooltipAlign?: 'bottom' | 'center' | 'left' | 'right' | 'top';
}

declare const Link: React.Component<LinkProps, {}>;
export default Link;
