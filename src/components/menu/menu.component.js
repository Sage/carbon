import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import { StyledMenuWrapper } from "./menu.style";
import { menuKeyboardNavigation } from "./__internal__/keyboard-navigation";
import Events from "../../utils/helpers/events";

const MenuContext = React.createContext({});

const Menu = ({ menuType = "light", children, ...rest }) => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(undefined);
  const ref = useRef();

  const handleKeyDown = useCallback(
    (event) => {
      const newIndex = menuKeyboardNavigation(
        event,
        React.Children.toArray(children)
      );

      setFocusedItemIndex(newIndex);
    },
    [children]
  );

  const onClickOutside = useCallback((event) => {
    // Reset the state of the menu when clicking elsewhere
    if (!Events.composedPath(event).includes(ref.current)) {
      setFocusedItemIndex(undefined);
      document.removeEventListener("click", onClickOutside);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClickOutside);

    return function cleanup() {
      document.removeEventListener("click", onClickOutside);
    };
  });

  return (
    <StyledMenuWrapper
      data-component="menu"
      menuType={menuType}
      {...rest}
      ref={ref}
    >
      {React.Children.map(children, (child, index) => {
        const isFocused = focusedItemIndex === index;

        return (
          <MenuContext.Provider
            value={{
              menuType,
              handleKeyDown: (ev) => handleKeyDown(ev, index),
              isFocused,
            }}
          >
            {child}
          </MenuContext.Provider>
        );
      })}
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Styled system flex props */
  ...propTypes.flexbox,
  /** Styled system layout props */
  ...propTypes.layout,
  /** Defines the color scheme of the component */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** Children elements */
  children: PropTypes.node.isRequired,
};

export { MenuContext };
export default Menu;
