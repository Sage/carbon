/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, {
  useCallback,
  useEffect,
  useContext,
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
import ScrollableBlock from "../../scrollable-block";
import SubmenuContext from "./submenu.context";
import ClickAwayWrapper from "../../../../__internal__/click-away-wrapper";

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
      ...rest
    },
    ref
  ) => {
    const [blockDoubleFocus, setBlockDoubleFocus] = useState(false);
    const menuContext = useContext(MenuContext);
    const { inFullscreenView } = menuContext;
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusIndex, setSubmenuFocusIndex] = useState(undefined);

    const wholeMenuIsScrollable =
      React.Children.toArray(children)[0].type === ScrollableBlock;

    const blocksRef = useRef(null);
    const formattedChildren = useRef(null);

    const getBlocks = function () {
      let inBlockSoFar = 0;
      const currentBlocks = [];
      const childrenFormatted = [];

      React.Children.toArray(children).forEach((child, index) => {
        // for when the whole submenu is scrollable
        if (child?.type === ScrollableBlock) {
          childrenFormatted.push(...child.props.children);
          currentBlocks.push({
            start: 0,
            end: React.Children.count(child.props.children) - 1,
          });
          return;
        }
        // check for a scrollable sub-submenu inside a MenuItem
        const grandChildren = React.Children.toArray(child?.props.children);
        const scrollableSubmenu = grandChildren.find(
          (grandChild) => grandChild.type === ScrollableBlock
        );
        if (scrollableSubmenu) {
          const submenuLength = React.Children.count(
            scrollableSubmenu.props.children
          );
          const withoutScrollable = React.cloneElement(child, {
            children: grandChildren.filter(
              (grandChild) => grandChild !== scrollableSubmenu
            ),
          });
          currentBlocks.push({
            start: index + inBlockSoFar + 1,
            end: index + inBlockSoFar + submenuLength,
          });
          inBlockSoFar += submenuLength;
          childrenFormatted.push(
            withoutScrollable,
            ...scrollableSubmenu.props.children
          );
          return;
        }
        childrenFormatted.push(child);
      });
      blocksRef.current = currentBlocks;
      formattedChildren.current = childrenFormatted;
    };

    if (blocksRef.current === null) {
      getBlocks();
    }

    useEffect(getBlocks, [children]);

    const [characterString, setCharacterString] = useState("");
    const submenuRef = useRef();

    const numberOfChildren = formattedChildren.current.length;

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
          const nextChild = formattedChildren.current[nextIndex];

          if (nextChild?.type === MenuItem) {
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
          formattedChildren.current,
          submenuFocusIndex
        );

        setSubmenuFocusIndex(nextIndex);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [characterString]);

    const getBlockIndex = (childIndex) => {
      // special case
      if (wholeMenuIsScrollable) {
        return -1;
      }
      let overallIndex = childIndex;
      for (const { start, end } of blocksRef.current) {
        if (start > overallIndex) {
          // means all remaining blocks are past the current index, so exit and return the
          // current overall index
          break;
        }
        const numberOfScrollableChildren = end + 1 - start;
        overallIndex += numberOfScrollableChildren;
      }
      return overallIndex;
    };

    const isIndexInScrollableSubmenu = (index) => {
      for (const { start, end } of blocksRef.current) {
        if (index >= start && index <= end) {
          return true;
        }
      }
      return false;
    };

    if (inFullscreenView) {
      return (
        <StyledSubmenuWrapper
          data-component="submenu-wrapper"
          ref={submenuRef}
          inFullscreenView={inFullscreenView}
          menuType={menuContext.menuType}
          asPassiveItem={asPassiveItem}
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
            {...(wholeMenuIsScrollable ? { as: "div" } : { role: "list" })}
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
      <ClickAwayWrapper
        handleClickAway={handleClickAway}
        targets={[submenuRef]}
      >
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
              {...(wholeMenuIsScrollable ? { as: "div" } : { role: "list" })}
            >
              {React.Children.map(children, (child, index) => (
                <SubmenuContext.Provider
                  value={{
                    isFocused:
                      !isIndexInScrollableSubmenu(submenuFocusIndex) &&
                      !blockDoubleFocus &&
                      submenuFocusIndex === getBlockIndex(index),
                    focusIndex: submenuFocusIndex,
                    handleKeyDown,
                    blockIndex: getBlockIndex(index),
                    updateFocusIndex: setSubmenuFocusIndex,
                    itemIndex: child?.type === MenuItem ? index : undefined,
                  }}
                >
                  {child}
                </SubmenuContext.Provider>
              ))}
            </StyledSubmenu>
          )}
        </StyledSubmenuWrapper>
      </ClickAwayWrapper>
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
};

export default Submenu;
