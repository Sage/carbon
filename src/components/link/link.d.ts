import * as React from 'react';
export interface LinkProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: string;
  iconAlign?: string;
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  tabbable?: boolean;
  to?: string;
  tooltipMessage?: string;
  tooltipPosition?: string;
  tooltipAlign?: string;
}
declare const Link: React.Component<LinkProps, {}>;
export default Link;
