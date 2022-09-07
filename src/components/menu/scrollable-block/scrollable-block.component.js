import React, { useContext } from "react";
import PropTypes from "prop-types";

import MenuContext from "../menu.context";
import MenuItem from "../menu-item";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import StyledScrollableBlock from "./scrollable-block.style";
import Box from "../../box";

const ScrollableBlock = ({
  children,
  height,
  variant = "default",
  parent,
  parentVariant,
  ...rest
}) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const { blockIndex, focusIndex, handleKeyDown } = submenuContext;

  const scrollVariants = {
    light: "light",
    dark: "dark",
    white: "light",
    black: "dark",
  };

  return (
    <StyledScrollableBlock
      data-component="submenu-scrollable-block"
      menuType={menuContext.menuType}
      variant={variant}
      {...rest}
    >
      {parent && (
        <MenuItem overrideColor variant={parentVariant} as="div" href="#">
          {parent}
        </MenuItem>
      )}
      <Box
        overflowY="scroll"
        scrollVariant={scrollVariants[menuContext.menuType]}
        height={height}
        p={0}
        as="ul"
        role="list"
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
      </Box>
    </StyledScrollableBlock>
  );
};

ScrollableBlock.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** Styled system height prop */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** the element, if any, displayed at the top of the block to be its semantic "parent",
   * but not part of the scrollable section
   */
  parent: PropTypes.node,
  /** the colour variant for the parent element, if different from the variant of the block */
  parentVariant: PropTypes.oneOf(["default", "alternate"]),
};

export default ScrollableBlock;
