import * as React from 'react';
export interface ButtonProps {
  as?: 'primary' | 'secondary';
  disabled?: boolean;
  theme?: 'blue' | 'grey' | 'magenta' | 'magenta-dull' | 'red' | 'white';
  size?: 'small' | 'medium' | 'large';
  subtext?: string;
  children?: React.ReactNode;
}
declare const Button: React.ComponentType<ButtonProps>;
export default Button;
