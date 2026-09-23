import styled, { css } from "styled-components";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import menuConfigVariants from "../../menu.config";

interface StyledSubmenuWrapperProps {
  $inFullscreenView?: boolean;
}

export const StyledSubmenuWrapper = styled.div.attrs(
  applyBaseTheme,
)<StyledSubmenuWrapperProps>`
  position: relative;
  width: fit-content;
  max-width: inherit;
  height: inherit;

  ${({ $inFullscreenView }) => css`
    ${$inFullscreenView &&
    css`
      width: 100%;
    `}
    ${!$inFullscreenView &&
    css`
      display: flex;
    `}
  `}
`;

interface StyledSubmenuProps {
  $submenuDirection?: string;
  $maxHeight?: string;
  $inFullscreenView?: boolean;
  $menuVariant: "white" | "black";
  $submenuMaxWidth?: string;
  $submenuMinWidth?: string;
}

export const StyledSubmenu = styled.ul.attrs(
  applyBaseTheme,
)<StyledSubmenuProps>`
  ${({
    $menuVariant,
    $submenuDirection,
    $inFullscreenView,
    $maxHeight,
    $submenuMaxWidth,
    $submenuMinWidth,
    theme,
  }) => css`
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: ${menuConfigVariants[$menuVariant].submenuItemBackground};

    ${!$inFullscreenView &&
    css`
      position: absolute;
      top: 100%;
      z-index: ${theme.zIndex.popover};
      box-shadow: var(--global-depth-lvl1);
      width: max-content;
      border-radius: 0 0 var(--global-radius-container-m)
        var(--global-radius-container-m);
      overflow-y: auto;

      ${$menuVariant === "white" &&
      css`
        margin-top: -1px;
        border: var(--global-borderwidth-xs) solid
          var(--nav-tertiary-border-default);
      `}

      ${$submenuMaxWidth &&
      css`
        max-width: ${$submenuMaxWidth};
      `}

      ${$submenuMinWidth &&
      css`
        min-width: ${$submenuMinWidth};
      `}

      ${$submenuDirection === "left" &&
      css`
        right: 0;
      `}

      ${$maxHeight && `max-height: ${$maxHeight};`}

      [data-last-menu-item='true'] {
        border-bottom-left-radius: var(--global-radius-container-m);
        border-bottom-right-radius: var(--global-radius-container-m);
      }
    `}

    ${$inFullscreenView &&
    css`
      min-width: 100%;
    `}
  `}
`;
