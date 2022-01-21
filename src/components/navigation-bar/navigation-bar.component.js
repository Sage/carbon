import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import { filterStyledSystemPaddingProps } from "../../style/utils";
import StyledNavigationBar from "./navigation-bar.style";

const NavigationBar = ({
  navigationType = "light",
  isLoading = false,
  children,
  ariaLabel,
  stickyOffset = "0",
  stickyPosition,
  ...props
}) => {
  return (
    <StyledNavigationBar
      role="navigation"
      aria-label={ariaLabel}
      navigationType={navigationType}
      data-component="navigation-bar"
      stickyOffset={stickyOffset}
      stickyPosition={stickyPosition}
      {...props}
    >
      {!isLoading && children}
    </StyledNavigationBar>
  );
};

NavigationBar.propTypes = {
  /** Styled system spacing props */
  ...filterStyledSystemPaddingProps(propTypes.space),
  ...propTypes.flexbox,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  /** Color scheme of navigation component */
  navigationType: PropTypes.oneOf(["light", "dark", "white", "black"]),
  /** If 'true' the children will not be visible */
  isLoading: PropTypes.bool,
  /** Defines the position of sticky navigation bar */
  stickyPosition: PropTypes.oneOf(["top", "bottom"]),
  /** Defines the offset of sticky navigation bar */
  stickyOffset: PropTypes.string,
};

export default NavigationBar;
