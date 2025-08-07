import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { TransitionStatus } from "react-transition-group";

import { Variant } from "./popover-container.component";
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

const PopoverContainerHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  max-width: 280px;
`;

type PopoverContainerContentStyleProps = {
  animationState?: TransitionStatus;
  disableAnimation?: boolean;
  zIndex?: number;
  variant?: Variant;
};

const PopoverContainerContentStyle = styled.div.attrs(
  applyBaseTheme,
)<PopoverContainerContentStyleProps>`
  ${padding}

  background: ${({ variant }) =>
    `var(--${variant === "typical" ? "colorsUtilityYang100" : "colorsActionMajor500"})`};
  border-radius: ${({ variant }) =>
    variant === "typical" ? "var(--borderRadius100)" : "0 0 16px 16px"};
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

          &.enter.quick-action {
            transform: translateY(0px);
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
  popoverVariant?: Variant;
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
    color: ${({ popoverVariant }) =>
      `var(--${popoverVariant === "typical" ? "colorsActionMinor500" : "colorsActionMajorYang100"})`};
  }
`;

const PopoverContainerTitleStyle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitleStyle,
  PopoverContainerOpenIcon,
};
