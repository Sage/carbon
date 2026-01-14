import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  FlexboxProps,
  LayoutProps,
  MaxWidthProps,
  PaddingProps,
} from "styled-system";
import invariant from "invariant";

import { defaultFocusableSelectors as focusableSelectors } from "../../../__internal__/focus-trap/focus-trap-utils";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import StyledMenuItemWrapper from "./menu-item.style";
import Events from "../../../__internal__/utils/helpers/events";
import { useStrictMenuContext } from "../__internal__/strict-menu.context";
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
  extends TagProps,
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
  submenu?: React.ReactNode;
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
  /**
   * Sets the maximum width for the item's submenu when it is opened.
   * This prop is only applicable if the item has a submenu.
   * Overrides the maximum width of any items within the submenu.
   * Accepts any valid CSS width value (e.g. "200px", "50%").
   * */
  submenuMaxWidth?: string;
  /**
   * Sets a minimum width for the item's submenu when it is opened.
   * Accepts any valid CSS width value (e.g. "200px", "50%").
   * This prop is only applicable if the item has a submenu.
   * */
  submenuMinWidth?: string;
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

export type MenuItemHandle = {
  /** Programmatically focus the MenuItem. */
  focus: () => void;
} | null;

const MenuItem = forwardRef<MenuItemHandle, MenuWithChildren | MenuWithIcon>(
  (
    {
      submenu,
      submenuMaxWidth,
      submenuMinWidth,
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
    },
    forwardedRef,
  ) => {
    invariant(
      icon || children,
      "Either prop `icon` must be defined or this node must have `children`.",
    );

    invariant(
      children ||
        ariaLabel ||
        submenu ||
        (typeof submenu === "string" && submenu.length),
      "If no text or node is provided via the `submenu` prop, an `ariaLabel` should be given to facilitate accessibility.",
    );

    invariant(
      typeof submenu === "boolean" ||
        submenu === undefined ||
        React.isValidElement(submenu) ||
        (children && typeof submenu === "string" && submenu.length),
      "You should not pass `children` when `submenu` is an empty string",
    );

    const menuItemId = useRef(guid());

    const { isChildOfSegment, overriddenVariant } =
      useContext<MenuSegmentContextProps>(MenuSegmentContext);

    const {
      inFullscreenView,
      registerItem,
      unregisterItem,
      focusId,
      updateFocusId,
      menuType,
    } = useStrictMenuContext();

    const submenuContext = useContext<SubmenuContextProps>(SubmenuContext);
    const isInSubmenu = Object.keys(submenuContext).length > 0;
    const {
      submenuFocusId,
      updateFocusId: updateSubmenuFocusId,
      handleKeyDown: handleSubmenuKeyDown,
      submenuHasMaxWidth,
    } = submenuContext;

    const focusFromMenu = focusId === menuItemId.current;
    const focusFromSubmenu = submenuFocusId
      ? submenuFocusId === menuItemId.current
      : undefined;

    const [ref, setRef] = useState<HTMLAnchorElement | null>(null);
    const [firstFocusableChild, setFirstFocusableChild] =
      useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
      const firstFocusable =
        ref?.querySelector<HTMLElement>(focusableSelectors) ?? null;
      if (firstFocusable !== firstFocusableChild) {
        setFirstFocusableChild(firstFocusable);
      }
    }, [firstFocusableChild, ref]);

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
      if ((focusFromMenu && !focusFromSubmenu) || focusFromSubmenu) {
        if (firstFocusableChild) {
          firstFocusableChild.focus();
          return;
        }

        ref?.focus();
      }
    }, [firstFocusableChild, focusFromMenu, focusFromSubmenu, ref]);

    useImperativeHandle<MenuItemHandle, MenuItemHandle>(
      forwardedRef,
      () => ({
        focus() {
          ref?.focus();
        },
      }),
      [ref],
    );

    const handleFocus = (
      event: React.FocusEvent<HTMLDivElement | HTMLLIElement>,
    ) => {
      if (isInSubmenu) {
        event.stopPropagation();
        updateSubmenuFocusId?.(menuItemId.current);
      } else {
        updateFocusId?.(menuItemId.current);
      }
    };

    const handleKeyDown = (
      event:
        | React.KeyboardEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      onKeyDown?.(event);

      if (Events.isEscKey(event)) {
        ref?.focus();
      }

      handleSubmenuKeyDown?.(event);
    };

    const elementProps = {
      className: href || onClick ? "carbon-menu-item--has-link" : "",
      href: firstFocusableChild ? undefined : href,
      onClick: firstFocusableChild ? undefined : onClick,
      target,
      rel,
      icon,
      removeAriaLabelOnIcon: true,
      selected,
      onKeyDown: !inFullscreenView ? handleKeyDown : undefined,
      overrideColor,
      ref: setRef,
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
    const asPassiveItem = !(onClick || href || firstFocusableChild);

    if (submenu) {
      return (
        <StyledMenuItem
          data-component="menu-item"
          data-element={dataElement}
          data-role={dataRole}
          menuType={menuType}
          title={getTitle(submenu)}
          maxWidth={itemMaxWidth}
          {...rest}
          inFullscreenView={inFullscreenView}
          id={menuItemId.current}
          as={as}
          onFocus={handleFocus}
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
            submenuMinWidth={submenuMinWidth}
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
    const hasInput = !!ref?.querySelector<HTMLElement>(
      "[data-element='input']",
    );

    return (
      <StyledMenuItem
        data-component="menu-item"
        data-element={dataElement}
        data-role={dataRole}
        menuType={menuType}
        inSubmenu={isInSubmenu}
        title={getTitle(children)}
        maxWidth={itemMaxWidth}
        {...rest}
        inFullscreenView={
          inFullscreenView && !Object.keys(submenuContext).length
        }
        id={menuItemId.current}
        as={as}
        onFocus={handleFocus}
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
          {...paddingProps}
          asDiv={hasInput || as === "div"}
          hasFocusableChild={!!firstFocusableChild}
          hasInput={hasInput}
          inSubmenu={isInSubmenu}
        >
          {children}
        </StyledMenuItemWrapper>
      </StyledMenuItem>
    );
  },
);

export default MenuItem;
