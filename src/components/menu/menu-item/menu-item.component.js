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
import SubmenuBlock from "../submenu-block/submenu-block.component";
import { StyledMenuItem } from "../menu.style";
import Search from "../../search";

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
  ...rest
}) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const ref = useRef(null);
  const focusFromMenu = menuContext.isFocused;
  const focusFromSubmenu = submenuContext.isFocused;
  const isChildSearch = useRef(false);
  const childRef = useRef();
  const { inFullscreenView } = menuContext;
  const childrenItems = React.Children.map(children, (child) => {
    if (child && child.type === SubmenuBlock) {
      const childArray = Array.isArray(child.props.children)
        ? child.props.children
        : [child.props.children];

      return [...childArray.map((innerChild) => innerChild)];
    }
    if (child?.type === Search) {
      isChildSearch.current = true;
    }

    return child;
  });

  const focusRef = isChildSearch.current ? childRef : ref;
  useEffect(() => {
    if (focusFromSubmenu === undefined && focusFromMenu) {
      focusRef.current.focus();
    } else if (focusFromSubmenu) {
      focusRef.current.focus();
    }
  }, [focusFromMenu, focusFromSubmenu, focusRef]);

  const updateFocusOnClick = useCallback(() => {
    /* istanbul ignore else */
    if (submenuContext.updateFocusIndex) {
      submenuContext.updateFocusIndex(submenuContext.itemIndex);
    }
  }, [submenuContext]);

  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (Events.isEscKey(event)) {
        ref.current.focus();
      }

      if (submenuContext.handleKeyDown !== undefined) {
        if (
          !(
            isChildSearch.current &&
            document.activeElement === focusRef.current &&
            focusRef.current?.value
          )
        ) {
          submenuContext.handleKeyDown(event);
        }
      } else {
        menuContext.handleKeyDown(event);
      }
    },
    [focusRef, menuContext, onKeyDown, submenuContext]
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
    onClick:
      onClick || (isChildSearch.current ? updateFocusOnClick : undefined),
    icon,
    selected,
    variant,
    onKeyDown: !inFullscreenView ? handleKeyDown : undefined,
    ref,
  };

  const clonedChildren = isChildSearch.current
    ? childrenItems.map((child) =>
        React.cloneElement(child, { inputRef: childRef })
      )
    : children;

  const getTitle = (title) =>
    maxWidth && typeof title === "string" ? title : "";

  if (submenu) {
    const asPassiveItem = !(onClick || href);

    return (
      <StyledMenuItem
        data-component="menu-item"
        menuType={menuContext.menuType}
        display="inline-block"
        title={getTitle(submenu)}
        maxWidth={maxWidth}
        onClick={updateFocusOnClick}
        {...rest}
        inFullscreenView={inFullscreenView}
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
          {childrenItems}
        </Submenu>
      </StyledMenuItem>
    );
  }

  return (
    <StyledMenuItem
      data-component="menu-item"
      menuType={menuContext.menuType}
      inSubmenu={submenuContext.handleKeyDown !== undefined}
      display="inline-block"
      title={getTitle(children)}
      maxWidth={maxWidth}
      {...rest}
      inFullscreenView={inFullscreenView && !Object.keys(submenuContext).length}
      menuOpen={menuOpen}
    >
      <StyledMenuItemWrapper
        as={isChildSearch.current ? "div" : Link}
        isSearch={isChildSearch.current}
        menuType={menuContext.menuType}
        {...elementProps}
        ariaLabel={ariaLabel}
        maxWidth={maxWidth}
        inFullscreenView={inFullscreenView}
      >
        {clonedChildren}
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
};

export default MenuItem;
