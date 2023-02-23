import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import classNames from "classnames";

import StyledMenuItemWrapper from "./menu-item.style";
import Link from "../../link";
import Events from "../../../__internal__/utils/helpers/events";
import MenuContext from "../menu.context";
import Submenu from "../__internal__/submenu/submenu.component";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import { StyledMenuItem } from "../menu.style";
import guid from "../../../__internal__/utils/helpers/guid";

const MenuItem = ({
  submenu,
  children,
  href,
  onClick,
  target,
  submenuDirection = "right",
  icon,
  selected,
  onKeyDown,
  variant = "default",
  showDropdownArrow = true,
  ariaLabel,
  clickToOpen,
  maxWidth,
  menuOpen,
  onSubmenuOpen,
  onSubmenuClose,
  overrideColor,
  rel,
  ...rest
}) => {
  const {
    inFullscreenView,
    registerItem,
    unregisterItem,
    focusId,
    menuType,
    openSubmenuId,
  } = useContext(MenuContext);
  const menuItemId = useRef(guid());
  const submenuContext = useContext(SubmenuContext);
  const {
    registerItem: registerSubmenuItem,
    unregisterItem: unregisterSubmenuItem,
    submenuFocusId,
    updateFocusId: updateSubmenuFocusId,
    handleKeyDown: handleSubmenuKeyDown,
    shiftTabPressed,
  } = submenuContext;
  const ref = useRef(null);
  const focusFromMenu = focusId === menuItemId.current;
  const focusFromSubmenu = submenuFocusId
    ? submenuFocusId === menuItemId.current
    : undefined;
  const inputRef = useRef(null);
  const inputIcon = useRef(null);

  inputIcon.current = ref.current?.querySelector(
    "[data-element='input-icon-toggle']"
  );
  inputRef.current = ref.current?.querySelector("[data-element='input']");
  const focusRef = inputRef.current ? inputRef : ref;

  useEffect(() => {
    const id = menuItemId.current;
    if (registerSubmenuItem) {
      registerSubmenuItem(id);
    } else if (registerItem) {
      registerItem(id);
    }

    return () => {
      if (unregisterSubmenuItem) {
        unregisterSubmenuItem(id);
      } else if (unregisterItem) {
        unregisterItem(id);
      }
    };
  }, [
    registerSubmenuItem,
    registerItem,
    unregisterSubmenuItem,
    unregisterItem,
  ]);

  useEffect(() => {
    if (!openSubmenuId && focusFromSubmenu === undefined && focusFromMenu) {
      focusRef.current.focus();
    } else if (
      focusFromSubmenu &&
      !(shiftTabPressed && inputIcon.current?.getAttribute("tabindex") === "0")
    ) {
      focusRef.current.focus();
    }
  }, [
    openSubmenuId,
    focusFromMenu,
    focusFromSubmenu,
    inputIcon,
    shiftTabPressed,
    focusRef,
  ]);

  const updateFocusOnClick = useCallback(() => {
    if (updateSubmenuFocusId) {
      updateSubmenuFocusId(menuItemId.current);
    }
  }, [updateSubmenuFocusId]);

  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (Events.isEscKey(event)) {
        ref.current.focus();
      }

      const shouldFocusIcon =
        inputIcon.current?.getAttribute("tabindex") === "0" &&
        document.activeElement === inputRef.current &&
        inputRef.current?.value;

      // let natural tab order move focus if input icon is tabbable
      if (
        Events.isTabKey(event) &&
        ((!Events.isShiftKey(event) && shouldFocusIcon) ||
          (Events.isShiftKey(event) &&
            document.activeElement === inputIcon.current))
      ) {
        return;
      }

      if (handleSubmenuKeyDown) {
        handleSubmenuKeyDown(event);
      }
    },
    [onKeyDown, handleSubmenuKeyDown, inputIcon]
  );

  const classes = useMemo(
    () =>
      classNames({
        "carbon-menu-item--has-link": href || onClick,
      }),
    [href, onClick]
  );

  const elementProps = {
    className: classes,
    href,
    target,
    rel,
    onClick,
    icon,
    selected,
    variant,
    onKeyDown: !inFullscreenView ? handleKeyDown : undefined,
    overrideColor,
    ref,
  };

  const getTitle = (title) =>
    maxWidth && typeof title === "string" ? title : undefined;

  const itemMaxWidth = !inFullscreenView ? maxWidth : undefined;
  const asPassiveItem = !(onClick || href);

  if (submenu) {
    return (
      <StyledMenuItem
        data-component="menu-item"
        menuType={menuType}
        display="inline-block"
        title={getTitle(submenu)}
        maxWidth={itemMaxWidth}
        onClick={updateFocusOnClick}
        {...rest}
        inFullscreenView={inFullscreenView}
        id={menuItemId.current}
      >
        <Submenu
          {...(typeof submenu !== "boolean" && { title: submenu })}
          submenuDirection={submenuDirection}
          showDropdownArrow={showDropdownArrow}
          clickToOpen={clickToOpen}
          maxWidth={maxWidth}
          asPassiveItem={asPassiveItem}
          ariaLabel={ariaLabel}
          onSubmenuOpen={onSubmenuOpen}
          onSubmenuClose={onSubmenuClose}
          {...elementProps}
          {...rest}
        >
          {children}
        </Submenu>
      </StyledMenuItem>
    );
  }

  return (
    <StyledMenuItem
      data-component="menu-item"
      menuType={menuType}
      inSubmenu={!!handleSubmenuKeyDown}
      display="inline-block"
      title={getTitle(children)}
      maxWidth={itemMaxWidth}
      {...rest}
      inFullscreenView={inFullscreenView && !Object.keys(submenuContext).length}
      menuOpen={menuOpen}
      id={menuItemId.current}
      onClick={updateFocusOnClick}
    >
      <StyledMenuItemWrapper
        as={inputRef.current ? "div" : Link}
        isSearch={inputRef.current}
        menuType={menuType}
        {...elementProps}
        ariaLabel={ariaLabel}
        maxWidth={maxWidth}
        inFullscreenView={inFullscreenView}
        asPassiveItem={asPassiveItem}
        placeholderTabIndex={asPassiveItem}
      >
        {children}
      </StyledMenuItemWrapper>
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  /** Styled system flex props */
  ...propTypes.flexbox,
  /** Styled system layout props */
  ...propTypes.layout,
  /** Either prop `icon` must be defined or this node must have children.
   * @type node
   */
  children: (props, propName, ...rest) => {
    if (!props.icon && !props.children) {
      return new Error(
        "Either prop `icon` must be defined or this node must have children."
      );
    }
    return PropTypes.node(props, propName, ...rest);
  },
  /** Custom className */
  className: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Either prop `icon` must be defined or this node must have children.
   * */
  icon: (props, propName, ...rest) => {
    if (!props.icon && !props.children) {
      return new Error(
        "Either prop `icon` must be defined or this node must have children."
      );
    }
    return PropTypes.oneOfType([PropTypes.string, PropTypes.node])(
      props,
      propName,
      ...rest
    );
  },
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** Is the menu item the currently selected item. */
  selected: PropTypes.bool,
  /** A title for the menu item that has a submenu. */
  submenu: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  /** When set the submenu opens by click instead of hover */
  clickToOpen: PropTypes.bool,
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** onKeyDown handler */
  onKeyDown: PropTypes.func,
  /** The target to use for the menu item. */
  target: PropTypes.string,
  /** The rel attribute to be used for the underlying <a> tag */
  rel: PropTypes.string,
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow: PropTypes.bool,
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** If no text is provided an ariaLabel should be given to facilitate accessibility. */
  ariaLabel: (props, ...rest) => {
    if (
      !props.children &&
      typeof props.submenu !== "string" &&
      !props.ariaLabel
    ) {
      return new Error(
        "If no text is provided an ariaLabel should be given to facilitate accessibility."
      );
    }
    return PropTypes.string(props, ...rest);
  },
  /** Callback triggered when submenu opens. Only valid with submenu prop */
  onSubmenuOpen: PropTypes.func,
  /** Callback triggered when submenu closes. Only valid with submenu prop */
  onSubmenuClose: PropTypes.func,
  /** @ignore @private */
  overrideColor: PropTypes.bool,
  /** @ignore @private */
  "data-component": PropTypes.string,
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
