import * as React from "react";
import NavigationBar from "./navigation-bar.component";
import { SpaceProps } from "styled-system";

export interface NavigationBarProp extends SpaceProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  navigationType?: "light" | "dark";
  isLoading?: boolean;
  stickyPosition?: "top" | "bottom";
  stickyOffset?: string;
}

declare function NavigationBar(props: NavigationBarProp): JSX.Element;

export default NavigationBar;
