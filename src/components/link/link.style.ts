import styled, { css, SimpleInterpolation } from "styled-components";
import StyledIcon from "../icon/icon.style";
import { LINK_VARIANTS } from "./link.config";

export type Variants = (typeof LINK_VARIANTS)[number];

export interface StyledLinkProps {
  /** Disables the link visually and functionally. */
  disabled?: boolean;
  /** Determines the alignment of the icon relative to the link content. */
  iconAlign?: "left" | "right";
  /** Applies accessibility styles used for skip links (e.g., "Skip to content"). */
  isSkipLink?: boolean;
  /** Adjusts the color theme for rendering on a dark background. */
  isDarkBackground?: boolean;
  /** Defines the visual variant of the link (e.g., "default", "negative", "neutral"). */
  variant?: Variants;
  /** Indicates whether the link currently has keyboard focus. */
  hasFocus?: boolean;
  /** Indicates whether the link has visible textual or icon content. */
  hasContent?: boolean;
  /** Applies styling specific to links used inside a MenuItem. */
  isMenuItem?: boolean;
  /** Constrains the maximum width of the link; applies ellipsis to overflowing text. */
  maxWidth?: string;
}

export const StyledAnchor = styled.a<{ $styles?: SimpleInterpolation }>`
  ${({ $styles }) => $styles}
`;

export const StyledButton = styled.button<{ $styles?: SimpleInterpolation }>`
  ${({ $styles }) => $styles}
`;

export const StyledLinkStyles = (
  props: StyledLinkProps,
): SimpleInterpolation => {
  const {
    variant = "default",
    disabled = false,
    isMenuItem,
    isSkipLink,
    iconAlign = "left",
    hasContent,
    hasFocus,
    isDarkBackground,
    maxWidth,
  } = props;

  const colorMap = {
    light: (v?: StyledLinkProps["variant"]) => {
      let color = "var(--colorsActionMajor500)";
      let hoverColor = "var(--colorsActionMajor600)";

      if (v === "negative") {
        color = "var(--colorsSemanticNegative500)";
        hoverColor = "var(--colorsSemanticNegative600)";
      } else if (v === "neutral") {
        color = "var(--colorsActionMajorYin090)";
      }

      return {
        color,
        hoverColor,
        disabledColor: "var(--colorsActionMajorYin030)",
      };
    },
    dark: (v?: StyledLinkProps["variant"]) => {
      let color = "var(--colorsActionMajorYang100)"; // White/very light for dark backgrounds
      let hoverColor = "var(--colorsActionMajorYang100)";

      if (v === "negative") {
        color = "var(--colorsSemanticNegative100)";
        hoverColor = "var(--colorsSemanticNegative200)";
      } else if (v === "neutral") {
        color = "var(--colorsActionMinor100)";
        hoverColor = "var(--colorsActionMajorYang100)";
      }

      return {
        color,
        hoverColor,
        disabledColor: "var(--colorsActionMajorYang030)",
      };
    },
  };

  const themeKey = isDarkBackground ? "dark" : "light";
  const { color, hoverColor, disabledColor } = colorMap[themeKey](variant);

  return css`
    display: inline-flex;
    align-items: center;

    ${isSkipLink &&
    css`
      > a,
      > button {
        position: absolute;
        top: 8px;
        left: 0px;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        font-size: var(--fontSizes100);
        text-decoration: underline 4px solid;
        text-decoration-thickness: 4px;
        text-underline-offset: 3px;
        color: var(--colorsActionMajorYin090);
        background-color: rgb(255, 188, 25);
        padding: 12px 24px;
        border-radius: var(--borderRadius025);
        box-shadow:
          rgba(0, 20, 30, 0.1) 0px 10px 30px 0px,
          rgba(0, 20, 30, 0.1) 0px 30px 60px 0px;
        transition:
          transform 0.2s ease,
          opacity 0.2s ease;

        &:focus {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        > ${StyledIcon} {
          display: ${hasContent ? "inline-block" : "inline"};
          position: relative;
          vertical-align: middle;

          ${iconAlign === "left" &&
          css`
            margin-right: ${hasContent ? "var(--spacing050)" : 0};
          `}

          ${iconAlign === "right" &&
          css`
            margin-left: ${hasContent ? "var(--spacing100)" : 0};
          `}
        }
      }
    `}

    ${!isSkipLink &&
    css`
      > a,
      > button {
        font-size: var(--fontSizes100);
        text-decoration: ${hasContent ? "underline" : "none"};
        color: ${disabled ? disabledColor : color};

        ${isMenuItem &&
        css`
          display: inline-block;
          padding: 11px 16px 12px;

          ${maxWidth &&
          css`
            max-width: inherit;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: bottom;
            white-space: nowrap;
          `}
        `}

        ${!disabled &&
        css`
          &:hover {
            color: ${hoverColor};
            cursor: pointer;
          }

          &:focus {
            background-color: var(--colorsSemanticFocus250);
            border-radius: var(--borderRadius025);
          }
        `}

        ${disabled &&
        css`
          cursor: not-allowed;

          &:hover,
          &:focus {
            color: ${disabledColor};
            cursor: not-allowed;
          }
        `}

        > ${StyledIcon} {
          display: ${hasContent ? "inline-block" : "inline"};
          position: relative;
          vertical-align: middle;

          ${iconAlign === "left" &&
          css`
            margin-right: ${hasContent ? "var(--spacing050)" : 0};
          `}

          ${iconAlign === "right" &&
          css`
            margin-left: ${hasContent ? "var(--spacing100)" : 0};
          `}
        }
      }

      a[aria-disabled="true"] {
        color: ${disabledColor};
        pointer-events: none;
        cursor: not-allowed;
        text-decoration: none;
        user-select: none;
        tab-index: -1;
      }
    `}

    ${!isSkipLink &&
    !disabled &&
    hasFocus &&
    css`
      box-shadow: 0 var(--spacing050) 0 0 var(--colorsUtilityYin090);
      border-bottom-left-radius: var(--borderRadius025);
      border-bottom-right-radius: var(--borderRadius025);
    `}
  `;
};

export const StyledContent = styled.span``;

export const StyledLink = styled.div<StyledLinkProps>`
  ${StyledLinkStyles}
`;

export default StyledLink;
