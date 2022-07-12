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
import Search from "../../search";
import ScrollableBlock from "../__internal__/scrollable-block";

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
  scrollable,
  scrollHeight,
  scrollVariant = variant,
  ...rest
}) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const ref = useRef(null);
  const focusFromMenu = menuContext.isFocused;
  const focusFromSubmenu = submenuContext.isFocused;
  const submenuHandleKeyDown = submenuContext.handleKeyDown;
  const { menuType } = menuContext;
  const childRef = useRef();
  const { inFullscreenView } = menuContext;

  const isChildSearch = useMemo(
    () =>
      !!React.Children.toArray(children).find(
        (child) => child?.type === Search
      ),
    [children]
  );

  const focusRef = isChildSearch ? childRef : ref;

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

      if (submenuHandleKeyDown !== undefined) {
        if (
          !(
            isChildSearch &&
            document.activeElement === focusRef.current &&
            focusRef.current?.value
          )
        ) {
          submenuHandleKeyDown(event);
        }
      } else {
        menuContext.handleKeyDown(event);
      }
    },
    [focusRef, menuContext, onKeyDown, submenuHandleKeyDown, isChildSearch]
  );

  const classes = useMemo(
    () =>
      classNames({
        "carbon-menu-item--has-link": href || onClick,
      }),
    [href, onClick]
  );

  const elementProps = useMemo(
    () => ({
      className: classes,
      href,
      target,
      onClick: onClick || (isChildSearch ? updateFocusOnClick : undefined),
      icon,
      selected,
      variant,
      onKeyDown: !inFullscreenView ? handleKeyDown : undefined,
      ref,
    }),
    [
      classes,
      handleKeyDown,
      href,
      icon,
      inFullscreenView,
      onClick,
      selected,
      target,
      updateFocusOnClick,
      variant,
      isChildSearch,
    ]
  );

  const clonedChildren = useMemo(
    () =>
      isChildSearch
        ? React.Children.map(children, (child) =>
            React.cloneElement(child, { inputRef: childRef })
          )
        : children,
    [children, isChildSearch]
  );

  const getTitle = (title) =>
    maxWidth && typeof title === "string" ? title : "";

  const itemMaxWidth = !inFullscreenView ? maxWidth : undefined;

  const renderMenuItems = useCallback(
    (childItems) => (
      <StyledMenuItemWrapper
        as={isChildSearch ? "div" : Link}
        isSearch={isChildSearch}
        menuType={menuType}
        {...elementProps}
        ariaLabel={ariaLabel}
        maxWidth={maxWidth}
        inFullscreenView={inFullscreenView}
      >
        {childItems}
      </StyledMenuItemWrapper>
    ),
    [
      ariaLabel,
      elementProps,
      inFullscreenView,
      maxWidth,
      menuType,
      isChildSearch,
    ]
  );

  const childItems = useMemo(() => {
    if (scrollable) {
      const menuItemChildren = React.Children.toArray(clonedChildren).filter(
        (child) => child.type === MenuItem
      );
      const nonMenuItemChildren = React.Children.toArray(clonedChildren).filter(
        (child) => child.type !== MenuItem
      );

      return (
        <>
          {renderMenuItems(nonMenuItemChildren)}
          <ScrollableBlock height={scrollHeight} variant={scrollVariant}>
            {menuItemChildren}
          </ScrollableBlock>
        </>
      );
    }
    return renderMenuItems(clonedChildren);
  }, [
    clonedChildren,
    scrollable,
    scrollHeight,
    scrollVariant,
    renderMenuItems,
  ]);

  if (submenu) {
    const asPassiveItem = !(onClick || href);

    const submenuContents = scrollable ? (
      <ScrollableBlock height={scrollHeight} variant={scrollVariant}>
        {children}
      </ScrollableBlock>
    ) : (
      children
    );

    return (
      <StyledMenuItem
        data-component="menu-item"
        menuType={menuContext.menuType}
        display="inline-block"
        title={getTitle(submenu)}
        maxWidth={itemMaxWidth}
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
          scrollable={scrollable}
          {...elementProps}
          {...rest}
        >
          {submenuContents}
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
      maxWidth={itemMaxWidth}
      {...rest}
      inFullscreenView={inFullscreenView && !Object.keys(submenuContext).length}
      menuOpen={menuOpen}
    >
      {childItems}
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
  /** If set, renders any child MenuItems inside a scrollable sublist */
  scrollable: PropTypes.bool,
  /** Styled system height prop for scrollable sublist */
  scrollHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** set the colour variant for the scrollable sublist. Defaults to the variant of the MenuItem itself */
  scrollVariant: PropTypes.oneOf(["default", "alternate"]),
};

export default MenuItem;
