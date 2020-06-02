import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/options-helper';

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
  children?: React.ReactNode;
  routerLink?: React.ReactNode;
  target?: string;
}

declare const Link: React.ComponentType<LinkProps & React.HTMLProps<HTMLLinkElement>>;
export default Link;
