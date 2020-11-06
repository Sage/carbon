import React from "react";
import PropTypes from "prop-types";
import StyledTitle from "./menu-segment-title.style";

const MenuDivider = React.forwardRef(
  ({ menuType, children, variant = "default" }, ref) => (
    <StyledTitle
      data-component="menu-segment-title"
      menuType={menuType}
      ref={ref}
      variant={variant}
    >
      {children}
    </StyledTitle>
  )
);

MenuDivider.propTypes = {
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
   */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** the text to be displayed */
  children: PropTypes.string.isRequired,
};

export default MenuDivider;
