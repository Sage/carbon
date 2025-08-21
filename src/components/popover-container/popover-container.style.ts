import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { TransitionStatus } from "react-transition-group";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
} from "../form/form.style";

type PopoverContainerWrapperProps = {
  hasFullWidth?: boolean;
};

const PopoverContainerWrapperStyle = styled.div<PopoverContainerWrapperProps>`
  position: relative;
  display: inline-block;

  ${({ hasFullWidth }) =>
    hasFullWidth &&
    css`
      width: 100%;
    `}
`;

const PopoverContainerTitleStyle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const PopoverContainerHeaderStyle = styled.div`
  display: flex;
  max-width: 280px;

  &:has(${PopoverContainerTitleStyle}) {
    margin-bottom: 8px;
    justify-content: space-between;
  }

  &:not(:has(${PopoverContainerTitleStyle})) {
    justify-content: end;
  }
`;

type PopoverContainerContentStyleProps = {
  animationState?: TransitionStatus;
  disableAnimation?: boolean;
  zIndex?: number;
};

const PopoverContainerContentStyle = styled.div.attrs(
  applyBaseTheme,
)<PopoverContainerContentStyleProps>`
  ${padding}

  background: var(--colorsUtilityYang100);
  border-radius: var(--borderRadius100);
  box-shadow: var(--boxShadow100);
  min-width: 300px;
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};

  ${({ disableAnimation }) =>
    disableAnimation
      ? css`
          opacity: 1;
          transform: none;
        `
      : css`
          &.enter {
            opacity: 0;
            transform: translateY(-8px);
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
        border-bottom-right-radius: var(--borderRadius200);
        border-bottom-left-radius: var(--borderRadius200);
      }
    }
  }
`;

type AdditionalIconButtonProps = {
  tabIndex?: number;
  id?: string;
};

const PopoverContainerOpenIcon = styled(IconButton)<AdditionalIconButtonProps>`
  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
`;

const PopoverContainerCloseIcon = styled(IconButton)<AdditionalIconButtonProps>`
  position: absolute;
  top: 16px;
  right: 24px;

  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
`;

export {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitleStyle,
  PopoverContainerOpenIcon,
};
