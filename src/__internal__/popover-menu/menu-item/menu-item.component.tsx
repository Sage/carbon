import React, { useContext, useRef, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  PopoverMenuContext,
  MenuHeadingContext,
  MenuItemContext,
  type PopoverMenuContextProps,
  type PopoverControlProps,
} from "../contexts";
import guid from "../../utils/helpers/guid";
import Icon from "../../../components/icon";
import { buttonMenuItemQuerySelector } from "../utils";

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

        & > button, & > a {
          background-color: transparent;
        }
        cursor: not-allowed;
      `
      : `
        cursor: pointer;

        ${
          $isButtonMenu
            ? `
              color: var(--popover-label-default);

              & > button:active,
              & > a:active {
                background-color: var(--popover-bg-active);
                color: var(--popover-label-active);
              }

              & > button:not(:active):hover,
              & > a:not(:active):hover {
                color: var(--popover-label-hover);
                background-color: var(--popover-bg-hover);
              }
            `
            : `
              color: var(--input-dropdown-label-alt);

              &:not(:active):hover {
                * {
                  color: var(--input-dropdown-label-hover);
                }
                background-color: var(--popover-bg-hover);
              }
            `
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
  /* istanbul ignore if */
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

  if (
    props.disabled ||
    props["aria-disabled"] === true ||
    props["aria-disabled"] === "true"
  ) {
    return true;
  }

  // Recurse so wrappers still work (e.g. ButtonNext inside another component)
  return React.Children.toArray(props.children).some(getChildDisabledState);
};

const focusFirstSubmenuItem = (
  submenuRef: React.RefObject<HTMLUListElement>,
) => {
  const firstSubmenuItem = submenuRef.current?.querySelector(
    buttonMenuItemQuerySelector(true),
  ) as HTMLElement | null;
  firstSubmenuItem?.focus();
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
  const hasDisabledChild = isButtonMenu && getChildDisabledState(children);
  const isDisabled = disabled || hasDisabledChild;
  const clonedSubmenuParentItem = useCallback(
    (submenuControlProps: SubmenuControlProps) =>
      cloneSubmenuParent(children, { ...submenuControlProps }),
    [children],
  );
  const submenuRef = useRef<HTMLUListElement | null>(null);
  const context = useContext(MenuHeadingContext);
  const headingId = context?.headingId;
  const itemId = useRef(id ?? `popover-menu-item-${guid()}`).current;

  const handleKeydown = useCallback(
    (ev: React.KeyboardEvent<HTMLLIElement>) => {
      /* istanbul ignore if */
      if (!hasSubmenu || !isButtonMenu) {
        return;
      }
      /* istanbul ignore else */
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        if (!submenuOpen) {
          onSubmenuOpen?.();
        } else {
          focusFirstSubmenuItem(submenuRef);
        }
        return;
      }
    },
    [hasSubmenu, isButtonMenu, onSubmenuOpen, submenuOpen],
  );

  useEffect(() => {
    if (!submenuOpen) return;

    focusFirstSubmenuItem(submenuRef);
  }, [submenuOpen]);

  const handleSubmenuClose = useCallback(
    (ev: React.KeyboardEvent<HTMLLIElement>) => {
      const { activeElement: focusedItem } = document;

      const isActiveInSubmenu =
        focusedItem?.parentElement?.getAttribute("data-component") ===
        "popover-submenu-item";

      if (ev.key === "ArrowLeft") {
        ev.preventDefault();

        /* istanbul ignore else */
        if (isActiveInSubmenu) {
          focusSubmenuParent?.();
          onSubmenuCloseContext?.();

          return;
        }
      }
    },
    [focusSubmenuParent, onSubmenuCloseContext],
  );

  const handleSubmenuParentClick = useCallback(
    (ev: React.MouseEvent<HTMLLIElement>) => {
      onSubmenuOpen?.();
      onClick?.(ev);
    },
    [onSubmenuOpen, onClick],
  );

  if (isButtonMenu && hasSubmenu && renderSubmenu) {
    return renderSubmenu({
      open: !!submenuOpen,
      submenu,
      submenuWidth,
      size,
      onClose: () => onSubmenuClose?.(),
      ref: submenuRef,
      triggerRef: ref,
      control: (controlProps: PopoverControlProps) => {
        return (
          <StyledMenuItem
            ref={ref}
            id={itemId}
            data-component="popover-menu-item"
            className={`popover-menu-item${isDisabled ? "-disabled" : ""}`}
            $size={size}
            onClick={!isDisabled ? handleSubmenuParentClick : undefined}
            onMouseDown={!isDisabled ? (ev) => ev.preventDefault() : undefined}
            onKeyDown={!isDisabled ? handleKeydown : undefined}
            $disabled={isDisabled}
            $isButtonMenu={isButtonMenu}
          >
            {clonedSubmenuParentItem({
              ...controlProps,
              disabled: isDisabled,
            })}
          </StyledMenuItem>
        );
      },
    });
  }

  return (
    <StyledMenuItem
      ref={ref}
      id={itemId}
      data-component={`popover-${isSubmenu ? "submenu" : "menu"}-item`}
      className={`popover-menu-item${isDisabled ? "-disabled" : ""}`}
      $size={size}
      onClick={!isDisabled ? onClick : undefined}
      onMouseDown={!isDisabled ? (ev) => ev.preventDefault() : undefined}
      onKeyDown={handleSubmenuClose}
      role={isButtonMenu ? undefined : "option"}
      aria-selected={!isButtonMenu ? selected && !isDisabled : undefined}
      aria-disabled={!isButtonMenu ? isDisabled : undefined}
      $disabled={isDisabled}
      $isButtonMenu={isButtonMenu}
      {...rest}
      aria-describedby={headingId}
    >
      <MenuItemContext.Provider value={{ isDisabled: !!isDisabled }}>
        {children}
      </MenuItemContext.Provider>
    </StyledMenuItem>
  );
};

MenuItem.displayName = "PopoverMenuItem";

export default MenuItem;
