import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/options-helper';

export interface ButtonProps {
  as?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'destructive' | 'darkBackground';
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'destructive' | 'darkBackground';
  disabled?: boolean;
  destructive?: boolean;
  fullWidth?: boolean;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Margin left, any valid CSS value */
  ml?: string;
  size?: 'small' | 'medium' | 'large';
  iconPosition?: 'before' | 'after';
  iconType?: IconTypes;
  subtext?: string;
  children?: React.ReactNode;
  renderRouterLink?: (args: object) => React.ReactNode;
  forwardRef?: () => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLLinkElement>) => void;
}
declare const Button: React.ComponentType<ButtonProps | React.HTMLProps<HTMLButtonElement>>;
export default Button;
