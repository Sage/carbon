import * as React from 'react';
export interface ButtonProps {
  as?: 'primary' | 'secondary';
  disabled?: boolean;
  theme?: 'blue' | 'grey' | 'magenta' | 'magenta-dull' | 'red' | 'white';
  size?: 'small' | 'medium' | 'large';
  subtext?: string;
}
declare const Button: React.Component<ButtonProps, {}>;
export default Button;
