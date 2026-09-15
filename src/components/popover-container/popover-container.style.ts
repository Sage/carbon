import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { TransitionStatus } from "react-transition-group";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
} from "../form/form.style";
import { PopoverContainerProps } from "./popover-container.component";

type PopoverContainerWrapperProps = {
  $hasFullWidth?: boolean;
};

const PopoverContainerWrapperStyle = styled.div<PopoverContainerWrapperProps>`
  position: relative;
  display: inline-block;

  ${({ $hasFullWidth }) =>
    $hasFullWidth &&
    css`
      width: 100%;
    `}
`;

const PopoverContainerTitleStyle = styled.div`
  flex: 1;
  min-width: 0;
  font: var(--global-font-static-subheading-l);
`;

const PopoverContainerHeaderContentStyle = styled.div`
  order: -1;
  flex: 1;
  min-width: 0;
`;

const PopoverContainerHeaderStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;

  &:has(${PopoverContainerTitleStyle}) {
    margin-bottom: 8px;
  }
`;

type PopoverContainerContentStyleProps = {
  animationState?: TransitionStatus;
  disableAnimation?: boolean;
  zIndex?: number;
  $borderRadius?: PopoverContainerProps["borderRadius"];
  $roundness: PopoverContainerProps["roundness"];
  $popoverOffset?: number;
  $inMenu?: boolean;
  $size: PopoverContainerProps["size"];
};

const PopoverContainerContentStyle = styled.div.attrs(
  applyBaseTheme,
)<PopoverContainerContentStyleProps>`
  background: var(--popover-bg-default);

  ${({ $inMenu }) =>
    $inMenu &&
    css`
      color: var(--page-content-txt-default);
    `}

  ${({ $roundness }) => css`
    ${$roundness === "curved" &&
    css`
      border-radius: var(--global-radius-container-xl);
    `}

    ${$roundness === "moderate" &&
    css`
      border-radius: var(--global-radius-container-l);
    `}
  `}
  
  ${({ $size }) => css`
    ${$size === "small" &&
    css`
      padding: var(--global-space-comp-xs);
    `}

    ${$size === "medium" &&
    css`
      padding: var(--global-space-comp-s);
    `}

    ${$size === "large" &&
    css`
      padding: var(--global-space-comp-m);
    `}
  `}

  ${padding}

  ${({ $borderRadius }) => {
    if (!$borderRadius) {
      return "";
    }

    const radiusValues = $borderRadius.split(" ").filter(Boolean);
    return css`
      border-radius: ${radiusValues
        .map((radius) => `var(--${radius.trim()})`)
        .join(" ")};
    `;
  }}
  
  box-shadow: var(--global-depth-lvl1);
  min-width: 300px;
  position: absolute;
  z-index: var(--adaptiveSidebarModalBackdrop, ${({ zIndex }) => zIndex});

  ${({ disableAnimation, $popoverOffset }) =>
    disableAnimation
      ? css`
          opacity: 1;
          transform: none;
        `
      : css`
          &.enter {
            opacity: 0;
            transform: translateY(
              ${
                /* istanbul ignore next */
                $popoverOffset ? -8 : 0
              }px
            );
          }

          &.enter-done {
            opacity: 1;
            transform: translateY(0);
            transition-property: opacity, transform;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.25, 0.25, 0, 1.5);
          }

          &.exit {
            opacity: 0;
            transform: translateY(-8px);
            transition-property: opacity, transform;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.25, 0.25, 0, 1.5);
          }

          &.exit-done {
            opacity: 0;
            transform: translateY(0);
          }
        `}

  :focus {
    outline: none;
  }

  &:has(${StyledForm}.sticky) {
    display: flex;
    flex-direction: column;
    padding: 0;

    ${StyledForm}.sticky {
      ${StyledFormContent} {
        flex-grow: 1;
        min-height: 0;
        overflow-y: auto;
      }

      ${StyledFormFooter} {
        border-bottom-right-radius: var(--global-radius-action-m);
        border-bottom-left-radius: var(--global-radius-action-m);
      }
    }
  }
`;
export {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerHeaderContentStyle,
  PopoverContainerContentStyle,
  PopoverContainerTitleStyle,
};
