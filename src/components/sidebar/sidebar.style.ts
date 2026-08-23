import styled, { css } from "styled-components";
import { PaddingProps, padding as paddingFn } from "styled-system";
import computeSizing from "../../style/utils/element-sizing";

import { SidebarProps } from "./sidebar.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledIconButton from "../icon-button/icon-button.style";
import StyledIcon from "../icon/icon.style";

import { SIDEBAR_SIZES_CSS } from "./sidebar.config";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
} from "../form/form.style";
import Modal from "../../__internal__/modal";

const smallScreenBreakpoint = "768px";

type StyledSidebarProps = Pick<
  SidebarProps,
  "position" | "size" | "width" | "widthAnimation"
>;

const StyledSidebar = styled.div.attrs(applyBaseTheme)<StyledSidebarProps>`
  // prevents outline being added in safari
  :focus {
    outline: none;
  }

  ${({ position, size, theme, width, widthAnimation }) => css`
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

    > ${StyledIconButton}:first-of-type {
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

    @media screen and (max-width: ${smallScreenBreakpoint}) {
      border-radius: var(--global-radius-none);
      height: 100%;
      min-width: 100%;
      overflow-y: auto;
      width: 100%;
    }
  `}
`;

const StyledSidebarContent = styled.div<PaddingProps>`
  box-sizing: border-box;
  display: block;
  overflow-y: auto;
  flex-grow: 1;

  color: var(--container-standard-txt-default);
  font: var(--global-font-static-body-regular-m);
  padding: var(--global-space-comp-xl);
  ${paddingFn}

  &:has(${StyledForm}.sticky) {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    padding: 0;

    ${StyledForm}.sticky {
      ${StyledFormContent} {
        padding: var(--global-space-comp-xl);
        ${paddingFn}
      }

      ${StyledFormFooter} {
        background: var(--container-standard-bg-default);
        border-top: var(--global-borderwidth-xs) solid
          var(--container-standard-border-default);
        gap: var(--global-space-layout-2-xs);
        padding: var(--global-space-comp-l) var(--global-space-comp-xl);
      }
    }
  }

  @media screen and (max-width: ${smallScreenBreakpoint}) {
    flex-grow: 0;
    overflow-y: visible;

    &:has(${StyledForm}.sticky) {
      overflow-y: visible;

      ${StyledForm}.sticky {
        height: auto;

        ${StyledFormContent} {
          overflow-y: visible;
        }

        ${StyledFormFooter} {
          box-shadow: none;
          position: static;
        }
      }
    }
  }
`;

const StyledSidebarModal = styled(Modal)`
  @media screen and (max-width: ${smallScreenBreakpoint}) {
    [data-element="modal-background"] {
      display: none;
    }
  }
`;

export {
  StyledSidebar,
  StyledSidebarContent,
  StyledSidebarModal,
  smallScreenBreakpoint,
};
