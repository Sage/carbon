import styled, { css } from "styled-components";

import { padding, layout, flexbox, MaxWidthProps } from "styled-system";

import menuConfigVariants from "../menu.config";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../style/utils/add-focus-styling";

import { VariantType } from "./menu-item.component";

export interface StyledMenuItemProps {
  $maxWidth?: MaxWidthProps["maxWidth"];
  $inFullscreenView?: boolean;
  $inSubmenu?: boolean;
  $removeHeight?: boolean;
}

export const StyledMenuItem = styled.li.attrs(
  applyBaseTheme,
)<StyledMenuItemProps>`
  display: flex;
  list-style: none;
  align-items: stretch;
  min-height: var(--global-size-m);

  ${layout}
  ${flexbox}

  ${({ $inSubmenu, $removeHeight, $inFullscreenView, $maxWidth }) => css`
    ${$inSubmenu &&
    css`
      display: list-item;

      ${$inFullscreenView &&
      css`
        width: 100%;
      `}
    `}

    ${$removeHeight &&
    css`
      min-height: 0;
    `}

    ${$maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}
  `}
`;

// override styles of popover open button inside a menu-item
const popoverOpenButtonOverrides = css`
  padding: 0;

  .popover-open-component {
    [data-component="button"] {
      background-color: inherit;
      color: inherit;
      border-radius: inherit;
      border: none;
      padding: var(--global-space-comp-xs) var(--global-space-comp-l);

      &:focus {
        ${addFocusStyling(true)}
      }
    }

    [data-popover-container-button="true"] {
      background-color: var(--colorsActionMajor500);

      &:focus {
        background-color: var(--colorsActionMajor500);
      }
    }
  }
`;

export interface StyledMenuItemWrapperProps {
  $menuVariant: "white" | "black";
  $selected?: boolean;
  $hasSubmenu?: boolean;
  $isOpen?: boolean;
  $inFullscreenView?: boolean;
  $asPassiveItem?: boolean;
  $asDiv?: boolean;
  $menuItemVariant?: VariantType;
  $inSubmenu?: boolean;
  $submenuMaxWidth?: string;
  $maxWidth?: MaxWidthProps["maxWidth"];
}

export const StyledMenuItemWrapper = styled.a.attrs(
  applyBaseTheme,
)<StyledMenuItemWrapperProps>`
  ${({
    $menuVariant,
    $selected,
    $hasSubmenu,
    $isOpen,
    $menuItemVariant,
    $maxWidth,
    $inFullscreenView,
    $asPassiveItem,
    $asDiv,
    $inSubmenu,
    $submenuMaxWidth,
  }) => css`
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: var(--global-size-m);

    text-decoration: none;
    text-align: left;
    font: var(--global-font-static-comp-medium-m);

    padding: var(--global-space-comp-xs) var(--global-space-comp-l);
    background-color: ${menuConfigVariants[$menuVariant].background};
    color: ${menuConfigVariants[$menuVariant].color};
    border: none;

    ${padding}

    ${$maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}

    ${$inFullscreenView &&
    css`
      width: 100%;
      font: var(--global-font-static-comp-medium-l);

      ${$hasSubmenu &&
      css`
        color: ${menuConfigVariants[$menuVariant].title};
      `}
    `}

    ${!$asPassiveItem &&
    !$asDiv &&
    css`
      &:hover {
        background-color: ${menuConfigVariants[$menuVariant].backgroundHover};
        color: ${menuConfigVariants[$menuVariant].colorHover};
      }

      &:focus {
        ${addFocusStyling(true)}
      }

      &:active {
        background-color: ${menuConfigVariants[$menuVariant].backgroundActive};
        color: ${menuConfigVariants[$menuVariant].colorActive};
      }
    `}


    ${$selected &&
    css`
      &::before {
        content: "";
        position: absolute;
        width: var(--global-size-xs);
        height: var(--global-size-6-xs);
        background-color: var(--nav-primary-bg-selected);

        ${!$inFullscreenView &&
        css`
          bottom: 0px;
          left: 50%;
          transform: translate(-50%, 0%);
          width: var(--global-size-xs);
          height: var(--global-size-6-xs);
        `}

        ${$inFullscreenView &&
        css`
          left: 0px;
          top: 50%;
          transform: translate(0%, -50%);
          height: var(--global-size-xs);
          width: var(--global-size-6-xs);
        `}
      }
    `}

    ${!$inFullscreenView &&
    css`
      ${$hasSubmenu &&
      css`
        ${$isOpen &&
        css`
          // render above submenu popover to prevent submenu box-shadow and border from being above item
          z-index: 6001;
          background-color: ${menuConfigVariants[$menuVariant]
            .submenuOpenedBackground};
          ${$menuVariant === "white" &&
          css`
            box-shadow:
              inset 1px 0 0 var(--nav-tertiary-border-default),
              inset -1px 0 0 var(--nav-tertiary-border-default);
          `}
        `}
      `}

      ${$inSubmenu &&
      css`
        width: 100%;
        background-color: ${menuConfigVariants[$menuVariant]
          .submenuItemBackground};

        ${$menuItemVariant === "alternate" &&
        css`
          background-color: ${menuConfigVariants[$menuVariant].alternate};
        `}

        ${$submenuMaxWidth &&
        css`
          max-width: ${$submenuMaxWidth};
        `}
      `}
    `}

    :has([data-component='popover-container']) {
      ${popoverOpenButtonOverrides}
    }
  `}
`;

interface StyledMenuItemContentProps {
  $hasMaxWidth?: boolean;
}

export const StyledMenuItemContent = styled.span<StyledMenuItemContentProps>`
  ${({ $hasMaxWidth }) => css`
    display: flex;
    align-items: center;
    gap: var(--global-space-comp-s);
    width: 100%;
    height: 100%;

    ${$hasMaxWidth &&
    css`
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      vertical-align: middle;
    `}

    .search {
      width: 100%;
    }
  `}
`;

export default StyledMenuItemWrapper;
