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
  isSkipLink?: boolean;
  rel?: string;
}

declare function Link(props: LinkProps & React.RefAttributes<HTMLLinkElement>): JSX.Element;

export default Link;
