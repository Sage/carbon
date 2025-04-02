import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import BaseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";
import { ButtonBarProps } from "./button-bar.component";
import StyledIconButton from "../icon-button/icon-button.style";

type StyledButtonBarProps = SpaceProps &
  Pick<ButtonBarProps, "size" | "fullWidth">;

const StyledButtonBar = styled.div<StyledButtonBarProps>`
  ${space}
  ${({ fullWidth, size }) => css`
    ${fullWidth &&
    css`
      width: 100%;
      display: flex;
      button {
        box-sizing: content-box;
        padding: 0;
        width: 100%;
        ${size === "small" && "min-height: 28px"}
        ${size === "medium" && "min-height: 36px"}
          ${size === "large" && "min-height: 44px"}
      }
    `}

    button {
      margin: 0;
      position: relative;

      &:not(:first-child):not(:last-child) {
        border-radius: var(--borderRadius000);
      }
      &:first-child:not(:last-child) {
        border-top-right-radius: var(--borderRadius000);
        border-bottom-right-radius: var(--borderRadius000);
      }
      &:last-child:not(:first-child) {
        border-top-left-radius: var(--borderRadius000);
        border-bottom-left-radius: var(--borderRadius000);
      }

      &:not(:first-of-type) {
        margin-left: -2px;
      }

      &:not(:disabled) {
        z-index: 1;
      }

      &:hover:not(:disabled) {
        z-index: 2;
      }

      &:focus {
        z-index: 3;
      }
    }

    ${StyledIconButton}:not(:disabled) {
      border: 2px solid var(--colorsActionMajor500);

      &:focus {
        border-right-color: var(--colorsActionMajor500);
      }

      &:hover {
        background-color: var(--colorsActionMajor600);
        border-color: var(--colorsActionMajor600);
        color: var(--colorsActionMajorYang100);
      }

      ${StyledIcon} {
        color: var(--colorsActionMajor500);

        &:hover {
          color: var(--colorsActionMajorYang100);
        }
      }
    }

    ${StyledIconButton}:disabled {
      border: 2px solid var(--colorsActionDisabled500);
    }
  `}
`;

StyledButtonBar.defaultProps = {
  theme: BaseTheme,
  size: "medium",
};

export default StyledButtonBar;
