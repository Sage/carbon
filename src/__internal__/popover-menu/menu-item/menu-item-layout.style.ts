import { css } from "styled-components";
import type { PopoverMenuContextProps } from "../contexts";

export interface MenuItemLayoutProps {
  $size?: PopoverMenuContextProps["size"];
  $isButtonMenu?: boolean;
}

export const menuItemLayout = css<MenuItemLayoutProps>`
  width: 100%;
  position: relative;
  box-sizing: border-box;
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
