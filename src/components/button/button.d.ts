import * as React from 'react';
export interface ButtonProps {
  as?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'darkBackground';
  disabled?: boolean;
  classicTheme?: 'blue' | 'grey' | 'magenta' | 'magenta-dull' | 'red' | 'white';
  size?: 'small' | 'medium' | 'large';
  subtext?: string;
  children?: React.ReactNode;
}
declare const Button: React.ComponentType<ButtonProps & React.HTMLProps<HTMLButtonElement>>;
export default Button;
