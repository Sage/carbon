import React, { useRef, useEffect, useCallback, useContext } from "react";
import {
  FlexboxProps,
  LayoutProps,
  MaxWidthProps,
  PaddingProps,
} from "styled-system";
import invariant from "invariant";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import StyledMenuItemWrapper from "./menu-item.style";
import Events from "../../../__internal__/utils/helpers/events";
import MenuContext, { MenuContextProps } from "../menu.context";
import Submenu from "../__internal__/submenu/submenu.component";
import SubmenuContext, {
  SubmenuContextProps,
} from "../__internal__/submenu/submenu.context";
import { StyledMenuItem } from "../menu.style";
import guid from "../../../__internal__/utils/helpers/guid";
import { IconType } from "../../icon";

export type VariantType = "default" | "alternate";

interface MenuItemBaseProps extends LayoutProps, FlexboxProps, PaddingProps {
  /** Custom className */
  className?: string;
  /** onClick handler */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection?: string;
  /** Is the menu item the currently selected item. */
  selected?: boolean;
  /** A title for the menu item that has a submenu. */
  submenu?: string | boolean;
  /** The href to use for the menu item. */
  href?: string;
  /** onKeyDown handler */
  onKeyDown?: (
    event:
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /** The target to use for the menu item. */
  target?: string;
  /** The rel attribute to be used for the underlying <a> tag */
  rel?: string;
  /** set the colour variant for a menuType */
  variant?: VariantType;
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow?: boolean;
  /** If no text is provided an ariaLabel should be given to facilitate accessibility. */
  ariaLabel?: string;
  /** Callback triggered when submenu opens. Only valid with submenu prop */
  onSubmenuOpen?: () => void;
  /** Callback triggered when submenu closes. Only valid with submenu prop */
  onSubmenuClose?: () => void;
  /** 
    @ignore @private
    private prop, used inside ScrollableBlock to ensure the MenuItem's color variant overrides the CSS
    for other MenuItems inside the block
   */
  overrideColor?: boolean;
  /** @private @ignore */
  "data-component"?: string;
  /** When set the submenu opens by click instead of hover */
  clickToOpen?: boolean;
  maxWidth?: MaxWidthProps["maxWidth"];
  /**
   * @private @ignore
   * Renders MenuItem as a div element
   * */
  as?: "div";
}

export interface MenuWithChildren extends MenuItemBaseProps {
  children?: React.ReactNode;
  /** Either prop `icon` must be defined or this node must have children. */
  icon?: IconType;
}

export interface MenuWithIcon extends MenuItemBaseProps {
  /** Either prop `icon` must be defined or this node must have children. */
  icon: IconType;
  children?: React.ReactNode;
}

export const MenuItem = ({
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
  onSubmenuOpen,
  onSubmenuClose,
  overrideColor,
  rel,
  as,
  ...rest
}: MenuWithChildren | MenuWithIcon) => {
  invariant(
    icon || children,
    "Either prop `icon` must be defined or this node must have `children`."
  );

  invariant(
    children || ariaLabel || typeof submenu === "string",
    "If no text is provided an `ariaLabel` should be given to facilitate accessibility."
  );

  const {
    inFullscreenView,
    registerItem,
    unregisterItem,
    focusId,
    menuType,
    openSubmenuId,
  } = useContext<MenuContextProps>(MenuContext);
  const menuItemId = useRef(guid());
  const submenuContext = useContext<SubmenuContextProps>(SubmenuContext);
  const {
    registerItem: registerSubmenuItem,
    unregisterItem: unregisterSubmenuItem,
    submenuFocusId,
    updateFocusId: updateSubmenuFocusId,
    handleKeyDown: handleSubmenuKeyDown,
    shiftTabPressed,
  } = submenuContext;
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement & HTMLDivElement>(
    null
  );
  const focusFromMenu = focusId === menuItemId.current;
  const focusFromSubmenu = submenuFocusId
    ? submenuFocusId === menuItemId.current
    : undefined;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputIcon = useRef<HTMLSpanElement | null>(null);
  inputIcon.current = ref.current
    ? ref.current.querySelector("[data-element='input-icon-toggle']")
    : null;
  inputRef.current = ref.current
    ? ref.current.querySelector("[data-element='input']")
    : null;
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
      /* istanbul ignore else */
      if (focusRef.current) {
        (focusRef.current as HTMLElement)?.focus();
      }
    } else if (
      focusFromSubmenu &&
      !(shiftTabPressed && inputIcon.current?.getAttribute("tabindex") === "0")
    ) {
      /* istanbul ignore else */
      if (focusRef.current) {
        (focusRef.current as HTMLElement)?.focus();
      }
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

      if (ref.current && Events.isEscKey(event)) {
        (ref.current as HTMLElement)?.focus();
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

  const elementProps = {
    className: href || onClick ? "carbon-menu-item--has-link" : "",
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

  const getTitle = (title: React.ReactNode) =>
    maxWidth && typeof title === "string" ? title : undefined;

  const itemMaxWidth = !inFullscreenView ? maxWidth : undefined;
  const asPassiveItem = !(onClick || href);
  const hasInput = !!inputRef.current;

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
        as={as}
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

  const paddingProps = filterStyledSystemPaddingProps(rest);

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
      id={menuItemId.current}
      onClick={updateFocusOnClick}
      as={as}
    >
      <StyledMenuItemWrapper
        menuType={menuType}
        {...elementProps}
        ariaLabel={ariaLabel}
        maxWidth={maxWidth}
        inFullscreenView={inFullscreenView}
        asPassiveItem={asPassiveItem}
        placeholderTabIndex={asPassiveItem}
        {...paddingProps}
        asDiv={hasInput || as === "div"}
        hasInput={hasInput}
      >
        {children}
      </StyledMenuItemWrapper>
    </StyledMenuItem>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
