import styled, { css } from "styled-components";
import computeSizing from "../../style/utils/element-sizing";

import { SidebarProps } from "./sidebar.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledIcon from "../icon/icon.style";

import { SIDEBAR_SIZES_CSS, smallScreenBreakpoint } from "./sidebar.config";
import Modal from "../../__internal__/modal";

type StyledSidebarProps = Pick<
  SidebarProps,
  "position" | "size" | "width" | "widthAnimation"
> & {
  $disableStickyOnSmallScreen?: boolean;
  $fullScreenOnSmallScreen?: boolean;
};

const StyledSidebar = styled.div.attrs(applyBaseTheme)<StyledSidebarProps>`
  // prevents outline being added in safari
  :focus {
    outline: none;
  }

  ${({
    position,
    size,
    theme,
    width,
    widthAnimation,
    $disableStickyOnSmallScreen,
    $fullScreenOnSmallScreen,
  }) => css`
    background: var(--container-standard-bg-default);
    border-radius: ${position === "left"
      ? "var(--global-radius-none) var(--global-radius-container-xl) var(--global-radius-container-xl) var(--global-radius-none)"
      : "var(--global-radius-container-xl) var(--global-radius-none) var(--global-radius-none) var(--global-radius-container-xl)"};
    bottom: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    z-index: ${theme.zIndex.fullScreenModal};
    max-width: 100vw;
    overflow: hidden;

    ${(!size || width) &&
    css`
      min-width: 288px;
    `}

    ${width
      ? computeSizing({ width })
      : css`
          width: ${size ? SIDEBAR_SIZES_CSS[size] : "30vw"};
        `}

    ${widthAnimation &&
    css`
      transition: width 0.3s ease;
    `}

    ${position &&
    css`
      box-shadow: var(--global-depth-lvl3);
      ${position}: 0;
    `}

    > [data-component="close"]:first-of-type {
      border-radius: var(--global-radius-action-circle);
      height: var(--global-size-s);
      min-width: var(--global-size-s);
      position: absolute;
      right: var(--global-space-comp-xl);
      top: var(--global-space-comp-xl);
      width: var(--global-size-s);
      z-index: 1;

      ${StyledIcon} {
        height: var(--global-size-2-xs);
        width: var(--global-size-2-xs);
      }
    }

    ${$fullScreenOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        border-radius: var(--global-radius-none);
        height: 100%;
        min-width: 100%;
        width: 100%;

        ${$disableStickyOnSmallScreen &&
        css`
          overflow-y: auto;
        `}
      }
    `}
  `}
`;

const StyledSidebarModal = styled(Modal)<{
  $fullScreenOnSmallScreen?: boolean;
}>`
  ${({ $fullScreenOnSmallScreen }) =>
    $fullScreenOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        [data-element="modal-background"] {
          display: none;
        }
      }
    `}
`;

export { StyledSidebar, StyledSidebarModal };
