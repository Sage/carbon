import React, { useContext, useRef, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  PopoverMenuContext,
  type PopoverMenuContextProps,
  MenuHeadingContext,
  type PopoverControlProps,
} from "../contexts";
import guid from "../../utils/helpers/guid";
import Icon from "../../../components/icon";

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  submenu?: React.ReactNode;
  submenuWidth?: string;
  submenuOpen?: boolean;
  onSubmenuOpen?: () => void;
  onSubmenuClose?: () => void;
}

interface StyledMenuItemProps {
  $size?: PopoverMenuContextProps["size"];
  $disabled?: boolean;
  $isButtonMenu?: boolean;
}

interface SubmenuControlProps extends PopoverControlProps {
  disabled?: boolean;
}

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  width: 100%;
  position: relative;
  box-sizing: border-box;

  &:not(:has(button)):not(:has(a)) {
    ${({ $disabled }) =>
      $disabled
        ? `
          * {
          color: var(--input-dropdown-label-disabled);
          }
          cursor: not-allowed;
        `
        : `
          color: var(--input-dropdown-label-alt);
          cursor: pointer;

          :hover {
            * {
              color: var(--input-dropdown-label-hover);
            }
            background-color: var(--input-dropdown-bg-hover);
          }
      `}
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: var(--global-space-comp-xs);

    &:not(:has(.menu-item-leading)) {
      grid-template-columns: 1fr;
    }
  }

  ${({ $disabled, $isButtonMenu }) =>
    $disabled
      ? `
        * {
          color: var(--input-dropdown-label-disabled);
        }
        cursor: not-allowed;
      `
      : `
        color: ${$isButtonMenu ? "var(--popover-label-default)" : "var(--input-dropdown-label-alt)"};
        cursor: pointer;

      
        &:not(:active):hover {
          * {
            color: var(--${$isButtonMenu ? "popover" : "input-dropdown"}-label-hover);
          }
          background-color: var(--popover-bg-hover);
        }

        ${
          $isButtonMenu
            ? `
          &:active {
            background-color: var(--popover-bg-active);
            button, a {
              color: var(--popover-label-active);
            }
          }
        `
            : ""
        }
  `}

  ${({ $isButtonMenu }) => css`
    ${$isButtonMenu
      ? `
        &:focus {
          outline: none;
        }
      `
      : `
        &[data-has-focus="true"] {
          outline: var(--focus-borderalt) solid var(--global-borderwidth-s);
          outline-offset: calc(var(--global-borderwidth-s) * -1);
        }
    `}
  `}

  ${({ $size, $isButtonMenu }) => css`
    ${$size === "small" &&
    `
      &:not(:has(button)):not(:has(a)) {
        padding: var(--global-space-comp-xs) 0;

        &:not(:has(.menu-item-subtext)) {
          min-height: var(--global-size-s);
        }
      }

      button, a {
        width: 100%;
        padding: var(--global-space-comp-xs) var(--global-space-comp-m) var(--global-space-comp-xs) var(--global-space-comp-m);
      }

      *:not(.menu-item-subtext):not(.menu-item-label-prefix) {
        font: var(--global-font-static-comp-${$isButtonMenu ? "medium" : "regular"}-s);
      }
    `}

    ${$size === "medium" &&
    `
      &:not(:has(button)):not(:has(a)) {
        padding: var(--global-space-comp-s) 0;

        &:not(:has(.menu-item-subtext)) {
          min-height: var(--global-size-m);
        }
      }

      button, a {
        width: 100%;
        padding: var(--global-space-comp-s) var(--global-space-comp-m) var(--global-space-comp-s) var(--global-space-comp-m);
      }

      *:not(.menu-item-subtext):not(.menu-item-label-prefix) {
        font: var(--global-font-static-comp-${$isButtonMenu ? "medium" : "regular"}-m);
      }
    `}
  
    ${$size === "large" &&
    `
      &:not(:has(button)):not(:has(a)) {
        padding: var(--global-space-comp-m) 0;

        &:not(:has(.menu-item-subtext)) {
          min-height: var(--global-size-l);
        }
      }
      
      button, a {
        width: 100%;
        padding: var(--global-space-comp-m) var(--global-space-comp-m) var(--global-space-comp-m) var(--global-space-comp-m);
      }

      *:not(.menu-item-subtext):not(.menu-item-label-prefix) {
        font: var(--global-font-static-comp-${$isButtonMenu ? "medium" : "regular"}-l);
      }
    `}
  `}
`;

const SubmenuParentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--global-space-comp-xs);
`;

const cloneSubmenuParent = (
  children: React.ReactNode,
  submenuControlProps: SubmenuControlProps,
) => {
  if (!React.isValidElement(children) || React.Children.count(children) !== 1) {
    return children;
  }

  return React.cloneElement(children as React.ReactElement, {
    "data-element": "submenu-parent",
    children: (
      <SubmenuParentWrapper data-element="submenu-parent-wrapper">
        {(children as React.ReactElement).props.children}
        <Icon type="caret_right" data-element="submenu-icon" ml={3} />
      </SubmenuParentWrapper>
    ),
    ...submenuControlProps,
  });
};

const getChildDisabledState = (node: React.ReactNode): boolean => {
  if (!React.isValidElement(node)) return false;

  const props = node.props as {
    disabled?: boolean;
    "aria-disabled"?: boolean | "true" | "false";
    children?: React.ReactNode;
  };

  if (props.disabled) return true;
  if (props["aria-disabled"] === true || props["aria-disabled"] === "true") {
    return true;
  }

  // Recurse so wrappers still work (e.g. ButtonNext inside another component)
  return React.Children.toArray(props.children).some(getChildDisabledState);
};

const MenuItem = ({
  children,
  onClick,
  selected,
  disabled,
  submenu,
  submenuOpen,
  onSubmenuOpen,
  onSubmenuClose,
  submenuWidth,
  id,
  ...rest
}: MenuItemProps) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const {
    size,
    isButtonMenu,
    isSubmenu,
    onSubmenuCloseContext,
    focusSubmenuParent,
    renderSubmenu,
  } = useContext<PopoverMenuContextProps>(PopoverMenuContext);
  const hasSubmenu = !!submenu;
  const hasDisabledChild =
    isButtonMenu && hasSubmenu && getChildDisabledState(children);
  const isDisabled = disabled || hasDisabledChild;
  const clonedSubmenuParentItem = useCallback(
    (submenuControlProps: SubmenuControlProps) =>
      cloneSubmenuParent(children, { ...submenuControlProps, disabled }),
    [children, disabled],
  );
  const submenuRef = useRef<HTMLUListElement | null>(null);
  const context = useContext(MenuHeadingContext);
  const headingId = context?.headingId;
  const itemId = useRef(id ?? `popover-menu-item-${guid()}`).current;

  const handleKeydown = useCallback(
    (ev: React.KeyboardEvent<HTMLLIElement>) => {
      if (isDisabled || (!hasSubmenu && !isButtonMenu)) {
        return;
      }

      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();

        if (isButtonMenu && hasSubmenu && !submenuOpen) {
          onSubmenuOpen?.();

          return;
        }

        (ref.current?.querySelector("button") as HTMLElement)?.click();
      }

      if (ev.key === "ArrowRight") {
        ev.preventDefault();

        if (submenuOpen) {
          const firstSubmenuItem = submenuRef.current?.querySelector(
            `li[data-component='popover-submenu-item']:not([aria-disabled='true']) button, a`,
          ) as HTMLElement | null;
          firstSubmenuItem?.focus();

          return;
        }
        onSubmenuOpen?.();

        return;
      }

      if (ev.key === "Tab") {
        ev.preventDefault();

        if (
          !ev.shiftKey &&
          submenuOpen &&
          ev.key === "Tab" &&
          isButtonMenu &&
          hasSubmenu
        ) {
          const firstSubmenuItem = submenuRef.current?.querySelector(
            `li[data-component='popover-submenu-item']:not([aria-disabled='true']) button, a`,
          ) as HTMLElement | null;
          firstSubmenuItem?.focus();

          return;
        }
      }
    },
    [isDisabled, hasSubmenu, isButtonMenu, onSubmenuOpen, submenuOpen],
  );

  useEffect(() => {
    if (!submenuOpen) return;

    const firstSubmenuItem = submenuRef.current?.querySelector(
      `li[data-component='popover-submenu-item']:not([aria-disabled='true']) button, a`,
    ) as HTMLElement | null;
    firstSubmenuItem?.focus();
  }, [submenuOpen]);

  const handleSubmenuClose = useCallback(
    (ev: React.KeyboardEvent<HTMLLIElement>) => {
      const { activeElement: focusedItem } = document;

      const isActiveInSubmenu =
        focusedItem?.parentElement?.getAttribute("data-component") ===
        "popover-submenu-item";

      if (ev.key === "ArrowLeft") {
        ev.preventDefault();

        if (isActiveInSubmenu) {
          focusSubmenuParent?.();
          onSubmenuCloseContext?.();

          return;
        }
      }

      if (ev.key === "Tab" && ev.shiftKey && isSubmenu && isActiveInSubmenu) {
        ev.preventDefault();
        focusSubmenuParent?.();

        return;
      }
    },
    [focusSubmenuParent, onSubmenuCloseContext, isSubmenu],
  );

  const handleFocusSubmenuParent = useCallback(() => {
    if (!hasSubmenu && !isButtonMenu) {
      return;
    }

    (ref.current?.querySelector("button, a") as HTMLElement)?.focus();
  }, [hasSubmenu, isButtonMenu]);

  if (isButtonMenu && hasSubmenu && renderSubmenu) {
    return renderSubmenu({
      open: !!submenuOpen,
      submenu,
      submenuWidth,
      size,
      onOpen: () => onSubmenuOpen?.(),
      onClose: () => onSubmenuClose?.(),
      focusSubmenuParent: handleFocusSubmenuParent,
      ref: submenuRef,
      triggerRef: ref,
      control: (controlProps: PopoverControlProps) => {
        return (
          <StyledMenuItem
            ref={ref}
            id={itemId}
            data-component="popover-menu-item"
            className={`popover-menu-item${disabled ? "-disabled" : ""}`}
            $size={size}
            onClick={!disabled ? onClick : undefined}
            onMouseDown={!disabled ? (ev) => ev.preventDefault() : undefined}
            onKeyDown={handleKeydown}
            role={isButtonMenu ? "menuitem" : "option"}
            aria-selected={selected && !disabled}
            aria-disabled={disabled}
            $disabled={disabled}
            $isButtonMenu={isButtonMenu}
          >
            {clonedSubmenuParentItem({ ...controlProps, disabled })}
          </StyledMenuItem>
        );
      },
    });
  }

  return (
    <StyledMenuItem
      ref={ref}
      id={itemId}
      tabIndex={!isDisabled && !isButtonMenu ? -1 : undefined}
      data-component={`popover-${isSubmenu ? "submenu" : "menu"}-item`}
      className={`popover-menu-item${isDisabled ? "-disabled" : ""}`}
      $size={size}
      onClick={!isDisabled ? onClick : undefined}
      onMouseDown={!isDisabled ? (ev) => ev.preventDefault() : undefined}
      onKeyDown={handleSubmenuClose}
      role={isButtonMenu ? "menuitem" : "option"}
      aria-selected={selected && !isDisabled}
      aria-disabled={isDisabled}
      $disabled={isDisabled}
      $isButtonMenu={isButtonMenu}
      {...rest}
      aria-describedby={headingId}
    >
      {children}
    </StyledMenuItem>
  );
};

MenuItem.displayName = "PopoverMenuItem";

export default MenuItem;
