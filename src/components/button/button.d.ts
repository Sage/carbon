import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/options-helper';

export interface ButtonProps {
  as?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'destructive' | 'darkBackground';
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'dashed' | 'destructive' | 'darkBackground';
  disabled?: boolean;
  destructive?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  iconPosition?: 'before' | 'after';
  iconType?: IconTypes;
  subtext?: string;
  children?: React.ReactNode;
  renderRouterLink?: (args: object) => React.ReactNode;
  forwardRef?: () => void;
  onClick?: () => void;
}
declare const Button: React.ComponentType<ButtonProps | React.HTMLProps<HTMLButtonElement>>;
export default Button;
