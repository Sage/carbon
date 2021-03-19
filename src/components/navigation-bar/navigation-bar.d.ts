import * as React from "react";
import NavigationBar from "./navigation-bar.component";
import { SpacingProps } from "../../utils/helpers/options-helper";

export interface NavigationBarProp extends SpacingProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  navigationType?: "light" | "dark";
  isLoading?: boolean;
}

declare const NavigationBar: React.FunctionComponent<NavigationBarProp>;

export default NavigationBar;
