import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import BaseTheme from "../../style/themes/base";
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
      border: 2px solid var(--colorsActionMajor500);
      border-radius: var(--borderRadius000);

      :first-of-type {
        border-top-left-radius: var(--borderRadius400);
        border-bottom-left-radius: var(--borderRadius400);
      }

      :last-of-type {
        border-top-right-radius: var(--borderRadius400);
        border-bottom-right-radius: var(--borderRadius400);
      }

      &:not(:last-of-type) {
        border-right-color: transparent;
      }
      &:not(:first-of-type) {
        margin-left: -2px;
      }
      &:focus {
        position: relative;
        z-index: 2;
        border-right-color: var(--colorsActionMajor500);
      }
      &:hover {
        background-color: var(--colorsActionMajor600);
        border-color: var(--colorsActionMajor600);
        border-radius: var(--borderRadius000);

        :first-of-type {
          border-top-left-radius: var(--borderRadius400);
          border-bottom-left-radius: var(--borderRadius400);
        }

        :last-of-type {
          border-top-right-radius: var(--borderRadius400);
          border-bottom-right-radius: var(--borderRadius400);
        }

        & + button {
          border-left-color: var(--colorsActionMajor600);
        }
        & ${StyledIcon} {
          color: white;
        }
      }
      & ${StyledIcon} {
        color: var(--colorsActionMajor500);
      }
    }
  `}
`;

StyledButtonBar.defaultProps = {
  theme: BaseTheme,
  size: "medium",
};

export default StyledButtonBar;
