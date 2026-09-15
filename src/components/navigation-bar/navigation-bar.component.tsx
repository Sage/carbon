import React, { useRef } from "react";
import { PaddingProps, FlexboxProps } from "styled-system";
import StyledNavigationBar from "./navigation-bar.style";
import { FixedNavigationBarContextProvider } from "./__internal__/fixed-navigation-bar.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export type Position = "sticky" | "fixed";
export type Orientation = "top" | "bottom";
export type NavigationType = "light" | "dark" | "white" | "black";

export interface NavigationBarProps
  extends PaddingProps,
    FlexboxProps,
    TagProps {
  /** Content of the component */
  children?: React.ReactNode;
  /** Defines the colour variant of the navigation bar */
  variant?: "white" | "black";
  /** HTML aria-label attribute */
  ariaLabel?: string;
  /**
   * @deprecated `navigationType` has been deprecated, `variant` should be used instead.
   * Color scheme of navigation component.
   */
  navigationType?: NavigationType;
  /** If 'true' the children will not be visible */
  isLoading?: boolean;
  /** Defines whether the navigation bar should be positioned fixed or sticky */
  position?: Position;
  /** Defines the offset of navigation bar */
  offset?: string;
  /** Defines whether the navigation bar should be positioned top or bottom */
  orientation?: Orientation;
  /** @private @ignore HTML data-component attribute */
  "data-component"?: string;
}

export const NavigationBar = ({
  variant,
  navigationType,
  isLoading = false,
  children,
  ariaLabel,
  position,
  offset = "0px",
  orientation,
  "data-component": dataComponent,
  ...props
}: NavigationBarProps): JSX.Element => {
  const navbarRef = useRef(null);

  const isBlackNavigationType =
    navigationType === "dark" || navigationType === "black";
  return (
    <StyledNavigationBar
      role="navigation"
      aria-label={ariaLabel}
      $variant={variant || (isBlackNavigationType ? "black" : "white")}
      $orientation={orientation}
      $offset={offset}
      $position={position}
      {...props}
      ref={navbarRef}
      {...tagComponent(dataComponent || "navigation-bar", props)}
    >
      <FixedNavigationBarContextProvider
        orientation={orientation}
        offset={offset}
        position={position}
        navbarRef={navbarRef}
      >
        {!isLoading && children}
      </FixedNavigationBarContextProvider>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
