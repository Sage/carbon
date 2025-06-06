import styled, { css } from "styled-components";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";

import type { Variants } from "./link.style.types";

export interface StyledLinkProps {
  /** The disabled state of the link. */
  disabled?: boolean;
  /** Which side of the link to render the icon. */
  iconAlign?: "left" | "right";
  /** Allows the link to act as a skip link for accessibility. */
  isSkipLink?: boolean;
  /** Whether the link is rendered on a dark background. */
  isDarkBackground?: boolean;
  /** Variant that affects link color scheme (default, negative, neutral). */
  variant?: Variants;
  /** Indicates if the link is currently focused (for styling). */
  hasFocus?: boolean;
  /** Whether the link contains visible content (affects spacing). */
  hasContent: boolean;
  /** If true, the link is rendered inside a menu (affects layout). */
  isMenuItem?: boolean;
}

const colorMap = {
  light: (variant?: Variants) => {
    let color = "var(--colorsActionMajor500)";
    let hoverColor = "var(--colorsActionMajor600)";

    if (variant === "negative") {
      color = "var(--colorsSemanticNegative500)";
      hoverColor = "var(--colorsSemanticNegative600)";
    } else if (variant === "neutral") {
      color = "var(--colorsActionMajorYin090)";
    }

    return {
      color,
      hoverColor,
      disabledColor: "var(--colorsActionMajorYin030)",
    };
  },
  dark: (variant?: Variants) => {
    let color = "var(--colorsActionMajor350)";
    let hoverColor = "var(--colorsActionMajor450)";

    if (variant === "negative") {
      color = "var(--colorsSemanticNegative350)";
      hoverColor = "var(--colorsSemanticNegative450)";
    } else if (variant === "neutral") {
      color = "var(--colorsActionMinor100)";
    }

    return {
      color,
      hoverColor,
      disabledColor: "var(--colorsActionMajorYang030)",
    };
  },
};

/**
 * Returns the style object to be injected into the BaseLink wrapper via `$styles`.
 */
const StyledLinkStyles = ({
  variant = "default",
  disabled = false,
  isMenuItem,
  isSkipLink,
  iconAlign = "left",
  hasContent,
  hasFocus,
  isDarkBackground,
}: StyledLinkProps) => {
  const themeKey = isDarkBackground ? "dark" : "light";
  const { color, hoverColor, disabledColor } = colorMap[themeKey](variant);

  return css`
    display: inline-flex;
    align-items: center;

    ${!isSkipLink &&
    css`
      > a,
      > button {
        font-size: var(--fontSizes100);
        text-decoration: ${hasContent ? "underline" : "none"};
        ${isMenuItem && "display: inline-block;"}

        ${!disabled &&
      css`
          color: ${color};

          &:hover {
            color: ${hoverColor};
            cursor: pointer;
          }

          &:focus {
            background-color: var(--colorsSemanticFocus250);
            border-radius: var(--borderRadius025);
          }

          > ${StyledIcon} {
            color: ${color};

            &:hover {
              color: ${hoverColor};
            }
          }
        `}

        ${disabled &&
      css`
          color: ${disabledColor};
          cursor: not-allowed;

          &:hover,
          &:focus {
            color: ${disabledColor};
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
    `}

    ${!isSkipLink &&
    !disabled &&
    hasFocus &&
    css`
      box-shadow: 0 var(--spacing050) 0 0 var(--colorsUtilityYin090);
      border-bottom-left-radius: var(--borderRadius025);
      border-bottom-right-radius: var(--borderRadius025);
    `}

    > button,
    ${StyledButton}:not(.search-button) {
      background-color: transparent;
      border: none;
      padding: 0;
    }
  `;
};


export const StyledContent = styled.span``;
export default StyledLinkStyles;
