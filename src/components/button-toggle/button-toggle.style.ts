import styled, { css } from "styled-components";

import { IconType } from "../icon";
import StyledIcon from "../icon/icon.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

export type ButtonToggleIconSizes = "small" | "large";

export const heightConfig = {
  small: "var(--global-size-s)",
  medium: "var(--global-size-m)",
  large: "var(--global-size-l)",
};

export const fontConfig = {
  small: "var(--global-font-static-comp-medium-s)",
  medium: "var(--global-font-static-comp-medium-m)",
  large: "var(--global-font-static-comp-medium-l)",
};

export const paddingConfig = {
  small: `0 var(--global-space-comp-m)`,
  medium: `0  var(--global-space-comp-l)`,
  large: `0 var(--global-space-comp-l)`,
};

const heightLargeIconConfig = {
  small: 72,
  medium: 88,
  large: 120,
};

const paddingLargeIconConfig = {
  small: "var(--global-space-comp-s)",
  medium:
    "var(--global-space-comp-s) var(--global-space-comp-m) var(--global-space-none)",
  large: "var(--global-space-comp-s) var(--global-space-comp-xl)",
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

const StyledButtonToggle = styled.button.attrs(
  applyBaseTheme,
)<StyledButtonToggleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;

  background-color: transparent;
  cursor: pointer;
  text-align: center;
  color: var(--button-typical-toggle-label-default);
  border: none;

  ${StyledIcon} {
    color: var(--button-typical-toggle-label-default);
    height: var(--sizing250);
    width: var(--sizing250);
  }

  ${({ size }) => css`
    min-height: ${heightConfig[size]};
    padding: ${paddingConfig[size]};
    font: ${fontConfig[size]};
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
    background-color: var(--button-typical-toggle-bg-hover);
    color: var(--button-typical-toggle-label-hover);
    ${StyledIcon} {
      color: var(--button-typical-toggle-label-hover);
    }
  }

  &[aria-pressed="true"] {
    background-color: var(--button-typical-toggle-bg-active);
    color: var(--button-typical-toggle-label-active);

    ${StyledIcon} {
      color: var(--button-typical-toggle-label-active);
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
        color: var(--button-typical-toggle-label-disabled);
        ${StyledIcon} {
          color: var(--button-typical-toggle-label-disabled);
        }
      }

      &[aria-pressed="true"] {
        cursor: not-allowed;
        background-color: var(--button-typical-toggle-bg-active-disabled);
        color: var(--button-typical-toggle-label-active-disabled);

        ${StyledIcon} {
          color: var(--button-typical-toggle-label-active-disabled);
        }
      }
    `}
`;

export interface StyledButtonToggleIconProps {
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize?: ButtonToggleIconSizes;
  hasContent?: boolean;
}

const StyledButtonToggleIcon = styled.div<StyledButtonToggleIconProps>`
  ${({ hasContent }) =>
    hasContent && `margin-right: var(--global-space-comp-s);`}
  ${({ buttonIconSize }) =>
    buttonIconSize === "large" &&
    css`
      margin-right: 0;

      ${StyledIcon} {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: var(--global-space-comp-s);
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

const StyledButtonToggleWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  &&&& {
    ${StyledButtonToggle} {
      border-radius: var(--global-radius-action-2-xl);
    }
  }
`;

export {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
  StyledButtonToggleIcon,
  StyledButtonToggleContentWrapper,
};
