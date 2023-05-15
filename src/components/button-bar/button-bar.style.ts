import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import BaseTheme from "../../style/themes/base";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";
import { ButtonBarProps } from "./button-bar.component";

type StyledButtonBarProps = SpaceProps &
  Pick<ButtonBarProps, "size" | "fullWidth">;

const commonHoverStyles = `
  background-color: var(--colorsActionMajor600);
  border-color: var(--colorsActionMajor600);
`;

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
      border: 2px solid var(--colorsActionMajor500);
      :not(:first-child):not(:last-child) {
        border-radius: var(--borderRadius000);
      }
      :first-child:not(:last-child) {
        border-top-right-radius: var(--borderRadius000);
        border-bottom-right-radius: var(--borderRadius000);
      }
      :last-child:not(:first-child) {
        border-top-left-radius: var(--borderRadius000);
        border-bottom-left-radius: var(--borderRadius000);
      }

<<<<<<< HEAD
=======
>>>>>>> 25c2c6b51 (feat(button-minor): rebase)
=======
>>>>>>> 26a9891d9 (style(button-bar): bring back rm styles)
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
          ${commonHoverStyles}
          color: white;
        }
      }

      & ${StyledIcon} {
        color: var(--colorsActionMajor500);
      }
    }

    [data-component="button"] {
      :hover {
        ${commonHoverStyles}
        & + ${StyledButton} {
          border-left-color: var(--colorsActionMajor600);
        }
      }
    }

    [data-component="button-minor"] {
      & ${StyledIcon} {
        color: var(--colorsActionMinor500);
      }
    }

    [data-component="button-minor"]:hover {
      color: var(--colorsActionMinorYang100);
      background-color: var(--colorsActionMinor500);
      border-color: var(--colorsActionMinor500);
      & + ${StyledButton} {
        border-left-color: var(--colorsActionMinor500);
      }
    }
  `}
`;

StyledButtonBar.defaultProps = {
  theme: BaseTheme,
  size: "medium",
};

export default StyledButtonBar;
