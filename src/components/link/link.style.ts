import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

type Variants = "default" | "negative" | "neutral";
export interface StyledLinkProps {
  /** The disabled state of the link. */
  disabled?: boolean;
  /** Which side of the link to the render the link. */
  iconAlign?: "left" | "right";
  /** Allows to create skip link */
  isSkipLink?: boolean;
  /** Sets the colour styling when component is rendered on a dark background */
  isDarkBackground?: boolean;
  /** Allows link styling to be updated for light or dark backgrounds */
  variant?: Variants;
  hasFocus?: boolean;
}
interface PrivateStyledLinkProps {
  hasContent: boolean;
  isMenuItem?: boolean;
}

interface LinkColors {
  color: string;
  hoverColor: string;
  disabledColor: string;
}

type ColorMapProp = (variant?: Variants) => LinkColors;

interface ColorMap {
  light: ColorMapProp;
  dark: ColorMapProp;
}

const colorMap: ColorMap = {
  light: (variant) => {
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
  dark: (variant) => {
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

const StyledLink = styled.span<StyledLinkProps & PrivateStyledLinkProps>`
  ${({
    isSkipLink,
    theme,
    iconAlign,
    hasContent,
    disabled,
    variant,
    isDarkBackground,
    isMenuItem,
    hasFocus,
  }) => {
    const colorMapKey = isDarkBackground ? "dark" : "light";
    const { color, hoverColor, disabledColor } = colorMap[colorMapKey](variant);

    return css`
      ${isSkipLink &&
      css`
        a {
          position: absolute;
          padding-left: var(--spacing300);
          padding-right: var(--spacing300);
          line-height: 36px;
          left: -999em;
          z-index: ${theme.zIndex.aboveAll};
          box-shadow: inset 0 0 0 var(--spacing025) var(--colorsActionMajor500);
          border: var(--spacing025) solid var(--colorsUtilityYang100);
          font-size: var(--fontSizes200);
          color: var(--colorsUtilityYin090);

          &:hover {
            cursor: pointer;
            color: var(--colorsUtilityYin090);

            ${StyledIcon} {
              color: var(--colorsActionMajor600);
            }
          }

          &:focus {
            background-color: var(--colorsUtilityYang100);
          }
        }

        a:focus {
          top: var(--spacing100);
          left: var(--spacing100);
        }
      `}

      ${!isSkipLink &&
      css`
        > a,
        > button {
          font-size: var(--fontSizes100);

          ${!disabled &&
          css`
            color: ${color};
            ${StyledIcon} {
              color: ${color};
            }

            &:hover {
              color: ${hoverColor};

              > ${StyledIcon} {
                color: ${hoverColor};
              }
            }

            &:focus {
              background-color: var(--colorsSemanticFocus250);
              border-radius: var(--borderRadius025);
            }
          `}

          ${disabled &&
          css`
            color: ${disabledColor};
            &:hover,
            &:focus {
              color: ${disabledColor};
            }
          `}
        }
      `}

      > a,
      > button {
        text-decoration: ${hasContent ? "underline" : "none"};
        ${isMenuItem && "display: inline-block;"}

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
            margin-right: 0;
            margin-left: ${hasContent ? "var(--spacing100)" : 0};
          `}
        }

        &:hover {
          cursor: pointer;
        }

        &:focus {
          color: var(--colorsActionMajorYin090);
          outline: none;

          ${StyledIcon} {
            color: var(--colorsActionMajorYin090);
          }
        }

        ${disabled &&
        css`
          &:hover,
          &:focus {
            cursor: not-allowed;
          }
        `}
      }

      ${!isSkipLink &&
      !disabled &&
      !theme.focusRedesignOptOut &&
      hasFocus &&
      css`
        > a,
        > button {
          outline: none;
          text-decoration: none;
          border-bottom-left-radius: var(--borderRadius000);
          border-bottom-right-radius: var(--borderRadius000);
        }
        max-width: fit-content;
        box-shadow: 0 var(--spacing050) 0 0 var(--colorsUtilityYin090);
        border-bottom-left-radius: var(--borderRadius025);
        border-bottom-right-radius: var(--borderRadius025);
      `}

      > button {
        background-color: transparent;
        border: none;
        padding: 0;
      }
    `;
  }}
`;

StyledLink.defaultProps = {
  theme: baseTheme,
  disabled: false,
  hasContent: true,
};

const StyledContent = styled.span``;

export { StyledLink, StyledContent };
