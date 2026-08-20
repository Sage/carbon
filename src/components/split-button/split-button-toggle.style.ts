import styled, { css } from "styled-components";
import { StyledButton } from "../button/__next__/button.style";
import StyledIcon from "../icon/icon.style";

const horizontalPaddingSizes = {
  small: 5,
  medium: 10,
  large: 14,
};

type StyledSplitButtonToggleProps = {
  $displayed: boolean;
  $size: "small" | "medium" | "large";
};

const StyledSplitButtonToggle = styled(
  StyledButton,
)<StyledSplitButtonToggleProps>`
  ${({ $displayed, $size }) => css`
    border-top-left-radius: var(--global-size-none);
    border-bottom-left-radius: var(--global-size-none);

    &:disabled {
      && {
        background-color: var(--button-typical-primary-bg-disabled) !important;
      }

      &,
      ${StyledIcon} {
        color: var(--button-typical-primary-label-disabled);
      }

      cursor: not-allowed;
    }

    ${$displayed
      ? css`
          &:not(:disabled) {
            background-color: var(--button-typical-primary-bg-active);
            border-color: var(--button-typical-primary-bg-active);

            &,
            ${StyledIcon} {
              color: var(--button-typical-primary-label-active);
            }
          }
        `
      : ""}

    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 100%;
      background: var(--button-typical-primary-label-default);
      position: absolute;
      left: -2px;
      z-index: 2;
    }

    padding: var(--global-space-none) ${horizontalPaddingSizes[$size]}px;

    ${StyledButton} + & {
      margin-left: var(--global-space-none);
    }

    ${StyledButton} + & ${StyledIcon} {
      margin-left: var(--global-space-none);
    }

    &:not(:disabled):focus {
      background-color: var(--button-typical-primary-bg-default);
      border-color: var(--button-typical-primary-bg-default);

      &,
      ${StyledIcon} {
        color: var(--button-typical-primary-label-default);
      }
    }
  `}
`;

export default StyledSplitButtonToggle;
