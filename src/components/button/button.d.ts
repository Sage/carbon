import * as React from 'react';
export interface ButtonProps {
  as?: 'primary' | 'secondary';
  disabled?: boolean;
  theme?: string;
  size?: string;
  subtext?: any;
}
declare const Button: React.Component<ButtonProps, {}>;
export default Button;
