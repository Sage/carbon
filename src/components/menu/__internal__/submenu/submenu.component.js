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
import { characterNavigation } from "../keyboard-navigation";
import SubmenuContext from "./submenu.context";
import useClickAwayListener from "../../../../hooks/__internal__/useClickAwayListener";
import guid from "../../../../__internal__/utils/helpers/guid";
import {
  SCROLLABLE_BLOCK,
  SCROLLABLE_BLOCK_PARENT,
  BLOCK_INDEX_SELECTOR,
  ALL_CHILDREN_SELECTOR,
} from "../locators";

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
    const submenuRef = useRef(null);
    const submenuId = useRef(guid());
    const menuContext = useContext(MenuContext);
    const { inFullscreenView, openSubmenuId, setOpenSubmenuId } = menuContext;
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [submenuFocusId, setSubmenuFocusId] = useState(null);
    const [submenuItemIds, setSubmenuItemIds] = useState([]);
    const [characterString, setCharacterString] = useState("");
    const shiftTabPressed = useRef(false);

    const registerItem = useCallback((id) => {
      setSubmenuItemIds((prevState) => {
        return [...prevState, id];
      });
    }, []);

    const unregisterItem = useCallback((id) => {
      setSubmenuItemIds((prevState) => {
        return prevState.filter((itemId) => itemId !== id);
      });
    }, []);

    const numberOfChildren = submenuItemIds.length;

    const blockIndex = useMemo(() => {
      if (submenuOpen && numberOfChildren) {
        const childrenArray = Array.from(
          submenuRef.current?.querySelectorAll(BLOCK_INDEX_SELECTOR)
        );

        const scrollableBlock = submenuRef.current?.querySelector(
          `[data-component='${SCROLLABLE_BLOCK}']`
        );

        const index = childrenArray.indexOf(scrollableBlock);

        return scrollableBlock?.querySelector(
          `[data-component='${SCROLLABLE_BLOCK_PARENT}']`
        )
          ? index + 1
          : index;
      }

      return -1;
    }, [submenuOpen, numberOfChildren]);

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
      setOpenSubmenuId(submenuId.current);
      if (onSubmenuOpen) {
        onSubmenuOpen();
      }
    }, [onSubmenuOpen, setOpenSubmenuId]);

    const closeSubmenu = useCallback(() => {
      shiftTabPressed.current = false;
      setSubmenuOpen(false);
      setSubmenuFocusId(null);
      if (onSubmenuClose) {
        onSubmenuClose();
      }
      setCharacterString("");
    }, [onSubmenuClose]);

    useEffect(() => {
      if (openSubmenuId && openSubmenuId !== submenuId.current) {
        closeSubmenu();
      }
    }, [openSubmenuId, closeSubmenu]);

    const findCurrentIndex = useCallback(
      (id) => {
        const index = submenuItemIds.findIndex((itemId) => itemId === id);

        return index === -1 ? 0 : index;
      },
      [submenuItemIds]
    );

    const handleKeyDown = useCallback(
      (event) => {
        if (!submenuOpen) {
          if (
            Events.isEnterKey(event) ||
            Events.isSpaceKey(event) ||
            Events.isDownKey(event) ||
            Events.isUpKey(event)
          ) {
            event.preventDefault();
            openSubmenu();
          }
        }

        if (submenuOpen) {
          const index = findCurrentIndex(submenuFocusId);
          let nextIndex = index;

          if (href && !submenuFocusId) {
            if (
              Events.isDownKey(event) ||
              Events.isUpKey(event) ||
              (Events.isTabKey(event) && !Events.isShiftKey(event))
            ) {
              event.preventDefault();
              setSubmenuFocusId(submenuItemIds[0]);
              return;
            }
          }

          if (Events.isTabKey(event) && !Events.isShiftKey(event)) {
            if (nextIndex === numberOfChildren - 1) {
              closeSubmenu();
              return;
            }

            shiftTabPressed.current = false;
            nextIndex += 1;
          }

          if (Events.isTabKey(event) && Events.isShiftKey(event)) {
            if (nextIndex === 0) {
              closeSubmenu();
              return;
            }

            shiftTabPressed.current = true;
            nextIndex -= 1;
          }

          if (Events.isDownKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;

            if (nextIndex < numberOfChildren - 1) {
              nextIndex += 1;
            }
          }

          if (Events.isUpKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;

            if (nextIndex > 0) {
              nextIndex -= 1;
            }
          }

          if (Events.isEscKey(event)) {
            onKeyDown(event);
            closeSubmenu();
            return;
          }

          if (Events.isHomeKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;
            nextIndex = 0;
          }

          if (Events.isEndKey(event)) {
            event.preventDefault();
            shiftTabPressed.current = false;
            nextIndex = numberOfChildren - 1;
          }

          if (event.key.length === 1) {
            event.stopPropagation();
            shiftTabPressed.current = false;

            if (characterTimer.current) {
              restartCharacterTimeout();
            } else {
              startCharacterTimeout();
            }

            setCharacterString(`${characterString}${event.key.toLowerCase()}`);
          } else {
            setCharacterString("");
          }

          if (Events.isEnterKey(event)) {
            /* timeout enforces that the "closeSubmenu" method will be run after 
              the browser navigates to the specified href of the menu-item. */
            setTimeout(() => closeSubmenu());
          }

          if (href && Events.isEnterKey(event)) {
            closeSubmenu();
            return;
          }

          if (nextIndex !== index) {
            setSubmenuFocusId(submenuItemIds[nextIndex]);
          }
        }
      },
      [
        submenuItemIds,
        submenuOpen,
        href,
        numberOfChildren,
        submenuFocusId,
        findCurrentIndex,
        openSubmenu,
        closeSubmenu,
        onKeyDown,
        characterString,
        restartCharacterTimeout,
        startCharacterTimeout,
      ]
    );

    useEffect(() => {
      if (submenuOpen && !href && !submenuFocusId && submenuItemIds.length) {
        setSubmenuFocusId(submenuItemIds[0]);
      }
    }, [submenuOpen, href, submenuFocusId, submenuItemIds]);

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
        const submenuChildren = Array.from(
          submenuRef.current?.querySelectorAll(ALL_CHILDREN_SELECTOR)
        );
        const nextItem = characterNavigation(characterString, submenuChildren);

        if (nextItem) {
          setSubmenuFocusId(nextItem.id);
        }
      }
    }, [characterString, submenuItemIds]);

    const handleClickInside = useClickAwayListener(handleClickAway);

    if (inFullscreenView) {
      return (
        <StyledSubmenuWrapper
          data-component="submenu-wrapper"
          inFullscreenView={inFullscreenView}
          menuType={menuContext.menuType}
          asPassiveItem={asPassiveItem}
          onClick={handleClickInside}
        >
          <StyledMenuItemWrapper
            {...rest}
            onClick={onClick}
            className={className}
            menuType={menuContext.menuType}
            ref={ref}
            as={asPassiveItem ? "div" : Link}
            href={href}
            icon={icon}
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
            ref={submenuRef}
          >
            <SubmenuContext.Provider
              value={{
                handleKeyDown,
                blockIndex,
                registerItem,
                unregisterItem,
                updateFocusId: setSubmenuFocusId,
              }}
            >
              {children}
            </SubmenuContext.Provider>
          </StyledSubmenu>
        </StyledSubmenuWrapper>
      );
    }

    return (
      <StyledSubmenuWrapper
        data-component="submenu-wrapper"
        onMouseOver={!clickToOpen ? () => openSubmenu() : undefined}
        onMouseLeave={() => closeSubmenu()}
        isSubmenuOpen={submenuOpen}
        onClick={handleClickInside}
        ref={submenuRef}
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
            role={blockIndex === 0 ? "presentation" : "list"}
          >
            <SubmenuContext.Provider
              value={{
                submenuFocusId,
                handleKeyDown,
                blockIndex,
                registerItem,
                unregisterItem,
                updateFocusId: setSubmenuFocusId,
                shiftTabPressed: shiftTabPressed.current,
              }}
            >
              {children}
            </SubmenuContext.Provider>
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
};

export default Submenu;
