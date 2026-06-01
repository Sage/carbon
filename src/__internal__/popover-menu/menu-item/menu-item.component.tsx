import React, { useContext, useRef } from "react";
import styled, { css } from "styled-components";
import { PopoverMenuContext, PopoverMenuContextProps } from "../contexts";

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  selected?: boolean;
  disabled?: boolean;
}

interface StyledMenuItemProps {
  $size?: "small" | "medium" | "large";
  $disabled?: boolean;
}

const StyledMenuItem = styled.div<StyledMenuItemProps>`
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
            background-color: var(--popover-bg-hover);
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

  &:focus {
    outline: var(--focus-borderalt) solid var(--global-borderwidth-s);
    outline-offset: calc(var(--global-borderwidth-s) * -1);
  }

  ${({ $size }) => css`
    ${$size === "small" &&
    `
      padding: var(--global-space-comp-xs) 0;

      &:not(:has(.menu-item-subtext)) {
        min-height: var(--global-size-s);
      }
      
      *:not(.menu-item-subtext):not(.menu-item-label-prefix) {
        font: var(--global-font-static-comp-regular-s);
      }
    `}

    ${$size === "medium" &&
    `
      padding: var(--global-space-comp-s) 0;

      &:not(:has(.menu-item-subtext)) {
        min-height: var(--global-size-m);
      }

      *:not(.menu-item-subtext):not(.menu-item-label-prefix) {
        font: var(--global-font-static-comp-regular-m);
      }
    `}
  
    ${$size === "large" &&
    `
      padding: var(--global-space-comp-m) 0;

      &:not(:has(.menu-item-subtext)) {
        min-height: var(--global-size-l);
      }

      *:not(.menu-item-subtext):not(.menu-item-label-prefix) {
        font: var(--global-font-static-comp-regular-l);
      }
    `}
  `}
`;

const MenuItem = ({
  children,
  onClick,
  selected,
  disabled,
  ...rest
}: MenuItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { size } = useContext<PopoverMenuContextProps>(PopoverMenuContext);

  return (
    <StyledMenuItem
      ref={ref}
      tabIndex={!disabled ? -1 : undefined}
      data-component="popover-menu-item"
      className={`popover-menu-item${disabled ? "-disabled" : ""}`}
      $size={size}
      onClick={!disabled ? onClick : undefined}
      onMouseDown={!disabled ? (ev) => ev.preventDefault() : undefined}
      role="option"
      aria-selected={selected && !disabled}
      aria-disabled={disabled}
      $disabled={disabled}
      {...rest}
    >
      {children}
    </StyledMenuItem>
  );
};

MenuItem.displayName = "PopoverMenuItem";

export default MenuItem;
