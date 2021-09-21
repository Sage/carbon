import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledSubmenuBlock from "./submenu-block.style";
import MenuContext from "../menu.context";
import Logger from "../../../__internal__/utils/logger";

let deprecatedWarnTriggered = false;

const SubmenuBlock = ({ children, variant = "default" }) => {
  const menuContext = useContext(MenuContext);

  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`The `SubmenuBlock` component is deprecated and will soon be removed. Please use a `MenuItem` component with the `submenu` prop instead."
    );
  }

  return (
    <StyledSubmenuBlock
      data-component="submenu-block"
      menuType={menuContext.menuType}
      variant={variant}
    >
      {children}
    </StyledSubmenuBlock>
  );
};

SubmenuBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
};

export default SubmenuBlock;
