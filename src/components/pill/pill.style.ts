import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

import styleConfig from "./pill.style.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import type { ThemeObject } from "../../style/themes/theme.types";
import StyledIcon from "../icon/icon.style";
import StyledIconButton from "../icon-button/icon-button.style";
import { toColor } from "../../style/utils/color";
import getColorValue from "../../style/utils/get-color-value";
import getHexValue from "../../style/utils/get-hex-value";
import getAccessibleForegroundColor from "../../style/utils/get-accessible-foreground-color";

export interface StyledPillProps extends MarginProps {
  /** Override color variant, provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** Sets the max-width of the pill. */
  maxWidth?: string;
  /** Sets the size of the pill. */
  size?: "S" | "M" | "L" | "XL";
  /** @private @ignore */
  theme?: Partial<ThemeObject>;
  /** Allow the text within pill to wrap. */
  wrapText?: boolean;
}

interface AllStyledPillProps extends StyledPillProps {
  inFill?: boolean;
  isDeletable: boolean;
  isDarkBackground: boolean;
  colorVariant:
    | "neutral"
    | "negative"
    | "positive"
    | "warning"
    | "information"
    | "neutralWhite";
  pillRole: "tag" | "status";
}

const StyledPill = styled.span.attrs(applyBaseTheme)<AllStyledPillProps>`
  ${margin}
  ${({
    wrapText,
    borderColor,
    colorVariant,
    isDarkBackground,
    isDeletable,
    inFill,
    maxWidth,
    pillRole,
    size,
    theme,
  }) => {
    const isStatus = pillRole === "status";
    let pillColor: string;
    let buttonFocusColor: string | undefined;
    let contentColor: string;

    if (borderColor) {
      pillColor = toColor(theme, borderColor);

      // get token value in rgb
      const colorVal = getColorValue(pillColor);
      contentColor = getAccessibleForegroundColor(
        getHexValue(colorVal),
        false,
        true,
      );
    } else {
      const { status, tag } = styleConfig(isDarkBackground);
      const { varietyColor, buttonFocus, content } = isStatus
        ? status[colorVariant]
        : tag.primary;
      pillColor = varietyColor;
      buttonFocusColor = buttonFocus;
      contentColor = content;
    }

    return css`
      font-size: 12px;
      letter-spacing: 0.7px;
      font-weight: 500;
      position: relative;
      display: inline-flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      border: 2px solid ${pillColor};
      border-radius: var(--borderRadius025);
      height: auto;

      ${!wrapText &&
      css`
        white-space: nowrap;
      `}

      ${wrapText &&
      css`
        white-space: break-spaces;
        hyphens: auto;
      `}

      color: ${contentColor};

      ${inFill &&
      css`
        background-color: ${pillColor};
      `}

      ${!inFill &&
      css`
        color: ${!isDarkBackground
          ? "var(--colorsUtilityYin090)"
          : "var(--colorsUtilityYang100)"};
      `}

      ${size === "S" &&
      css`
        min-height: 16px;
        line-height: 16px;
        font-size: 12px;
        padding: 0 8px;
      `}

      ${size === "M" &&
      css`
        min-height: 20px;
        line-height: 20px;
        font-size: 14px;
        padding: 0 8px;
      `}

      ${size === "L" &&
      css`
        min-height: 24px;
        line-height: 24px;
        font-size: 14px;
        padding: 0 8px;
      `}

      ${size === "XL" &&
      css`
        min-height: 28px;
        line-height: 28px;
        font-size: 16px;
        padding: 0 12px;
      `}

      ${isDeletable &&
      css`
        ${StyledIconButton} {
          -webkit-appearance: none;
          border-radius: var(--borderRadius000);
          border: none;
          bottom: 0;
          font-size: 100%;
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          margin: 0;
          line-height: 16px;

          &:focus {
            border-radius: var(--borderRadius000) var(--borderRadius025)
              var(--borderRadius025) var(--borderRadius000);
            ::-moz-focus-inner {
              border: 0;
            }

            ${StyledIcon} {
              color: ${contentColor};
            }

            ${borderColor
              ? css`
                  &::before {
                    border-radius: var(--borderRadius000) var(--borderRadius025)
                      var(--borderRadius025) var(--borderRadius000);
                  }
                `
              : css`
                  background-color: ${buttonFocusColor};
                `}
          }

          &:hover {
            background-color: ${buttonFocusColor};
            cursor: pointer;

            ${StyledIcon} {
              color: ${contentColor};
            }
          }

          ${borderColor &&
          css`
            &:hover,
            &:focus {
              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: ${pillColor};
                filter: brightness(0.9);
              }
            }
          `}

          ${StyledIcon} {
            height: unset;
            width: unset;
            color: ${contentColor};

            ${!inFill &&
            css`
              color: ${!isDarkBackground
                ? "var(--colorsUtilityYin090)"
                : "var(--colorsUtilityYang100)"};
            `}
          }
        }

        ${size === "S" &&
        css`
          padding: 0 22px 0 8px;

          ${StyledIconButton} {
            padding: 0;
            line-height: 16px;

            ${StyledIcon} {
              top: -2px;
              &:before {
                font-size: 16px;
              }
            }
          }
        `}

        ${size === "M" &&
        css`
          padding: 0 28px 0 8px;

          ${StyledIconButton} {
            width: 24px;
            padding: 0;
            line-height: 15px;
          }
        `}

        ${size === "L" &&
        css`
          padding: 0 32px 0 8px;

          ${StyledIconButton} {
            width: 28px;
            padding: 0;
            line-height: 16px;
          }
        `}

        ${size === "XL" &&
        css`
          padding: 0 36px 0 12px;

          ${StyledIconButton} {
            width: 32px;
            padding: 0;
            line-height: 18px;
          }
        `}
      `}
      ${maxWidth && `max-width: ${maxWidth}`}
    `;
  }}
`;

export default StyledPill;
