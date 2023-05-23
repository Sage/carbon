import styled, { css } from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";
import { IconType } from "../icon";
import StyledIcon from "../icon/icon.style";

export type ButtonToggleIconSizes = "small" | "large";

const heightConfig = {
  small: 32,
  medium: 40,
  large: 48,
};

const fontSizeConfig = {
  small: 14,
  medium: 14,
  large: 16,
};

const paddingConfig = {
  small: 16,
  medium: 24,
  large: 32,
};

const heightLargeIconConfig = {
  small: 80,
  medium: 96,
  large: 112,
};

const paddingLargeIconConfig = {
  small: 32,
  medium: 40,
  large: 48,
};

const StyledButtonToggleContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-flow: wrap;
`;

export interface StyledButtonToggleLabelProps {
  /** The icon to be rendered inside of the button */
  buttonIcon?: IconType;
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize?: ButtonToggleIconSizes;
  /** Disable all user interaction. */
  disabled?: boolean;
  /** ButtonToggle size */
  size: "small" | "medium" | "large";
  grouped?: boolean;
}

const StyledButtonToggleLabel = styled.label<StyledButtonToggleLabelProps>`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;

  ${({ size }) => css`
    height: ${heightConfig[size]}px;
    padding: 0 ${paddingConfig[size]}px;
    font-size: ${fontSizeConfig[size]}px;
  `}
  font-weight: 700;
  cursor: pointer;
  border: 1px solid var(--colorsActionMinor500);
  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
  input:checked ~ && {
    background-color: var(--colorsActionMinor300);
    color: var(--colorsActionMinor600);
    cursor: auto;
  }
  input:focus ~ & {
    z-index: 100;
    ${addFocusStyling()}
    box-shadow: 0 0 0 2px var(--colorsSemanticFocus500),
      0 0 0 4px var(--colorsUtilityYin090);
  }

  input:not(:checked):not(:disabled) ~ &:hover {
    background-color: var(--colorsActionMinor200);
    border-color: var(--colorsActionMinor500);
    color: var(--colorsActionMinor500);
    ${StyledIcon} {
      color: var(--colorsActionMinor500);
    }
  }
  ${({ buttonIcon, buttonIconSize, size }) =>
    buttonIcon &&
    buttonIconSize === "large" &&
    css`
      height: ${heightLargeIconConfig[size]}px;
      padding: 0 ${paddingLargeIconConfig[size]}px;
      ${StyledButtonToggleContentWrapper} {
        flex-direction: column;
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      & {
        border-color: var(--colorsActionDisabled500);
        color: var(--colorsActionMinorYin030);
        ${StyledIcon} {
          color: var(--colorsActionMinorYin030);
        }
      }
      cursor: not-allowed;
    `};
`;

const iconFontSizes = {
  smallIcon: 16,
  largeIcon: 32,
};

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
        margin-right: 0;
        margin-bottom: 8px;
        height: ${`${iconFontSizes.largeIcon}px`};
        width: ${`${iconFontSizes.largeIcon}px`};
      }
      ${StyledIcon}::before {
        font-size: ${`${iconFontSizes[`${buttonIconSize}Icon`]}px`};
        line-height: ${`${iconFontSizes[`${buttonIconSize}Icon`]}px`};
      }
      .carbon-icon__svg--credit-card-slash {
        margin-left: 6px;
      }
    `}
`;

export interface StyledButtonToggleProps {
  grouped?: boolean;
}

const StyledButtonToggle = styled.div<StyledButtonToggleProps>`
  display: inline-block;
  vertical-align: middle;

  ${({ grouped }) =>
    css`
      ${!grouped &&
      css`
        &&&& {
          ${StyledButtonToggleLabel} {
            border-radius: var(--borderRadius400);
          }
        }
      `}

      ${grouped &&
      css`
        &&&& {
          :first-of-type {
            ${StyledButtonToggleLabel} {
              border-top-left-radius: var(--borderRadius400);
              border-bottom-left-radius: var(--borderRadius400);
            }
          }

          :last-of-type {
            ${StyledButtonToggleLabel} {
              border-top-right-radius: var(--borderRadius400);
              border-bottom-right-radius: var(--borderRadius400);
            }
          }
        }
      `}
    `}

  &:not(:first-of-type) {
    margin-left: 8px;
  }

  ${({ grouped }) =>
    grouped &&
    css`
      &:not(:first-of-type) {
        margin-left: -1px;
      }
    `};
`;

const StyledButtonToggleInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

export {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleIcon,
  StyledButtonToggleInput,
  StyledButtonToggleContentWrapper,
};
