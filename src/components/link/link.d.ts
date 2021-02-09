import * as React from "react";
import { IconTypes } from "../../utils/helpers/options-helper/options-helper";

export interface LinkProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: IconTypes;
  iconAlign?: "left" | "right";
  onClick?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  tabbable?: boolean;
  tooltipMessage?: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  children?: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}

declare const Link: React.ComponentType<
  LinkProps & React.HTMLProps<HTMLLinkElement>
>;
export default Link;
