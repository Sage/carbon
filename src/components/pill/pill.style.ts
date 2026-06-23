import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

import styleConfig from "./pill.style.config";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import type { ThemeObject } from "../../style/themes/theme.types";
import StyledIcon from "../icon/icon.style";
import addFocusStyling from "../../style/utils/add-focus-styling";
import { toColor } from "../../style/utils/color";
import getColorValue from "../../style/utils/get-color-value";
import getHexValue from "../../style/utils/get-hex-value";
import getAccessibleForegroundColor from "../../style/utils/get-accessible-foreground-color";

export interface StyledPillProps extends MarginProps {
  /** Override color variant, provide any color from palette or any valid css color value. */
  borderColor?: string;
  /** Sets the max-width of the pill. */
  maxWidth?: string;
  /**
   * Sets the size of the pill.
   * @deprecated The `XL` size is deprecated and will be removed in a future release. Use `L` instead.
   */
  size?: "S" | "M" | "L" | "XL";
  /** @private @ignore */
  theme?: Partial<ThemeObject>;
  /** Allow the text within pill to wrap. */
  wrapText?: boolean;
}

interface AllStyledPillProps extends MarginProps {
  $borderColor?: StyledPillProps["borderColor"];
  $maxWidth?: StyledPillProps["maxWidth"];
  $size?: StyledPillProps["size"];
  $wrapText?: StyledPillProps["wrapText"];
  $inFill?: boolean;
  $isDeletable: boolean;
  $inverse: boolean;
  $colorVariant:
    | "grey"
    | "green"
    | "red"
    | "orange"
    | "blue"
    | "purple"
    | "teal"
    | "lime"
    | "pink"
    | "slate";
  $pillRole: "tag" | "status";
}

export const StyledDeleteButton = styled.button``;

const StyledPill = styled.span.attrs(applyBaseTheme)<AllStyledPillProps>`
  ${margin}
  ${({
    $wrapText: wrapText,
    $borderColor: borderColor,
    $colorVariant: colorVariant,
    $inverse: inverse,
    $isDeletable: isDeletable,
    $inFill: inFill,
    $maxWidth: maxWidth,
    $size: size,
    theme,
  }) => {
    let pillColor: string;
    let pillColorAlt: string;
    let pillBorderColor: string;
    let buttonFocusColor: string | undefined;
    let buttonFocusAltColor: string | undefined;
    let contentColor: string;
    let contentAltColor: string;

    if (borderColor) {
      pillColor = toColor(theme, borderColor);
      pillColorAlt = pillColor;
      pillBorderColor = pillColor;

      // get token value in rgb
      const colorVal = getColorValue(pillColor);
      contentColor = getAccessibleForegroundColor(
        getHexValue(colorVal),
        false,
        true,
      );
      contentAltColor = contentColor;
    } else {
      const { status } = styleConfig(inverse);
      const {
        varietyColor,
        varietyColorAlt,
        varietyBorderColor,
        buttonFocus,
        buttonFocusAlt,
        content,
        contentAlt,
      } = status[colorVariant];
      pillColor = varietyColor;
      pillColorAlt = varietyColorAlt;
      pillBorderColor = varietyBorderColor;
      buttonFocusColor = buttonFocus;
      buttonFocusAltColor = buttonFocusAlt;
      contentColor = content;
      contentAltColor = contentAlt;
    }

    const deleteContentColor =
      inFill || borderColor ? contentColor : contentAltColor;
    const deleteHoverBackgroundColor =
      inFill || borderColor ? buttonFocusColor : buttonFocusAltColor;

    return css`
      position: relative;
      display: inline-flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      gap: var(--global-space-comp-xs);
      border: var(--global-borderwidth-s) solid ${pillBorderColor};
      border-radius: var(--global-radius-container-s);
      height: auto;
      box-sizing: border-box;

      ${!wrapText &&
      css`
        white-space: nowrap;
      `}

      ${wrapText &&
      css`
        overflow-wrap: anywhere;
        hyphens: auto;
        // disabled auto hyphens in Safari as it doesn't seem to play well with breaking words
        // soft hyphens can still be added manually
        -webkit-hyphens: manual;
      `}

      color: ${contentColor};

      ${StyledIcon} {
        color: inherit;
        width: var(--global-size-2-xs);
        height: var(--global-size-2-xs);
        padding: var(--global-space-comp-xs);
        box-sizing: border-box;
      }

      ${inFill &&
      css`
        background-color: ${pillColor};
      `}

      ${!inFill &&
      css`
        ${borderColor
          ? css`
              color: ${!inverse
                ? "var(--colorsUtilityYin090)"
                : "var(--colorsUtilityYang100)"};
            `
          : css`
              background-color: ${pillColorAlt};
              color: ${contentAltColor};
            `}
      `}

      ${size === "S" &&
      css`
        min-height: var(--global-size-2-xs);
        font: var(--global-font-static-comp-medium-s);
        padding: 0 var(--global-space-comp-s);
      `}

      ${size === "M" &&
      css`
        min-height: var(--global-size-xs);
        font: var(--global-font-static-comp-medium-m);
        padding: 0 var(--global-space-comp-s);
      `}

      ${size === "L" &&
      css`
        min-height: 28px;
        font: var(--global-font-static-comp-medium-l);
        padding: 0 var(--global-space-comp-s);
      `}

      /* Todo: Remove when Pill's XL size is removed */
      ${size === "XL" &&
      css`
        min-height: 28px;
        font: var(--global-font-static-comp-medium-l);
        padding: 0 12px;
      `}

      ${isDeletable &&
      css`
        ${StyledDeleteButton} {
          -webkit-appearance: none;
          background: transparent;
          border-radius: 0 var(--global-radius-container-s)
            var(--global-radius-container-s) 0;
          border: none;
          bottom: 0;
          font-size: 100%;
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: ${deleteContentColor};

          ${!inFill &&
          borderColor &&
          css`
            color: ${!inverse
              ? "var(--colorsUtilityYin090)"
              : "var(--colorsUtilityYang100)"};
          `}

          ${StyledIcon} {
            color: currentColor;
            height: unset;
            width: unset;
          }

          &:focus {
            ${addFocusStyling()}
            color: ${deleteContentColor};
            ::-moz-focus-inner {
              border: 0;
            }

            ${borderColor
              ? css`
                  &::before {
                    border-radius: 0 var(--global-radius-container-s)
                      var(--global-radius-container-s) 0;
                  }
                `
              : css`
                  background-color: ${inFill
                    ? buttonFocusColor
                    : buttonFocusAltColor};
                `}
          }

          &:hover {
            background-color: ${deleteHoverBackgroundColor};
            color: ${deleteContentColor};
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
        }

        ${size === "S" &&
        css`
          padding: 0 calc(20px + var(--global-space-comp-xs)) 0
            var(--global-space-comp-s);
        `}

        ${size === "M" &&
        css`
          padding: 0 calc(24px + var(--global-space-comp-xs)) 0
            var(--global-space-comp-s);

          ${StyledDeleteButton} {
            width: 24px;
            padding: 0;
          }
        `}

        ${size === "L" &&
        css`
          padding: 0 calc(28px + var(--global-space-comp-xs)) 0
            var(--global-space-comp-s);

          ${StyledDeleteButton} {
            width: 28px;
            padding: 0;
          }
        `}

        /* Todo: Remove when Pill's XL size is removed */
        ${size === "XL" &&
        css`
          padding: 0 calc(32px + var(--global-space-comp-xs)) 0 12px;

          ${StyledDeleteButton} {
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
