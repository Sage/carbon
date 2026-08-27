import styled, { css } from "styled-components";
import { StyledButton } from "../button/__next__/button.style";
import StyledIcon from "../icon/icon.style";

const horizontalPaddingSizes = {
  small: "var(--global-space-comp-xs)",
  medium: "var(--global-space-comp-m)",
  large: "var(--global-space-comp-l)",
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

    padding: var(--global-space-none) ${horizontalPaddingSizes[$size]};
  `}
`;

export default StyledSplitButtonToggle;
