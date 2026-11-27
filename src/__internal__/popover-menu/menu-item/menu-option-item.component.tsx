import React, { useContext, useRef } from "react";
import styled, { css } from "styled-components";
import {
  MenuHeadingContext,
  MenuItemContext,
  PopoverMenuContext,
} from "../contexts";
import useIdPolyfill from "../../../hooks/__internal__/useIdPolyfill";
import combineRefs from "../../utils/helpers/combine-refs";
import {
  menuItemLayout,
  type MenuItemLayoutProps,
} from "./menu-item-layout.style";

export interface MenuOptionItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "children" | "onClick"> {
  children: React.ReactNode;
  /** @internal Callback used to measure virtualized menu items. */
  measureElement?: React.RefCallback<HTMLLIElement>;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  selected?: boolean;
  disabled?: boolean;
}

const StyledMenuOptionItem = styled.li<
  MenuItemLayoutProps & { $disabled?: boolean }
>`
  ${menuItemLayout}

  &:not(:has(button)):not(:has(a)) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: var(--global-space-comp-xs);

    &:not(:has(.menu-item-leading)) {
      grid-template-columns: 1fr;
    }
  }

  &[data-has-focus="true"] {
    outline: var(--focus-borderalt) solid var(--global-borderwidth-s);
    outline-offset: calc(var(--global-borderwidth-s) * -1);
  }

  ${({ $disabled }) =>
    $disabled
      ? css`
          * {
            color: var(--input-dropdown-label-disabled);
          }
          & > button,
          & > a {
            background-color: transparent;
          }
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
        `}
`;

/** Shared listbox option behaviour; button menus and submenus live in MenuItem. */
export const MenuOptionItemBase = ({
  children,
  className,
  id,
  measureElement,
  selected,
  disabled,
  onClick,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: MenuOptionItemProps) => {
  const { size, isSubmenu } = useContext(PopoverMenuContext);
  const { headingId } = useContext(MenuHeadingContext) ?? {};
  const generatedItemId = useIdPolyfill();
  const itemId = id ?? `popover-menu-item-${generatedItemId}`;
  const ref = useRef<HTMLLIElement | null>(null);
  const describedBy = [ariaDescribedBy, headingId].filter(Boolean).join(" ");

  return (
    <StyledMenuOptionItem
      ref={combineRefs(ref, measureElement)}
      id={itemId}
      data-component={`popover-${isSubmenu ? "submenu" : "menu"}-item`}
      className={[`popover-menu-item${disabled ? "-disabled" : ""}`, className]
        .filter(Boolean)
        .join(" ")}
      $size={size}
      $disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseDown={disabled ? undefined : (event) => event.preventDefault()}
      role="option"
      aria-selected={selected && !disabled}
      aria-disabled={disabled}
      {...rest}
      aria-describedby={describedBy || undefined}
    >
      <MenuItemContext.Provider value={{ isDisabled: !!disabled }}>
        {children}
      </MenuItemContext.Provider>
    </StyledMenuOptionItem>
  );
};

const MenuOptionItem = styled(MenuOptionItemBase)`
  &:not([aria-disabled="true"]) {
    color: var(--input-dropdown-label-alt);

    &:not(:active):hover {
      * {
        color: var(--input-dropdown-label-hover);
      }
      background-color: var(--popover-bg-hover);
    }

    &:not(:has(button)):not(:has(a)):hover {
      * {
        color: var(--input-dropdown-label-hover);
      }
      background-color: var(--input-dropdown-bg-hover);
    }
  }
`;

export default MenuOptionItem;
