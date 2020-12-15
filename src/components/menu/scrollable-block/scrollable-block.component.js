import React, { useContext } from "react";
import PropTypes from "prop-types";

import { MenuContext } from "../menu.component";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import StyledScrollableBlock from "./scrollable-block.style";

const ScrollableBlock = ({ children, variant = "default", ...rest }) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const { blockIndex, focusIndex, handleKeyDown } = submenuContext;

  return (
    <StyledScrollableBlock
      data-component="submenu-scrollable-block"
      menuType={menuContext.menuType}
      variant={variant}
      overflowY="scroll"
      p={0}
      scrollVariant={menuContext.menuType}
      {...rest}
    >
      {React.Children.map(children, (child, index) => {
        let isFocused = false;
        const blockItemFocused = focusIndex >= blockIndex;

        if (blockItemFocused) {
          isFocused = focusIndex - blockIndex === index;
        }

        return (
          <SubmenuContext.Provider
            value={{
              isFocused,
              handleKeyDown,
            }}
          >
            {child}
          </SubmenuContext.Provider>
        );
      })}
    </StyledScrollableBlock>
  );
};

ScrollableBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
};

export default ScrollableBlock;
