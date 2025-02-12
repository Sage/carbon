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
import MenuContext, { MenuContextProps } from "../__internal__/menu.context";
import Submenu from "../__internal__/submenu/submenu.component";
import SubmenuContext, {
  SubmenuContextProps,
} from "../__internal__/submenu/submenu.context";
import MenuSegmentContext, {
  MenuSegmentContextProps,
} from "../menu-segment-title/menu-segment-title.context";
import { StyledMenuItem } from "../menu.style";
import guid from "../../../__internal__/utils/helpers/guid";
import { IconType } from "../../icon";
import { TagProps } from "../../../__internal__/utils/helpers/tags";

export type VariantType = "default" | "alternate";

interface MenuItemBaseProps
  extends Omit<TagProps, "data-component">,
    Pick<LayoutProps, "width" | "maxWidth" | "minWidth">,
    FlexboxProps,
    PaddingProps {
  /** onClick handler */
  onClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
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
      | React.KeyboardEvent<HTMLButtonElement>,
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
  /** When set the submenu opens by click instead of hover */
  clickToOpen?: boolean;
  /**
   * Sets the maxWidth of the MenuItem, setting this on a non-submenu
   * item will truncate any text/content that may overflow
   * */
  maxWidth?: MaxWidthProps["maxWidth"];
  /**
   * @private @ignore
   * Renders MenuItem as a div element
   * */
  as?: "div";
  /** Sets the max-width of the submenu container element, accepts any valid CSS string */
  submenuMaxWidth?: string;
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
  submenuMaxWidth,
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
  "data-element": dataElement,
  "data-role": dataRole,
  ...rest
}: MenuWithChildren | MenuWithIcon) => {
  invariant(
    icon || children,
    "Either prop `icon` must be defined or this node must have `children`.",
  );

  invariant(
    children || ariaLabel || typeof submenu === "string",
    "If no text is provided an `ariaLabel` should be given to facilitate accessibility.",
  );

  invariant(
    typeof submenu === "boolean" ||
      submenu === undefined ||
      (children && typeof submenu === "string" && submenu.length),
    "You should not pass `children` when `submenu` is an empty string",
  );

  const { isChildOfSegment, overriddenVariant } =
    useContext<MenuSegmentContextProps>(MenuSegmentContext);

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
    submenuFocusId,
    updateFocusId: updateSubmenuFocusId,
    handleKeyDown: handleSubmenuKeyDown,
    shiftTabPressed,
    submenuHasMaxWidth,
  } = submenuContext;
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement & HTMLDivElement>(
    null,
  );
  const focusFromMenu = focusId === menuItemId.current;
  const focusFromSubmenu = submenuFocusId
    ? submenuFocusId === menuItemId.current
    : undefined;
  const inputRef = useRef<HTMLInputElement | null>(null);
  inputRef.current = ref.current
    ? ref.current.querySelector("[data-element='input']")
    : null;
  const focusRef = inputRef.current ? inputRef : ref;

  useEffect(() => {
    const id = menuItemId.current;

    /* istanbul ignore else */
    if (registerItem) {
      registerItem(id);
    }

    return () => {
      /* istanbul ignore else */
      if (unregisterItem) {
        unregisterItem(id);
      }
    };
  }, [registerItem, unregisterItem]);

  useEffect(() => {
    const inputIcon = ref.current?.querySelector(
      "[data-element='input-icon-toggle']",
    );
    if (!openSubmenuId && focusFromSubmenu === undefined && focusFromMenu) {
      /* istanbul ignore else */
      if (focusRef.current) {
        (focusRef.current as HTMLElement)?.focus();
      }
    } else if (
      focusFromSubmenu &&
      !(shiftTabPressed && inputIcon?.getAttribute("tabindex") === "0")
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

      if (handleSubmenuKeyDown) {
        handleSubmenuKeyDown(event);
      }
    },
    [onKeyDown, handleSubmenuKeyDown],
  );

  const elementProps = {
    className: href || onClick ? "carbon-menu-item--has-link" : "",
    href,
    target,
    rel,
    onClick,
    icon,
    removeAriaLabelOnIcon: true,
    selected,
    onKeyDown: !inFullscreenView ? handleKeyDown : undefined,
    overrideColor,
    ref,
  };

  if (
    overriddenVariant === "alternate" &&
    isChildOfSegment &&
    variant === "alternate" &&
    ["white", "black"].includes(menuType)
  ) {
    elementProps.overrideColor = true;
  }

  const getTitle = (title: React.ReactNode) =>
    maxWidth && typeof title === "string" ? title : undefined;

  const itemMaxWidth = !inFullscreenView ? maxWidth : undefined;
  const asPassiveItem = !(onClick || href);
  const hasInput = !!inputRef.current;

  if (submenu) {
    return (
      <StyledMenuItem
        data-component="menu-item"
        data-element={dataElement}
        data-role={dataRole}
        menuType={menuType}
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
          submenuMaxWidth={submenuMaxWidth}
          {...elementProps}
          variant={variant}
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
      data-element={dataElement}
      data-role={dataRole}
      menuType={menuType}
      inSubmenu={!!handleSubmenuKeyDown}
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
        data-role="menu-item-wrapper"
        {...elementProps}
        menuItemVariant={variant}
        ariaLabel={ariaLabel}
        maxWidth={!submenuHasMaxWidth ? itemMaxWidth : undefined}
        inFullscreenView={inFullscreenView}
        asPassiveItem={asPassiveItem}
        placeholderTabIndex={asPassiveItem}
        {...paddingProps}
        asDiv={hasInput || as === "div"}
        hasInput={hasInput}
        inSubmenu={!!handleSubmenuKeyDown}
      >
        {children}
      </StyledMenuItemWrapper>
    </StyledMenuItem>
  );
};

export default MenuItem;
