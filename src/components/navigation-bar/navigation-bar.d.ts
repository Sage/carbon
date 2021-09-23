import * as React from "react";
import { SpaceProps } from "styled-system";

export interface NavigationBarProps extends SpaceProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  navigationType?: "light" | "dark";
  isLoading?: boolean;
  stickyPosition?: "top" | "bottom";
  stickyOffset?: string;
}

declare function NavigationBar(props: NavigationBarProps): JSX.Element;

export default NavigationBar;
