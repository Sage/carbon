import styled, { css } from "styled-components";

import { IconType } from "../icon";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";
import addFocusStyling from "../../style/utils/add-focus-styling";

export type ButtonToggleIconSizes = "small" | "large";

export const heightConfig = {
  small: 24,
  medium: 32,
  large: 40,
};

export const fontSizeConfig = {
  small: 14,
  medium: 14,
  large: 16,
};

export const paddingConfig = {
  small: 8,
  medium: 8,
  large: 12,
};

const heightLargeIconConfig = {
  small: 72,
  medium: 88,
  large: 120,
};

const paddingLargeIconConfig = {
  small: "var(--spacing100)",
  medium: "var(--spacing100) var(--spacing150) var(--spacing000)",
  large: "var(--spacing100) var(--spacing300)",
};

const StyledButtonToggleContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-flow: wrap;
`;

export interface StyledButtonToggleProps {
  /** The icon to be rendered inside of the button */
  buttonIcon?: IconType;
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize?: ButtonToggleIconSizes;
  /** Disable all user interaction. */
  disabled?: boolean;
  /** ButtonToggle size */
  size: "small" | "medium" | "large";
  /** Allow button to be deselected when already selected */
  allowDeselect?: boolean;
}

const StyledButtonToggle = styled.button<StyledButtonToggleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;

  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  color: var(--colorsActionMinor500);
  border: none;

  ${StyledIcon} {
    color: var(--colorsActionMinor500);
    height: var(--sizing250);
    width: var(--sizing250);
  }

  ${({ size }) => css`
    min-height: ${heightConfig[size]}px;
    padding: 0 ${paddingConfig[size]}px;
    font-size: ${fontSizeConfig[size]}px;
  `}

  ${({ buttonIcon, buttonIconSize, size }) =>
    buttonIcon &&
    buttonIconSize === "large" &&
    css`
      min-height: ${heightLargeIconConfig[size]}px;
      padding: ${paddingLargeIconConfig[size]};
      flex-direction: column;
    `}

  &:focus {
    ${addFocusStyling()}
    z-index: 100;
  }

  &:not(:disabled):hover {
    background-color: var(--colorsActionMinor600);
    color: var(--colorsActionMinorYang100);
    ${StyledIcon} {
      color: var(--colorsActionMinorYang100);
    }
  }

  &[aria-pressed="true"] {
    background-color: var(--colorsActionMinor850);
    color: var(--colorsActionMinorYang100);

    ${StyledIcon} {
      color: var(--colorsActionMinorYang100);
    }

    ${({ allowDeselect }) =>
      !allowDeselect &&
      css`
        cursor: auto;
      `}
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      & {
        color: var(--colorsActionMinorYin030);
        ${StyledIcon} {
          color: var(--colorsActionMinorYin030);
        }
      }

      &[aria-pressed="true"] {
        cursor: not-allowed;
        background-color: var(--colorsActionMinorYin030);
      }
    `}
`;

export interface StyledButtonToggleIconProps {
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize?: ButtonToggleIconSizes;
  hasContent?: boolean;
}

const StyledButtonToggleIcon = styled.div<StyledButtonToggleIconProps>`
  ${({ hasContent }) => hasContent && `margin-right: 8px;`}
  ${({ buttonIconSize }) =>
    buttonIconSize === "large" &&
    css`
      margin-right: 0;

      ${StyledIcon} {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 8px;
        height: var(--sizing400);
        width: var(--sizing400);
      }

      ${StyledIcon}::before {
        font-size: var(--sizing400);
        line-height: var(--sizing400);
      }

      .carbon-icon__svg--credit-card-slash {
        margin-left: 6px;
      }
    `}
`;

StyledButtonToggle.defaultProps = { theme: baseTheme };

const StyledButtonToggleWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  &&&& {
    ${StyledButtonToggle} {
      border-radius: var(--borderRadius050);
    }
  }
`;

export {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
  StyledButtonToggleIcon,
  StyledButtonToggleContentWrapper,
};
