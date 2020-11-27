import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import StyledNavigationBar from "./navigation-bar.style";

const NavigationBar = ({
  navigationType = "light",
  isLoading = false,
  children,
  ariaLabel,
  ...props
}) => {
  return (
    <StyledNavigationBar
      role="navigation"
      aria-label={ariaLabel}
      navigationType={navigationType}
      data-component="navigation-bar"
      {...props}
    >
      {!isLoading && children}
    </StyledNavigationBar>
  );
};

NavigationBar.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  /** color scheme of navigation component */
  navigationType: PropTypes.oneOf(["light", "dark"]),
  /** if 'true' the children will not be visible */
  isLoading: PropTypes.bool,
};

export default NavigationBar;
