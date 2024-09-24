import React, { useRef } from "react";
import { PaddingProps, FlexboxProps } from "styled-system";
import StyledNavigationBar from "./navigation-bar.style";
import { FixedNavigationBarContextProvider } from "./__internal__/fixed-navigation-bar.context";

export type Position = "sticky" | "fixed";
export type Orientation = "top" | "bottom";
export type NavigationType = "light" | "dark" | "white" | "black";

export interface NavigationBarProps extends PaddingProps, FlexboxProps {
  /** Content of the component */
  children?: React.ReactNode;
  /** HTML aria-label attribute */
  ariaLabel?: string;
  /** Color scheme of navigation component */
  navigationType?: NavigationType;
  /** If 'true' the children will not be visible */
  isLoading?: boolean;
  /** Defines whether the navigation bar should be positioned fixed or sticky */
  position?: Position;
  /** Defines the offset of navigation bar */
  offset?: string;
  /** Defines whether the navigation bar should be positioned top or bottom */
  orientation?: Orientation;
  /** @private @ignore set to true only when rendering the GlobalHeader component */
  isGlobal?: boolean;
}

export const NavigationBar = ({
  navigationType = "light",
  isLoading = false,
  children,
  ariaLabel,
  position,
  offset = "0px",
  orientation,
  isGlobal,
  ...props
}: NavigationBarProps): JSX.Element => {
  const navbarRef = useRef(null);

  return (
    <StyledNavigationBar
      role="navigation"
      data-component={isGlobal ? "global-header" : "navigation-bar"}
      aria-label={isGlobal ? "Global Header" : ariaLabel}
      navigationType={isGlobal ? "black" : navigationType}
      orientation={isGlobal ? "top" : orientation}
      offset={isGlobal ? "0px" : offset}
      position={isGlobal ? "fixed" : position}
      {...props}
      isGlobal={isGlobal}
      ref={navbarRef}
    >
      <FixedNavigationBarContextProvider
        orientation={isGlobal ? "top" : orientation}
        offset={isGlobal ? "0px" : offset}
        position={isGlobal ? "fixed" : position}
        navbarRef={navbarRef}
      >
        {!isLoading && children}
      </FixedNavigationBarContextProvider>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
