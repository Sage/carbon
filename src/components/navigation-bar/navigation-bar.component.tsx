import React from "react";
import { PaddingProps, FlexboxProps } from "styled-system";
import { Expand, ExplicitUnion } from "../../__internal__/utils/helpers/types";
import StyledNavigationBar from "./navigation-bar.style";

export type Position = "sticky" | "fixed";
export type Orientation = "top" | "bottom";
export type NavigationType = "light" | "dark" | "white" | "black";

export interface NavigationBarProps
  extends Expand<PaddingProps>,
    Expand<FlexboxProps> {
  children?: React.ReactNode;
  ariaLabel?: string;
  /** Color scheme of navigation component */
  navigationType?: ExplicitUnion<NavigationType>;
  /** If 'true' the children will not be visible */
  isLoading?: boolean;
  /** Defines whether the navigation bar should be positioned fixed or sticky */
  position?: ExplicitUnion<Position>;
  /** Defines the offset of navigation bar */
  offset?: string;
  /** Defines whether the navigation bar should be positioned top or bottom */
  orientation?: ExplicitUnion<Orientation>;
}

export const NavigationBar = ({
  navigationType = "light",
  isLoading = false,
  children,
  ariaLabel,
  position,
  offset = "0",
  orientation,
  ...props
}: NavigationBarProps): JSX.Element => {
  return (
    <StyledNavigationBar
      role="navigation"
      aria-label={ariaLabel}
      navigationType={navigationType}
      data-component="navigation-bar"
      position={position}
      offset={offset}
      orientation={orientation}
      {...props}
    >
      {!isLoading && children}
    </StyledNavigationBar>
  );
};

export default NavigationBar;
