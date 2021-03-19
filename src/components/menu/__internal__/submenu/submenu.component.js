/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import OptionHelper from "../../../../utils/helpers/options-helper";
import { StyledSubmenu, StyledSubmenuWrapper } from "./submenu.style";
import Link from "../../../link";
import Events from "../../../../utils/helpers/events";
import { MenuContext } from "../../menu.component";
import MenuItem from "../../menu-item";
import { characterNavigation } from "../keyboard-navigation";
import ScrollableBlock from "../../scrollable-block";
import SubmenuContext from "./submenu.context";

const Submenu = React.forwardRef(
  (
    {
      children,
      className,
      title,
      icon,
      submenuDirection = "right",
      onKeyDown,
      variant = "default",
      showDropdownArrow = true,
      ...rest
    },
    ref
  ) => {
    const menuContext = useContext(MenuContext);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusIndex, setSubmenuFocusIndex] = useState(undefined);
    const [characterString, setCharacterString] = useState("");
    const submenuRef = useRef();

    const formattedChildren = React.Children.map(children, (child) => {
      if (child.type === ScrollableBlock) {
        return [...child.props.children];
      }

      return child;
    });

    const numberOfChildren = useMemo(
      () => React.Children.count(formattedChildren),
      [formattedChildren]
    );

    const characterTimer = useRef();

    const startCharacterTimeout = useCallback(() => {
      characterTimer.current = setTimeout(() => {
        setCharacterString("");
      }, 1500);
    }, []);

    const restartCharacterTimeout = useCallback(() => {
      clearTimeout(characterTimer.current);
      startCharacterTimeout();
    }, [startCharacterTimeout]);

    const closeSubmenu = useCallback(() => {
      setSubmenuOpen(false);
      setSubmenuFocusIndex(undefined);
      setCharacterString("");
    }, []);

    const handleKeyDown = useCallback(
      (event, index = submenuFocusIndex) => {
        if (!submenuOpen) {
          if (
            Events.isEnterKey(event) ||
            Events.isSpaceKey(event) ||
            Events.isDownKey(event) ||
            Events.isUpKey(event)
          ) {
            event.preventDefault();
            setSubmenuOpen(true);
            setSubmenuFocusIndex(0);
          }

          if (!event.defaultPrevented) {
            menuContext.handleKeyDown(event);
          }
        }

        if (submenuOpen) {
          let nextIndex = index;

          if (Events.isTabKey(event) && !Events.isShiftKey(event)) {
            if (index === numberOfChildren - 1) {
              closeSubmenu();
              return;
            }
            nextIndex = index + 1;
          }

          if (Events.isTabKey(event) && Events.isShiftKey(event)) {
            if (index === 0) {
              closeSubmenu();
              return;
            }
            nextIndex = index - 1;
          }

          if (Events.isDownKey(event)) {
            event.preventDefault();
            if (index < numberOfChildren - 1) {
              nextIndex = index + 1;
            }
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            if (index > 0) {
              nextIndex = index - 1;
            }
          }

          if (Events.isEscKey(event)) {
            onKeyDown(event);
            closeSubmenu();
            return;
          }

          if (Events.isHomeKey(event)) {
            event.preventDefault();
            nextIndex = 0;
          }

          if (Events.isEndKey(event)) {
            event.preventDefault();
            nextIndex = numberOfChildren - 1;
          }

          if (Events.isAlphabetKey(event) || Events.isNumberKey(event)) {
            event.stopPropagation();

            if (characterTimer.current) {
              restartCharacterTimeout();
            } else {
              startCharacterTimeout();
            }

            setCharacterString(`${characterString}${event.key.toLowerCase()}`);
          } else {
            setCharacterString("");
          }

          // Defensive check in case an unhandled key event from a child component
          // has bubbled up
          if (nextIndex === undefined) return;

          // Check that next index contains a MenuItem
          // If not, call handleKeyDown again
          const nextChild = React.Children.toArray(formattedChildren)[
            nextIndex
          ];
          if (nextChild && nextChild.type === MenuItem) {
            setSubmenuFocusIndex(nextIndex);
          } else {
            handleKeyDown(event, nextIndex);
          }
        }
      },
      [
        characterString,
        characterTimer,
        startCharacterTimeout,
        restartCharacterTimeout,
        formattedChildren,
        closeSubmenu,
        menuContext,
        numberOfChildren,
        onKeyDown,
        submenuFocusIndex,
        setSubmenuFocusIndex,
        submenuOpen,
      ]
    );

    const onClickOutside = useCallback(
      (event) => {
        if (!Events.composedPath(event).includes(submenuRef.current)) {
          document.removeEventListener("click", onClickOutside);
          closeSubmenu();
        }
      },
      [closeSubmenu]
    );

    useEffect(() => {
      if (characterString !== "") {
        const nextIndex = characterNavigation(
          characterString,
          React.Children.toArray(formattedChildren),
          submenuFocusIndex
        );

        setSubmenuFocusIndex(nextIndex);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterString]);

    useEffect(() => {
      if (submenuOpen) {
        document.addEventListener("click", onClickOutside);
      }

      return function cleanup() {
        document.removeEventListener("click", onClickOutside);
      };
    }, [onClickOutside, submenuOpen]);

    return (
      <StyledSubmenuWrapper
        data-component="submenu-wrapper"
        role="menuitem"
        onClick={() => setSubmenuOpen(true)}
        ref={submenuRef}
        isSubmenuOpen={submenuOpen}
      >
        <StyledMenuItemWrapper
          {...rest}
          data-component="menu-item"
          className={className}
          menuType={menuContext.menuType}
          ref={ref}
          icon={icon}
          tabIndex={-1}
          variant={variant}
          isOpen={submenuOpen}
          as={Link}
          hasSubmenu
          showDropdownArrow={showDropdownArrow}
          onKeyDown={handleKeyDown}
        >
          {title}
        </StyledMenuItemWrapper>

        {submenuOpen && (
          <StyledSubmenu
            submenuDirection={submenuDirection}
            variant={variant}
            menuType={menuContext.menuType}
          >
            {React.Children.map(children, (child, index) => (
              <SubmenuContext.Provider
                value={{
                  isFocused: submenuFocusIndex === index,
                  focusIndex: submenuFocusIndex,
                  handleKeyDown,
                  blockIndex: React.Children.toArray(children).findIndex(
                    (item) => item.type === ScrollableBlock
                  ),
                }}
              >
                {child}
              </SubmenuContext.Provider>
            ))}
          </StyledSubmenu>
        )}
      </StyledSubmenuWrapper>
    );
  }
);

Submenu.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** Custom className */
  className: PropTypes.string,
  /** Adds an icon to the menu item. */
  icon: PropTypes.oneOf(OptionHelper.icons),
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** A title for the menu item that has a submenu. */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** onKeyDown handler */
  onKeyDown: PropTypes.func,
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow: PropTypes.bool,
};

export default Submenu;
