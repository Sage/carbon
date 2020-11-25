import React, { useRef, useEffect, useCallback, useReducer } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StyledMenuItemWrapper from "./menu-item.style";
import {
  StyledSubmenu,
  StyledSubmenuItem,
  StyledSubmenuTitle,
} from "../submenu-block/submenu.style";
import OptionHelper from "../../../utils/helpers/options-helper";
import Link from "../../link";
import Events from "../../../utils/helpers/events";
import SubmenuBlock from "../submenu-block/submenu-block.component";

const MenuItem = React.forwardRef(
  (
    {
      submenu,
      children,
      href,
      to,
      menuType,
      onClick,
      target,
      submenuDirection = "right",
      icon,
      selected,
      routerLink,
      isFirstElement,
      handleKeyDown,
      isOpen,
      setIsOpenSubmenu,
      menuItemIndex,
      onKeyDown,
      isOpenByArrowLeftOrRight,
      setOpenByArrowLeftOrRight,
      setFocusToElement,
      variant = "default",
      showDropdownArrow = true,
    },
    ref
  ) => {
    const initialState = {
      didOpenByArrowUp: false,
      didOpenByMouseEnter: false,
      didOpenByClick: false,
    };

    function reducer(state, action) {
      switch (action.type) {
        case "setOpenByArrowUp":
          return { didOpenByArrowUp: true, didOpenByClick: false };
        case "setOpenByMouseEnter":
          return { didOpenByMouseEnter: true };
        case "setOpenByClick":
          return { didOpenByClick: true };
        case "clearState":
          return { ...initialState };
        /* istanbul ignore next */
        default:
          throw new Error();
      }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const childrenItems = React.Children.map(children, (child) => {
      if (child.type === SubmenuBlock) {
        const childArray = Array.isArray(child.props.children)
          ? child.props.children
          : [child.props.children];

        return [...childArray.map((innerChild) => innerChild)];
      }

      return child;
    });

    const submenuItemsRefs =
      submenu &&
      useRef(childrenItems.map((child) => child.ref || React.createRef()));
    const actualFocusedItemIndex = useRef();
    const submenuWrapperRef = useRef();
    const setFocusToSubmenuElement = useCallback(
      (event, index, initialDirection) => {
        if (event) {
          event.preventDefault();
        }

        const isPassiveElement = (i) =>
          submenuItemsRefs.current[i] &&
          submenuItemsRefs.current[i].current.tagName === "DIV";

        const getBoundedIndex = (i) => {
          if (i > submenuItemsRefs.current.length - 1) {
            return 0;
          }
          if (i < 0) {
            return submenuItemsRefs.current.length - 1;
          }

          return i;
        };

        const calculateNewIndex = (i, direction) => {
          const increment = direction === "desc" ? 1 : -1;
          const newIndex = getBoundedIndex(i + increment);

          if (isPassiveElement(newIndex)) {
            return calculateNewIndex(newIndex, direction);
          }

          return newIndex;
        };

        const findIndex = () => {
          const newIndex = getBoundedIndex(index);

          if (isPassiveElement(newIndex)) {
            const direction =
              initialDirection === "desc" || (event && Events.isDownKey(event))
                ? "desc"
                : "asc";

            return calculateNewIndex(newIndex, direction);
          }

          return newIndex;
        };

        actualFocusedItemIndex.current = findIndex();
        submenuItemsRefs.current[
          actualFocusedItemIndex.current
        ].current.focus();
      },
      [submenuItemsRefs]
    );

    const onCloseSubmenu = useCallback(() => {
      setIsOpenSubmenu(null);
      setOpenByArrowLeftOrRight(false);
      dispatch({ type: "clearState" });
    }, [setIsOpenSubmenu, setOpenByArrowLeftOrRight]);

    const detectClickOutside = useCallback(
      (e) => {
        if (!Events.composedPath(e).includes(submenuWrapperRef.current)) {
          onCloseSubmenu();
          document.removeEventListener("click", detectClickOutside);
        }
      },
      [onCloseSubmenu]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("click", detectClickOutside);
      }

      if (submenu && isOpen) {
        if (
          !state.didOpenByArrowUp &&
          !state.didOpenByMouseEnter &&
          !state.didOpenByClick &&
          !isOpenByArrowLeftOrRight
        ) {
          setFocusToSubmenuElement(undefined, 0, "desc");
        } else if (
          state.didOpenByArrowUp &&
          !state.didOpenByMouseEnter &&
          !state.didOpenByClick &&
          !isOpenByArrowLeftOrRight
        ) {
          setFocusToSubmenuElement(
            undefined,
            submenuItemsRefs.current.length - 1,
            "asc"
          );
        }
      }

      return function cleanup() {
        document.removeEventListener("click", detectClickOutside);
      };
    }, [
      submenu,
      detectClickOutside,
      isOpen,
      onCloseSubmenu,
      setIsOpenSubmenu,
      menuItemIndex,
      ref,
      state.didOpenByArrowUp,
      state.didOpenByMouseEnter,
      state.didOpenByClick,
      setFocusToSubmenuElement,
      state.didOpenByArrowLeftOrRight,
      isOpenByArrowLeftOrRight,
      setOpenByArrowLeftOrRight,
      submenuItemsRefs,
    ]);

    const onKeyDownSubmenu = useCallback(
      (ev, index) => {
        if (onKeyDown) {
          onKeyDown(ev);
        }

        if (!ev.defaultPrevented) {
          if (!isOpen) {
            setOpenByArrowLeftOrRight(false);
            if (
              Events.isEnterKey(ev) ||
              Events.isSpaceKey(ev) ||
              Events.isDownKey(ev)
            ) {
              ev.preventDefault();
              setIsOpenSubmenu(menuItemIndex);
            }
            if (Events.isUpKey(ev)) {
              ev.preventDefault();
              dispatch({ type: "setOpenByArrowUp" });
              setIsOpenSubmenu(menuItemIndex);
            }
          }

          if (isOpen) {
            if (state.didOpenByClick || isOpenByArrowLeftOrRight) {
              if (Events.isDownKey(ev)) {
                ev.preventDefault();
                setOpenByArrowLeftOrRight(false);
                dispatch({ type: "clearState" });
                setFocusToSubmenuElement(ev, 0);
              } else if (Events.isUpKey(ev)) {
                ev.preventDefault();
                setOpenByArrowLeftOrRight(false);
                dispatch({ type: "setOpenByArrowUp" });
                setFocusToSubmenuElement(
                  ev,
                  submenuItemsRefs.current.length - 1
                );
              } else if (Events.isLeftKey(ev)) {
                ev.preventDefault();
                setIsOpenSubmenu(menuItemIndex - 1);
                setFocusToElement(undefined, menuItemIndex - 1);
              } else if (Events.isRightKey(ev)) {
                ev.preventDefault();
                setIsOpenSubmenu(menuItemIndex + 1);
                setFocusToElement(undefined, menuItemIndex + 1);
              } else if (Events.isHomeKey(ev)) {
                ev.preventDefault();
                setFocusToSubmenuElement(ev, 0, "desc");
              } else if (Events.isEndKey(ev)) {
                ev.preventDefault();
                setFocusToSubmenuElement(
                  ev,
                  submenuItemsRefs.current.length - 1,
                  "asc"
                );
              }
            } else if (Events.isDownKey(ev)) {
              ev.preventDefault();
              setFocusToSubmenuElement(ev, index + 1);
            } else if (Events.isUpKey(ev)) {
              ev.preventDefault();
              setFocusToSubmenuElement(ev, index - 1);
            } else if (Events.isRightKey(ev)) {
              onCloseSubmenu();
              setOpenByArrowLeftOrRight(true);
              setIsOpenSubmenu(menuItemIndex + 1);
              setFocusToElement(undefined, menuItemIndex + 1);
            } else if (Events.isLeftKey(ev)) {
              onCloseSubmenu();
              setOpenByArrowLeftOrRight(true);
              setIsOpenSubmenu(menuItemIndex - 1);
              setFocusToElement(undefined, menuItemIndex - 1);
            } else if (Events.isTabKey(ev)) {
              onCloseSubmenu();
            } else if (Events.isHomeKey(ev)) {
              ev.preventDefault();
              setFocusToSubmenuElement(ev, 0, "desc");
            } else if (Events.isEndKey(ev)) {
              ev.preventDefault();
              setFocusToSubmenuElement(
                ev,
                submenuItemsRefs.current.length - 1,
                "asc"
              );
            } else if (Events.isEscKey(ev)) {
              onCloseSubmenu();
              ref.current.focus();
            } else if (Events.isAlphabetKey(ev)) {
              // A-Za-z: focus the next item on the list that starts with the pressed key
              // selection should wrap to the start of the list
              ev.stopPropagation();
              let firstMatch;
              let nextMatch;

              childrenItems.forEach(({ props }, i) => {
                if (
                  props.children &&
                  props.children
                    .toString()
                    .toLowerCase()
                    .startsWith(ev.key.toLowerCase())
                ) {
                  if (firstMatch === undefined) {
                    firstMatch = i;
                  }
                  if (
                    i > actualFocusedItemIndex.current &&
                    nextMatch === undefined
                  ) {
                    nextMatch = i;
                  }
                }
              });

              if (nextMatch !== undefined) {
                setFocusToSubmenuElement(undefined, nextMatch);
              } else if (firstMatch !== undefined) {
                setFocusToSubmenuElement(undefined, firstMatch);
              }
            }
          }
        }
      },
      [
        childrenItems,
        isOpen,
        isOpenByArrowLeftOrRight,
        menuItemIndex,
        onCloseSubmenu,
        onKeyDown,
        ref,
        setFocusToElement,
        setFocusToSubmenuElement,
        setIsOpenSubmenu,
        setOpenByArrowLeftOrRight,
        state.didOpenByClick,
        submenuItemsRefs,
      ]
    );

    const handleMouseOver = useCallback(() => {
      dispatch({ type: "setOpenByMouseEnter" });
      setIsOpenSubmenu(menuItemIndex);
    }, [menuItemIndex, setIsOpenSubmenu]);

    const handleMouseLeave = useCallback(() => {
      onCloseSubmenu();
    }, [onCloseSubmenu]);

    const handleClick = useCallback(() => {
      onCloseSubmenu();
      dispatch({ type: "setOpenByClick" });
      setIsOpenSubmenu(menuItemIndex);
    }, [menuItemIndex, onCloseSubmenu, setIsOpenSubmenu]);

    const handleKeyDownManager = useCallback(
      (event) => {
        if (onKeyDown) {
          onKeyDown(event);
        }

        if (!submenu && Events.isSpaceKey(event)) {
          ref.current.click();
        }

        if (!event.defaultPrevented) {
          handleKeyDown(event);
        }
      },
      [handleKeyDown, onKeyDown, ref, submenu]
    );

    const content = () => {
      if (!submenu) return children;

      return (
        <div
          ref={submenuWrapperRef}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <StyledSubmenuTitle>
            <StyledMenuItemWrapper
              href={href}
              to={to}
              menuType={menuType}
              ref={ref}
              tabIndex={-1}
              onKeyDown={onKeyDownSubmenu}
              onClick={handleClick}
              variant={variant}
            >
              {submenu}
            </StyledMenuItemWrapper>
          </StyledSubmenuTitle>
          <StyledSubmenu submenuDirection={submenuDirection}>
            {childrenItems.map((child, index) => (
              <StyledSubmenuItem key={child.props.key || index}>
                {React.cloneElement(child, {
                  menuType,
                  ref: submenuItemsRefs.current[index],
                  handleKeyDown: (ev) => onKeyDownSubmenu(ev, index),
                })}
              </StyledSubmenuItem>
            ))}
          </StyledSubmenu>
        </div>
      );
    };

    const classes = () => {
      return classNames({
        "carbon-menu-item--has-link": href || to || onClick,
      });
    };

    const elementProps = {
      className: classes(),
      href,
      to,
      target,
      onClick,
      icon,
      hasSubmenu: Boolean(submenu),
      selected,
      menuType,
      tabbable: isFirstElement,
    };

    if (!submenu) {
      elementProps.routerLink = routerLink;
    }

    return (
      <StyledMenuItemWrapper
        {...(!submenu ? { ref } : {})}
        onKeyDown={handleKeyDownManager}
        as={submenu ? "div" : Link}
        data-component="menu-item"
        {...elementProps}
        isOpen={isOpen}
        variant={variant}
        role="menuitem"
        showDropdownArrow={showDropdownArrow}
      >
        {content()}
      </StyledMenuItemWrapper>
    );
  }
);

MenuItem.propTypes = {
  /** Children elements */
  children: PropTypes.node.isRequired,
  /** Custom className */
  className: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /** Adds an icon to the menu item. */
  icon: PropTypes.oneOf(OptionHelper.icons),
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** Is the menu item the currently selected item. */
  selected: PropTypes.bool,
  /** A title for the menu item that has a submenu. */
  submenu: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** The to link to use for the menu item. */
  to: PropTypes.string,
  /** The link element to use when providing the to value */
  routerLink: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /** onKeyDown handler */
  onKeyDown: PropTypes.func,
  /** The target to use for the menu item. */
  target: PropTypes.string,
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow: PropTypes.bool,
  /**
   * menu color scheme provided by <Menu />
   * @private
   * @ignore
   *
   */
  menuType: PropTypes.oneOf(["light", "dark"]),
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /**
   * @private
   * @ignore
   */
  isFirstElement: PropTypes.bool,
  /**
   * @private
   * @ignore
   */
  handleKeyDown: PropTypes.func,
  /**
   * @private
   * @ignore
   */
  isOpen: PropTypes.bool,
  /**
   * @private
   * @ignore
   */
  setIsOpenSubmenu: PropTypes.func,
  /**
   * @private
   * @ignore
   */
  menuItemIndex: PropTypes.number,
  /**
   * @private
   * @ignore
   */
  isOpenByArrowLeftOrRight: PropTypes.bool,
  /**
   * @private
   * @ignore
   */
  setOpenByArrowLeftOrRight: PropTypes.func,
  /**
   * @private
   * @ignore
   */
  setFocusToElement: PropTypes.func,
};

export default MenuItem;
