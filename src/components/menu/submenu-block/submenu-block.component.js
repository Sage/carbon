import React from "react";
import PropTypes from "prop-types";
import { StyledSubmenuBlock } from "./submenu.style";

const SubmenuBlock = ({ children, menuType }) => {
  return (
    <StyledSubmenuBlock data-component="submenu-block">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { ...child.props, menuType })
      )}
    </StyledSubmenuBlock>
  );
};

SubmenuBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
   */
  menuType: PropTypes.oneOf(["light", "dark"]),
};

export default SubmenuBlock;
