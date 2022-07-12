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
import { StyledSubmenu, StyledSubmenuWrapper } from "./submenu.style";
import Link from "../../../link";
import Events from "../../../../__internal__/utils/helpers/events";
import MenuContext from "../../menu.context";
import MenuItem from "../../menu-item";
import { characterNavigation } from "../keyboard-navigation";
import SubmenuContext from "./submenu.context";
import useClickAwayListener from "../../../../hooks/__internal__/useClickAwayListener";

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
      clickToOpen,
      href,
      maxWidth,
      asPassiveItem,
      onSubmenuOpen,
      onSubmenuClose,
      onClick,
      scrollable,
      ...rest
    },
    ref
  ) => {
    const [blockDoubleFocus, setBlockDoubleFocus] = useState(false);
    const menuContext = useContext(MenuContext);
    const { inFullscreenView } = menuContext;
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusIndex, setSubmenuFocusIndex] = useState(undefined);
    const [characterString, setCharacterString] = useState("");
    const submenuRef = useRef();

    const formattedChildren = useMemo(() => {
      if (scrollable) {
        // there will be only one child, a ScrollableBlock containing the "real" MenuItem children
        return children.props.children;
      }

      const childrenFormatted = [];

      React.Children.forEach(children, (child) => {
        if (child?.props.scrollable) {
          // remove any MenuItem components from the child's children, and consider these as separate children
          const allScrollableChildren = React.Children.toArray(
            child?.props.children
          );
          const menuItems = allScrollableChildren.filter(
            (scrollableChild) => scrollableChild.type === MenuItem
          );
          const nonMenuItems = allScrollableChildren.filter(
            (scrollableChild) => scrollableChild.type !== MenuItem
          );
          const menuItemsRemoved = React.cloneElement(child, {
            children: nonMenuItems,
          });

          childrenFormatted.push(menuItemsRemoved, ...menuItems);
        } else {
          childrenFormatted.push(child);
        }
      });

      return childrenFormatted;
    }, [children, scrollable]);

    const arrayOfFormattedChildren = useMemo(
      () => React.Children.toArray(formattedChildren),
      [formattedChildren]
    );

    const numberOfChildren = useMemo(
      () => React.Children.count(formattedChildren),
      [formattedChildren]
    );

    const scrollableParts = useMemo(() => {
      const parts = [];
      if (scrollable) {
        parts.push({ start: 0, end: numberOfChildren - 1 });
      } else {
        let scrollableChildrenSoFar = 0;
        React.Children.forEach(children, (child, index) => {
          if (child?.type === MenuItem && child.props.scrollable) {
            const scrollableChildrenCount = React.Children.toArray(
              child.props.children
            ).filter((grandChild) => grandChild.type === MenuItem).length;

            const startIndex = index + scrollableChildrenSoFar;

            parts.push({
              start: startIndex + 1,
              end: startIndex + scrollableChildrenCount,
            });

            scrollableChildrenSoFar += scrollableChildrenCount;
          }
        });
      }
      return parts;
    }, [children, numberOfChildren, scrollable]);

    // given the index of an item in the submenu, determines the index of its first scrollable child
    // in the array of all flattened children including scrollable blocks, if it exists.
    // Otherwise, returns the index of the previous "first scrollable child", or 1 more than its own index
    // if there are no scrollable blocks before it - in both cases the resulting blockindex ensures no
    // items are focused.
    const getBlockIndex = (childIndex) => {
      let blockIndex = childIndex + 1;
      let scrollableCount = 0;
      for (const { start, end } of scrollableParts) {
        const actualIndex = childIndex + scrollableCount;
        if (start > actualIndex + 1) {
          break;
        }
        blockIndex = start;
        scrollableCount += end - start + 1;
      }
      return blockIndex;
    };

    const isFocusInScrollableBlock = useMemo(() => {
      for (const { start, end } of scrollableParts) {
        if (submenuFocusIndex >= start && submenuFocusIndex <= end) {
          return true;
        }
      }
      return false;
    }, [scrollableParts, submenuFocusIndex]);

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

    const openSubmenu = useCallback(() => {
      setSubmenuOpen(true);
      if (onSubmenuOpen) onSubmenuOpen();
    }, [onSubmenuOpen]);

    const closeSubmenu = useCallback(() => {
      setSubmenuOpen(false);
      if (onSubmenuClose) onSubmenuClose();
      setSubmenuFocusIndex(undefined);
      setBlockDoubleFocus(false);
      setCharacterString("");
    }, [onSubmenuClose]);

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
            openSubmenu();
            if (!href) {
              setSubmenuFocusIndex(0);
            }
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
            setBlockDoubleFocus(true);
          }

          if (Events.isTabKey(event) && Events.isShiftKey(event)) {
            if (index === 0) {
              closeSubmenu();
              return;
            }
            nextIndex = index - 1;
            setBlockDoubleFocus(true);
          }

          if (Events.isDownKey(event)) {
            event.preventDefault();
            if (index < numberOfChildren - 1) {
              nextIndex = index + 1;
            }
            setBlockDoubleFocus(false);
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            if (index > 0) {
              nextIndex = index - 1;
            }
            setBlockDoubleFocus(false);
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

          if (event.key.length === 1) {
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

          if (href && index === undefined) {
            if (
              Events.isEnterKey(event) ||
              (Events.isTabKey(event) && Events.isShiftKey(event))
            ) {
              closeSubmenu();
              return;
            }

            if (
              Events.isSpaceKey(event) ||
              Events.isDownKey(event) ||
              Events.isUpKey(event) ||
              Events.isTabKey(event)
            ) {
              nextIndex = 0;
            }
          }

          // Defensive check in case an unhandled key event from a child component
          // has bubbled up
          if (!nextIndex && nextIndex !== 0) return;

          // Check that next index contains a MenuItem
          // If not, call handleKeyDown again
          const nextChild = arrayOfFormattedChildren[nextIndex];

          if (nextChild?.type === MenuItem || typeof nextChild === "string") {
            setSubmenuFocusIndex(nextIndex);
          } else {
            handleKeyDown(event, nextIndex);
          }
        }
      },
      [
        submenuFocusIndex,
        submenuOpen,
        href,
        menuContext,
        arrayOfFormattedChildren,
        numberOfChildren,
        openSubmenu,
        closeSubmenu,
        onKeyDown,
        characterString,
        restartCharacterTimeout,
        startCharacterTimeout,
      ]
    );

    const handleClickAway = () => {
      document.removeEventListener("click", handleClickAway);
      closeSubmenu();
    };

    const handleClick = (event) => {
      openSubmenu();

      if (onClick) {
        onClick(event);
      }
    };

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

    useClickAwayListener([submenuRef], handleClickAway);

    if (inFullscreenView) {
      return (
        <StyledSubmenuWrapper
          data-component="submenu-wrapper"
          ref={submenuRef}
          inFullscreenView={inFullscreenView}
          menuType={menuContext.menuType}
          asPassiveItem={asPassiveItem}
          {...(scrollable ? { as: "div" } : { role: "list" })}
        >
          <StyledMenuItemWrapper
            {...rest}
            className={className}
            menuType={menuContext.menuType}
            ref={ref}
            as={asPassiveItem ? "div" : Link}
            href={!asPassiveItem ? href : undefined}
            icon={icon}
            tabIndex={asPassiveItem ? -1 : 0}
            variant={variant}
            inFullscreenView={inFullscreenView}
          >
            {title}
          </StyledMenuItemWrapper>
          <StyledSubmenu
            data-component="submenu"
            variant={variant}
            menuType={menuContext.menuType}
            inFullscreenView={inFullscreenView}
          >
            {React.Children.map(children, (child, index) => (
              <SubmenuContext.Provider
                value={{
                  isFocused: submenuFocusIndex === index,
                  focusIndex: submenuFocusIndex,
                  handleKeyDown,
                  blockIndex: getBlockIndex(index),
                }}
              >
                {child}
              </SubmenuContext.Provider>
            ))}
          </StyledSubmenu>
        </StyledSubmenuWrapper>
      );
    }

    return (
      <StyledSubmenuWrapper
        data-component="submenu-wrapper"
        onMouseOver={!clickToOpen ? () => openSubmenu() : undefined}
        onMouseLeave={() => closeSubmenu()}
        ref={submenuRef}
        isSubmenuOpen={submenuOpen}
      >
        <StyledMenuItemWrapper
          {...rest}
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
          onClick={handleClick}
          clickToOpen={clickToOpen}
          href={href}
          maxWidth={maxWidth}
          aria-expanded={submenuOpen}
        >
          {title}
        </StyledMenuItemWrapper>

        {submenuOpen && (
          <StyledSubmenu
            data-component="submenu"
            submenuDirection={submenuDirection}
            variant={variant}
            menuType={menuContext.menuType}
            {...(scrollable ? { as: "div" } : { role: "list" })}
          >
            {React.Children.map(children, (child, index) => (
              <SubmenuContext.Provider
                value={{
                  isFocused:
                    !isFocusInScrollableBlock &&
                    !blockDoubleFocus &&
                    submenuFocusIndex === getBlockIndex(index) - 1,
                  focusIndex: submenuFocusIndex,
                  handleKeyDown,
                  blockIndex: getBlockIndex(index),
                  updateFocusIndex: setSubmenuFocusIndex,
                  itemIndex: child.type === MenuItem ? index : undefined,
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
  /**
   * * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Adds an icon to the menu item.
   * */
  icon: PropTypes.string,
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
  /** When set the submenu opens by click instead of hover */
  clickToOpen: PropTypes.bool,
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** Maximum width. Any valid CSS string */
  maxWidth: PropTypes.string,
  /** Used to set a submenu parent to passive styling in MenuFullscreen */
  asPassiveItem: PropTypes.bool,
  /** Callback triggered when submenu opens. Only valid with submenu prop */
  onSubmenuOpen: PropTypes.func,
  /** Callback triggered when submenu closes. Only valid with submenu prop */
  onSubmenuClose: PropTypes.func,
  /** Callback triggered when the top-level menu item is clicked */
  onClick: PropTypes.func,
  /** indicates whether the child menu is wrapped in a ScrollableBlock or not */
  scrollable: PropTypes.bool,
};

export default Submenu;
