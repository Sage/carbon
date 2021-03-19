import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StyledMenuItemWrapper from "./menu-item.style";
import OptionHelper from "../../../utils/helpers/options-helper";
import Link from "../../link";
import Box from "../../box";
import Events from "../../../utils/helpers/events";
import { MenuContext } from "../menu.component";
import Submenu from "../__internal__/submenu/submenu.component";
import SubmenuContext from "../__internal__/submenu/submenu.context";

import SubmenuBlock from "../submenu-block/submenu-block.component";
import { StyledMenuItem } from "../menu.style";
import Search from "../../../__experimental__/components/search";

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
  ...rest
}) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const ref = useRef(null);
  const focusFromMenu = menuContext.isFocused;
  const focusFromSubmenu = submenuContext.isFocused;
  const isChildrenSearch = children?.type === Search;
  const childrenItems = React.Children.map(children, (child) => {
    if (child && child.type === SubmenuBlock) {
      const childArray = Array.isArray(child.props.children)
        ? child.props.children
        : [child.props.children];

      return [...childArray.map((innerChild) => innerChild)];
    }

    return child;
  });

  useEffect(() => {
    if (focusFromSubmenu === undefined && focusFromMenu) {
      ref.current.focus();
    } else if (focusFromSubmenu) {
      ref.current.focus();
    }
  }, [focusFromMenu, focusFromSubmenu]);

  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (Events.isEscKey(event)) {
        ref.current.focus();
      }

      if (submenuContext.handleKeyDown !== undefined) {
        submenuContext.handleKeyDown(event);
      } else {
        menuContext.handleKeyDown(event);
      }
    },
    [menuContext, onKeyDown, ref, submenuContext]
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
    onClick,
    icon,
    selected,
    menuType: menuContext.menuType,
  };

  if (submenu) {
    return (
      <StyledMenuItem
        role="presentation"
        menuType={menuContext.menuType}
        display="inline-block"
        {...rest}
      >
        <Submenu
          {...rest}
          ref={ref}
          variant={variant}
          {...(typeof submenu !== "boolean" && { title: submenu })}
          icon={icon}
          submenuDirection={submenuDirection}
          onKeyDown={handleKeyDown}
          className={classes}
          showDropdownArrow={showDropdownArrow}
        >
          {childrenItems}
        </Submenu>
      </StyledMenuItem>
    );
  }

  return (
    <StyledMenuItem
      role="presentation"
      menuType={menuContext.menuType}
      inSubmenu={submenuContext.handleKeyDown !== undefined}
      display="inline-block"
      {...rest}
    >
      <StyledMenuItemWrapper
        ref={ref}
        onKeyDown={handleKeyDown}
        as={isChildrenSearch ? "div" : Link}
        data-component="menu-item"
        isSearch={isChildrenSearch}
        {...elementProps}
        variant={variant}
        role="menuitem"
        ariaLabel={ariaLabel}
      >
        {children}
      </StyledMenuItemWrapper>
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  ...Box.propTypes,
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
  /** Either prop `icon` must be defined or this node must have children. */
  icon: (props, propName, ...rest) => {
    if (!props.icon && !props.children) {
      return new Error(
        "Either prop `icon` must be defined or this node must have children."
      );
    }
    return PropTypes.oneOfType([
      PropTypes.oneOf(OptionHelper.icons),
      PropTypes.node,
    ])(props, propName, ...rest);
  },
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** Is the menu item the currently selected item. */
  selected: PropTypes.bool,
  /** A title for the menu item that has a submenu. */
  submenu: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
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
  /** Either a keyboard override or child text must be provided to facilitate keyboard navigation. */
  keyboardOverride: (props, propName, ...rest) => {
    if (props.icon && !props.children && !props.keyboardOverride) {
      return new Error(
        "Either a keyboard override or child text must be provided to facilitate keyboard navigation."
      );
    }
    return PropTypes.string(props, propName, ...rest);
  },
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
};

export default MenuItem;
