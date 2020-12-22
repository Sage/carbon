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

const SubmenuContext = React.createContext({});

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
      tabbable,
      showDropdownArrow = true,
      ...rest
    },
    ref
  ) => {
    const menuContext = useContext(MenuContext);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusIndex, setSubmenuFocusIndex] = useState(undefined);
    const submenuRef = useRef();
    const menuContextOpen = menuContext.openSubmenu;
    const numberOfChildren = useMemo(() => React.Children.count(children), [
      children,
    ]);

    const closeSubmenu = useCallback(() => {
      setSubmenuOpen(false);
      setSubmenuFocusIndex(undefined);
    }, []);

    const handleKeyDown = useCallback(
      (event, index = submenuFocusIndex) => {
        if (!submenuOpen) {
          if (
            Events.isEnterKey(event) ||
            Events.isSpaceKey(event) ||
            Events.isDownKey(event)
          ) {
            event.preventDefault();
            setSubmenuOpen(true);
            setSubmenuFocusIndex(0);
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            setSubmenuOpen(true);
            setSubmenuFocusIndex(numberOfChildren - 1);
          }

          if (!event.defaultPrevented) {
            menuContext.handleKeyDown(event);
          }
        }

        if (submenuOpen) {
          let nextIndex = index;

          if (Events.isDownKey(event)) {
            event.preventDefault();
            if (index < numberOfChildren - 1) {
              nextIndex = index + 1;
            } else {
              nextIndex = 0;
            }
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            if (!index) {
              nextIndex = numberOfChildren - 1;
            } else {
              nextIndex = index - 1;
            }
          }

          if (Events.isLeftKey(event) || Events.isRightKey(event)) {
            menuContext.handleKeyDown(event, true);
            closeSubmenu();
            return;
          }

          if (Events.isTabKey(event)) {
            closeSubmenu();
            return;
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

          if (Events.isAlphabetKey(event)) {
            nextIndex = characterNavigation(
              event,
              React.Children.toArray(children),
              index
            );
          }

          // Check that next index contains a MenuItem
          // If not, call handleKeyDown again
          const nextChild = React.Children.toArray(children)[nextIndex];
          if (nextChild && nextChild.type === MenuItem) {
            setSubmenuFocusIndex(nextIndex);
          } else {
            handleKeyDown(event, nextIndex);
          }
        }
      },
      [
        children,
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
      if (menuContextOpen) {
        setSubmenuOpen(menuContextOpen);
      }
    }, [menuContextOpen]);

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
        onMouseOver={() => setSubmenuOpen(true)}
        onMouseLeave={() => closeSubmenu()}
        ref={submenuRef}
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
          tabbable={tabbable}
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
                  handleKeyDown,
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
  /**
   * @private
   * @ignore
   *
   */
  tabbable: PropTypes.bool,
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow: PropTypes.bool,
};

export { SubmenuContext };
export default Submenu;
