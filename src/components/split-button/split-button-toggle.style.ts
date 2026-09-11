import styled, { css } from "styled-components";
import { StyledButton } from "../button/__next__/button.style";
import StyledIcon from "../icon/icon.style";

const buttonDimensions = {
  small: "var(--global-size-s)",
  medium: "var(--global-size-m)",
  large: "var(--global-size-l)",
};

type StyledSplitButtonToggleProps = {
  $displayed: boolean;
  $size: "small" | "medium" | "large";
  isWhite?: boolean;
};

const StyledSplitButtonToggle = styled(
  StyledButton,
).attrs<StyledSplitButtonToggleProps>(({ isWhite }) => ({
  $inverse: isWhite,
}))<StyledSplitButtonToggleProps>`
  ${({ $displayed, $size, isWhite }) => css`
    border-top-left-radius: var(--global-size-none);
    border-bottom-left-radius: var(--global-size-none);

    ${$displayed
      ? css`
          &:not(:disabled) {
            background-color: ${isWhite
              ? "var(--button-typical-secondary-bg-active)"
              : "var(--button-typical-primary-bg-active)"};
            border-color: ${isWhite
              ? "var(--button-typical-secondary-bg-active)"
              : "var(--button-typical-primary-bg-active)"};

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
      width: var(--global-size-6-xs);
      height: calc(100% + var(--global-size-5-xs));
      background: var(--button-typical-primary-label-default);
      position: absolute;
      left: -2px;
      z-index: 2;
    }

    width: ${buttonDimensions[$size]};
    min-height: ${buttonDimensions[$size]};
    padding: var(--global-space-none);
  `}
`;

export default StyledSplitButtonToggle;
