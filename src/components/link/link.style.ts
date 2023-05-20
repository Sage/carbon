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
  }) => {
    const colorMapKey = isDarkBackground ? "dark" : "light";
    const { color, hoverColor, disabledColor } = colorMap[colorMapKey](variant);

    return css`
      ${isSkipLink &&
      css`
        a {
          position: absolute;
          padding-left: 24px;
          padding-right: 24px;
          line-height: 36px;
          left: -999em;
          z-index: ${theme.zIndex.aboveAll};
          box-shadow: inset 0 0 0 2px var(--colorsActionMajor500);
          border: 2px solid var(--colorsUtilityYang100);
          font-size: 16px;
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
            box-shadow: inset 0 -2px 0 0 rgb(231, 28, 28),
              inset 0 -4px 0 0 rgb(33, 206, 33);
          }
        }

        a:focus {
          top: 8px;
          left: 8px;
        }
      `}

      ${!isSkipLink &&
      css`
        a,
        button {
          font-size: 14px;

          ${!disabled &&
          css`
            color: ${color};
            ${StyledIcon} {
              color: ${color};
            }

            &:hover {
              color: ${hoverColor};

              ${StyledIcon} {
                color: ${hoverColor};
              }
            }

            &:focus {
              background-color: var(--colorsSemanticFocus250);
              border-radius: var(--borderRadius050);
              box-shadow: inset 0 -4px 0 0 var(--colorsSemanticFocus500),
                inset 0 -6px 0 0 var(--colorsUtilityYin090);
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

      a,
      button {
        text-decoration: underline;
        ${isMenuItem && "display: inline-block;"}

        > ${StyledIcon} {
          display: inline-block;
          position: relative;
          vertical-align: middle;
          ${iconAlign === "left" &&
          css`
            margin-right: ${hasContent ? "var(--spacing100)" : 0};
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

      button {
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
