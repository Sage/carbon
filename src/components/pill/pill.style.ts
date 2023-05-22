import styled, { css } from "styled-components";
import { shade, meetsContrastGuidelines } from "polished";
import { margin, MarginProps } from "styled-system";

import styleConfig from "./pill.style.config";
import { baseTheme } from "../../style/themes";
import { ThemeObject } from "../../style/themes/base/base-theme.config";
import StyledIcon from "../icon/icon.style";
import { toColor } from "../../style/utils/color";
import getColorValue from "../../style/utils/get-color-value";

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
  colorVariant: "neutral" | "negative" | "positive" | "warning";
  pillRole: "tag" | "status";
}

function addStyleToPillIcon(fontSize: string) {
  return `
    ${StyledIcon} {
      &:before {
        font-size: ${fontSize};
      }
    }
  `;
}

const StyledPill = styled.span<AllStyledPillProps>`
  ${margin}
  ${({
    wrapText,
    borderColor,
    colorVariant,
    isDeletable,
    inFill,
    maxWidth,
    pillRole,
    size,
    theme,
  }) => {
    const isStatus = pillRole === "status";
    let pillColor;
    let buttonFocusColor;
    let contentColor;

    try {
      if (borderColor) {
        pillColor = toColor(theme, borderColor);
        buttonFocusColor = shade(0.2, getColorValue(pillColor));
        contentColor = meetsContrastGuidelines(
          getColorValue(pillColor),
          theme.compatibility.colorsUtilityYin090
        ).AAA
          ? "var(--colorsUtilityYin090)"
          : "var(--colorsUtilityYang100)";
      } else {
        const { status, tag } = styleConfig();
        const { varietyColor, buttonFocus, content } = isStatus
          ? status[colorVariant]
          : tag.primary;
        pillColor = varietyColor;
        buttonFocusColor = buttonFocus;
        contentColor = content;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return css`
      font-size: 10px;
      letter-spacing: 0.7px;
      font-weight: 600;
      position: relative;
      display: inline-flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      border: 2px solid ${pillColor};
      ${!theme.roundedCornersOptOut &&
      css`
        border-radius: var(--borderRadius025);
      `}
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
        color: var(--colorsUtilityYin090);
      `}

      ${size === "S" &&
      css`
        min-height: 16px;
        line-height: 16px;
        font-size: 10px;

        ${theme.roundedCornersOptOut &&
        css`
          border-radius: 12px;

          button {
            border-radius: 0 10px 10px 0;
          }
        `}
      `}

      ${size === "M" &&
      css`
        min-height: 20px;
        line-height: 20px;
        font-size: 12px;

        ${theme.roundedCornersOptOut &&
        css`
          border-radius: 12px;

          button {
            border-radius: 0 10px 10px 0;
          }
        `}
      `}

      ${size === "L" &&
      css`
        min-height: 24px;
        line-height: 24px;
        font-size: 14px;

        ${theme.roundedCornersOptOut &&
        css`
          border-radius: 13px;

          button {
            border-radius: 0 11px 11px 0;
          }
        `}
      `}

      ${size === "XL" &&
      css`
        min-height: 26px;
        line-height: 26px;
        font-size: 16px;

        ${theme.roundedCornersOptOut &&
        css`
          border-radius: 15px;

          button {
            border-radius: 0 12px 12px 0;
          }
        `}
      `}

      ${isDeletable &&
      css`
        button {
          -webkit-appearance: none;
          ${!theme.roundedCornersOptOut &&
          css`
            border-radius: var(--borderRadius000);
          `}
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
            outline: none;
            box-shadow: 0 0 0 3px var(--colorsSemanticFocus500);
            background-color: ${buttonFocusColor};
            ${!theme.roundedCornersOptOut &&
            css`
              border-radius: var(--borderRadius000) var(--borderRadius025)
                var(--borderRadius025) var(--borderRadius000);
            `}

            & {
              color: ${contentColor};
            }
            ::-moz-focus-inner {
              border: 0;
            }
            ${StyledIcon} {
              color: ${contentColor};
            }
          }

          &:hover {
            background-color: ${buttonFocusColor};
            color: ${contentColor};
            cursor: pointer;
            ${StyledIcon} {
              color: ${contentColor};
            }
          }

          ${StyledIcon} {
            font-size: 12px;
            padding: 0 4px;
            height: unset;
            width: unset;
            color: ${contentColor};

            &:hover,
            &:focus {
              color: ${contentColor};
            }
          }

          ${!inFill &&
          css`
            ${StyledIcon} {
              color: var(--colorsUtilityYin090);
            }
          `}
        }

        ${size === "S" &&
        css`
          padding: 0 24px 0 7px;

          button {
            padding: 0;
            line-height: 14px;
            ${addStyleToPillIcon("7px")}
          }
        `}

        ${size === "M" &&
        css`
          padding: 0 32px 0 11px;

          button {
            width: 24px;
            padding: 0;
            line-height: 15px;
            ${addStyleToPillIcon("10px")}
          }
        `}

        ${size === "L" &&
        css`
          padding: 0 36px 0 15px;

          button {
            width: 28px;
            padding: 0;
            line-height: 16px;
            ${addStyleToPillIcon("12px")}
          }
        `}

        ${size === "XL" &&
        css`
          padding: 0 41px 0 19px;

          button {
            width: 32px;
            padding: 0;
            line-height: 18px;
            ${addStyleToPillIcon("13px")}
          }
        `}
      `}

      ${!isDeletable &&
      css`
        ${size === "S" &&
        css`
          padding: 0 7px;

          button {
            padding: 0;
          }
        `}

        ${size === "M" &&
        css`
          padding: 0 11px;

          button {
            width: 24px;
            padding: 0;
          }
        `}

        ${size === "L" &&
        css`
          padding: 0 15px;

          button {
            width: 28px;
            padding: 0;
          }
        `}

        ${size === "XL" &&
        css`
          padding: 0 19px;

          button {
            width: 32px;
            padding: 0;
          }
        `}
      `}
      ${maxWidth && `max-width: ${maxWidth}`}
    `;
  }}
`;

StyledPill.defaultProps = {
  inFill: false,
  isDeletable: false,
  theme: baseTheme,
};

export default StyledPill;
