import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import BaseTheme from "../../style/themes/base";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";
import { ButtonBarProps } from "./button-bar.component";

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

      &:not(:last-of-type) {
        border-right-color: transparent;
      }
      &:not(:first-of-type) {
        margin-left: -2px;
      }
      &:focus {
        position: relative;
        z-index: 2;
      }
      &:hover {
        & ${StyledIcon} {
          color: white;
        }
      }
      & ${StyledIcon} {
        color: var(--colorsActionMajor500);
      }
    }

    [data-component="button"]:hover {
      background-color: var(--colorsActionMajor600);
      border-color: var(--colorsActionMajor600);
      & + ${StyledButton} {
        border-left-color: var(--colorsActionMajor600);
      }
    }

    [data-component="button-minor"]:hover {
      background-color: var(--colorsActionMinor600);
      border-color: var(--colorsActionMinor600);
      & + ${StyledButton} {
        border-left-color: var(--colorsActionMinor600);
      }
    }
  `}
`;

StyledButtonBar.defaultProps = {
  theme: BaseTheme,
  size: "medium",
};

export default StyledButtonBar;
