import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledTitle from "./menu-segment-title.style";
import { MenuContext } from "../menu.component";
import { StyledMenuItem } from "../menu.style";

const MenuSegmentTitle = React.forwardRef(
  ({ children, variant = "default" }, ref) => {
    const menuContext = useContext(MenuContext);

    return (
      <StyledMenuItem inSubmenu>
        <StyledTitle
          data-component="menu-segment-title"
          menuType={menuContext.menuType}
          ref={ref}
          variant={variant}
        >
          {children}
        </StyledTitle>
      </StyledMenuItem>
    );
  }
);

MenuSegmentTitle.propTypes = {
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** the text to be displayed */
  children: PropTypes.string.isRequired,
};

export default MenuSegmentTitle;
