import * as React from "react";
import { SpacingProps } from "../../utils/helpers/options-helper";
import { IconTypes, ButtonTypes } from "../../utils/helpers/options-helper/options-helper";

export interface ButtonProps extends SpacingProps {
  as?: ButtonTypes;
  buttonType?: ButtonTypes;
  "aria-label"?: string;
  disabled?: boolean;
  destructive?: boolean;
  fullWidth?: boolean;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Margin left, any valid CSS value */
  ml?: string;
  size?: "small" | "medium" | "large";
  iconPosition?: "before" | "after";
  iconType?: IconTypes;
  subtext?: string;
  children?: React.ReactNode;
  /** Used to transform button into anchor */
  href?: string;
  forwardRef?: () => void;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLLinkElement>,
  ) => void;
  noWrap?: boolean;
  iconTooltipMessage?: string;
  iconTooltipPosition?: string;
}

declare const Button: React.ComponentType<
  ButtonProps | React.HTMLProps<HTMLButtonElement>
>;

export default Button;
