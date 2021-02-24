import * as React from 'react';

export interface IconProps {
  className?: string;
  type: string;
  bgSize?: 'small' | 'medium' | 'large';
  bgShape?: 'circle' | 'rounded-rect' | 'square';
  bgTheme?: 'info' | 'error' | 'success' | 'warning' | 'business' | 'none';
  fontSize?: 'small' | 'large';
  iconColor?: 'default' | 'on-light-background' | 'on-dark-background' | 'business-color';
  color?: string;
  bg?: string;
  disabled?: boolean;
  mr?: number;
  ml?: number;
  ariaLabel?: string;
  tooltipMessage?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  tooltipVisible?: boolean;
  tooltipBgColor?: string;
  tooltipFontColor?: string;
}

declare const Icon: React.ComponentType<IconProps>;
export default Icon;
