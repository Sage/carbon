import React, { useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  StyledMenuWrapper,
  StyledMenuItemsWrapper,
  StyledMenuItem,
} from "./menu.style";
import Events from "../../utils/helpers/events";
import MenuItem from "./menu-item";

const Menu = ({ menuType = "light", children }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const filteredChildren = childrenArray.filter(
    (child) => child.type === MenuItem
  );
  const menuItemsRefs = useRef(
    filteredChildren.map((child) => child.ref || React.createRef())
  );
  const actualFocusedItemIndex = useRef();
  const [isOpenSubmenu, setIsOpenSubmenu] = useState(null);
  const [isOpenByArrowLeftOrRight, setOpenByArrowLeftOrRight] = useState(false);
  const setFocusToElement = useCallback((event, index) => {
    if (event) {
      event.preventDefault();
    }

    actualFocusedItemIndex.current = index;
    const isFocusedOnLastMenuItem = index === menuItemsRefs.current.length;
    const isFocusedOnFirstMenuItem = index === -1;
    if (isFocusedOnLastMenuItem) {
      actualFocusedItemIndex.current = 0;
    } else if (isFocusedOnFirstMenuItem) {
      actualFocusedItemIndex.current = menuItemsRefs.current.length - 1;
    }

    menuItemsRefs.current[actualFocusedItemIndex.current].current.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event, index) => {
      if (Events.isRightKey(event)) {
        event.preventDefault();
        setFocusToElement(event, index + 1);
      }

      if (Events.isLeftKey(event)) {
        event.preventDefault();
        setFocusToElement(event, index - 1);
      }

      if (Events.isHomeKey(event)) {
        event.preventDefault();
        setFocusToElement(event, 0);
      } else if (Events.isEndKey(event)) {
        event.preventDefault();
        setFocusToElement(event, menuItemsRefs.current.length - 1);
      } else if (Events.isAlphabetKey(event)) {
        // A-Za-z: focus the next item on the list that starts with the pressed key
        // selection should wrap to the start of the list
        event.stopPropagation();
        let firstMatch;
        let nextMatch;
        const getMenuText = (element) => {
          if (element.submenu) {
            return element.submenu;
          }

          return element.children;
        };
        filteredChildren.forEach(({ props }, i) => {
          if (
            props.children &&
            getMenuText(props)
              .toString()
              .toLowerCase()
              .startsWith(event.key.toLowerCase())
          ) {
            if (firstMatch === undefined) {
              firstMatch = i;
            }
            if (i > actualFocusedItemIndex.current && nextMatch === undefined) {
              nextMatch = i;
            }
          }
        });

        if (nextMatch !== undefined) {
          setFocusToElement(undefined, nextMatch);
        } else if (firstMatch !== undefined) {
          setFocusToElement(undefined, firstMatch);
        }
      }
    },
    [filteredChildren, setFocusToElement]
  );

  let index = 0;

  return (
    <StyledMenuWrapper data-component="menu" menuType={menuType}>
      <StyledMenuItemsWrapper role="menubar">
        {React.Children.map(children, (child) => {
          const isFirstElement = index === 0;
          const i = index;

          if (child.type === MenuItem) {
            index += 1;
          }

          return (
            <StyledMenuItem role="presentation" menuType={menuType}>
              {React.cloneElement(child, {
                menuType,
                ...(child.type === MenuItem && {
                  ref: menuItemsRefs.current[i],
                  isFirstElement,
                  menuItemIndex: i,
                  isOpen: isOpenSubmenu === i,
                  setIsOpenSubmenu,
                  setFocusToElement,
                  isOpenByArrowLeftOrRight,
                  setOpenByArrowLeftOrRight,
                  handleKeyDown: (ev) => handleKeyDown(ev, i),
                }),
              })}
            </StyledMenuItem>
          );
        })}
      </StyledMenuItemsWrapper>
    </StyledMenuWrapper>
  );
};

Menu.propTypes = {
  /** Defines the color scheme of the component */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** Children elements */
  children: PropTypes.node,
};

export default Menu;
