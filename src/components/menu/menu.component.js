import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import { StyledMenuWrapper } from "./menu.style";
import MenuContext from "./menu.context";
import { menuKeyboardNavigation } from "./__internal__/keyboard-navigation";
import { MENU_ITEM_CHILDREN_LOCATOR } from "./__internal__/locators";

const Menu = ({ menuType = "light", children, ...rest }) => {
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const ref = useRef();
  const [focusId, setFocusId] = useState(undefined);
  const [itemIds, setItemIds] = useState([]);

  const registerItem = useCallback((id) => {
    setItemIds((prevState) => {
      return [...prevState, id];
    });
  }, []);

  const unregisterItem = useCallback((id) => {
    setItemIds((prevState) => {
      return prevState.filter((itemId) => itemId !== id);
    });
  }, []);

  const handleKeyDown = (event) => {
    /* istanbul ignore else */
    if (ref.current) {
      const focusableItems = Array.from(
        ref.current.querySelectorAll(MENU_ITEM_CHILDREN_LOCATOR)
      );
      const newIndex = menuKeyboardNavigation(event, focusableItems);
      setFocusId(itemIds[newIndex]);
    }
  };

  return (
    <StyledMenuWrapper
      data-component="menu"
      menuType={menuType}
      {...rest}
      ref={ref}
      role="list"
      onKeyDown={handleKeyDown}
    >
      <MenuContext.Provider
        value={{
          menuType,
          inMenu: true,
          openSubmenuId,
          setOpenSubmenuId,
          focusId,
          registerItem,
          unregisterItem,
        }}
      >
        {children}
      </MenuContext.Provider>
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Styled system flex props */
  ...propTypes.flexbox,
  /** Styled system layout props */
  ...propTypes.layout,
  /** Defines the color scheme of the component */
  menuType: PropTypes.oneOf(["light", "dark", "white", "black"]),
  /** Children elements */
  children: PropTypes.node.isRequired,
};

export { MenuContext };
export default Menu;
