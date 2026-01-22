import styled, { css } from "styled-components";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";

/** @deprecated The value 'default' for the variant prop is deprecated and will soon be removed. Please use value 'typical' instead. */
type DeprecatedDefaultVariant = "default";

/** @deprecated The value 'neutral' for the variant prop is deprecated and will soon be removed. Please use value 'subtle' instead. */
type DeprecatedNeutralVariant = "neutral";

type Variants =
  | "typical"
  | "negative"
  | "subtle"
  | DeprecatedDefaultVariant
  | DeprecatedNeutralVariant;

export interface StyledLinkProps {
  /** @deprecated The disabled state of the link. This prop is deprecated and will soon be removed. */
  disabled?: boolean;
  /** Specifies when the link underline should be displayed. */
  underline?: "always" | "hover" | "never";
  /** Which side of the link to the render the link. */
  iconAlign?: "left" | "right";
  /** Allows to create skip link */
  isSkipLink?: boolean;
  /** Allows link styling to be updated for light or dark backgrounds */
  variant?: Variants;
  hasFocus?: boolean;
  /** Sets the correct link size */
  linkSize?: "medium" | "large";
  /** Sets the colour styling when component is rendered on a dark background */
  inverse?: boolean;
  /** @deprecated The 'isDarkBackground' prop in Link is deprecated and will soon be removed. Please use 'inverse' prop instead. */
  isDarkBackground?: boolean;
}

interface PrivateStyledLinkProps {
  hasContent: boolean;
  isMenuItem?: boolean;
}

interface LinkColors {
  color: string;
  hoverColor: string;
  disabledColor: string;
  focusColor: string;
  focusBgColor: string;
  focusBoxShadowColor: string;
}

type ColorMapProp = (variant?: Variants) => LinkColors;

interface ColorMap {
  light: ColorMapProp;
  dark: ColorMapProp;
}

const colorMap: ColorMap = {
  light: (variant) => {
    let color = "#08711E";
    let hoverColor = "#10601C";
    const focusColor = "#000000";
    const focusBgColor = "#FFD27E";
    const focusBoxShadowColor = "#000000";

    if (variant === "negative") {
      color = "#B23342";
      hoverColor = "#9F303C";
    } else if (variant === "subtle") {
      color = "#000000E5";
      hoverColor = "#000000";
    }

    return {
      color,
      hoverColor,
      disabledColor: "var(--colorsActionMajorYin030)",
      focusColor,
      focusBgColor,
      focusBoxShadowColor,
    };
  },
  dark: (variant) => {
    let color = "#4EDC54";
    let hoverColor = "#72E26F";
    const focusColor = "#FFFFFF";
    const focusBgColor = "#926916";
    const focusBoxShadowColor = "#FFB500";

    if (variant === "negative") {
      color = "#E85B66";
      hoverColor = "#ED6E74";
    } else if (variant === "subtle") {
      color = "var(--colorsUtilityYang100)";
      hoverColor = "var(--colorsUtilityYang100)";
    }

    return {
      color,
      hoverColor,
      disabledColor: "var(--colorsActionMajorYang030)",
      focusColor,
      focusBgColor,
      focusBoxShadowColor,
    };
  },
};

const StyledLink = styled.span.attrs(applyBaseTheme)<
  StyledLinkProps & PrivateStyledLinkProps
>`
  ${({
    isSkipLink,
    theme,
    iconAlign,
    hasContent,
    disabled,
    underline,
    variant,
    inverse,
    isMenuItem,
    hasFocus,
    linkSize,
  }) => {
    const colorMapKey = inverse ? "dark" : "light";
    const {
      color,
      hoverColor,
      disabledColor,
      focusColor,
      focusBgColor,
      focusBoxShadowColor,
    } = colorMap[colorMapKey](variant);
    const fontSize =
      linkSize === "medium" ? "var(--fontSizes100)" : "var(--fontSizes200)";

    return css`
      ${isSkipLink &&
      css`
        a {
          position: absolute;
          padding-left: var(--spacing300);
          padding-right: var(--spacing300);
          line-height: var(--sizing600);
          left: -999em;
          z-index: ${theme.zIndex.aboveAll};
          border: 3px solid var(--colorsUtilityYin100);
          box-shadow: var(--boxShadow300);
          border-radius: var(--spacing000) var(--spacing100) var(--spacing100)
            var(--spacing000);
          font-size: ${fontSize};
          color: var(--colorsUtilityYin090);

          &:hover {
            cursor: pointer;
            color: var(--colorsUtilityYin090);

            ${StyledIcon} {
              color: var(--colorsActionMajor600);
            }
          }

          &:focus {
            background-color: var(--colorsSemanticFocus500);
            text-decoration: underline var(--colorsUtilityYin100);
            text-decoration-thickness: 4px;
            text-underline-offset: 3px;
            -webkit-text-decoration: underline var(--colorsUtilityYin100);
            -webkit-text-decoration-thickness: 4px;
            -webkit-text-underline-offset: 3px;
          }
        }

        a:focus {
          top: var(--spacing100);
          left: var(--spacing000);
        }
      `}

      ${!isSkipLink &&
      css`
        > a,
        > button {
          font-size: ${fontSize};

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

            &:not(:has(img, svg, picture)):focus {
              background-color: ${focusBgColor};
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

      ${!disabled &&
      css`
        > a:any-link:hover,
        > button:hover {
          cursor: pointer;
        }
      `}

      > a,
      > button {
        text-decoration: ${hasContent && underline === "always"
          ? "underline"
          : "none"};

        :hover {
          text-decoration: ${
            /* istanbul ignore next - having issues testing CSS :hover pseudo-states in jsdom */
            hasContent && (underline === "hover" || underline === "always")
              ? "underline"
              : "none"
          };
        }

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

        &:focus {
          color: ${focusColor};

          ${StyledIcon} {
            color: ${focusColor};
          }

          outline: none;
        }

        ${!disabled &&
        css`
          &:has(img, svg, picture) {
            display: inline-block;
            vertical-align: middle;
          }

          &:has(img, svg, picture):focus {
            ${addFocusStyling()}
            border-radius: var(--borderRadius025);
            outline: default;
          }
        `}

        ${disabled &&
        css`
          cursor: not-allowed;
        `}
      }

      ${!isSkipLink &&
      !disabled &&
      hasFocus &&
      css`
        > a,
        > button {
          outline: none;
          text-decoration: underline;
          border-bottom-left-radius: var(--borderRadius000);
          border-bottom-right-radius: var(--borderRadius000);
        }
        max-width: fit-content;
        box-shadow: 0 var(--spacing050) 0 0 ${focusBoxShadowColor};
        border-bottom-left-radius: var(--borderRadius025);
        border-bottom-right-radius: var(--borderRadius025);

        &:has([data-popover-container-button="true"]) {
          border-bottom-left-radius: var(--borderRadius000);
          border-bottom-right-radius: var(--borderRadius000);
        }
      `}

      ${!disabled &&
      hasFocus &&
      css`
        &:has(img, svg, picture) {
          > a,
          > button {
            ${addFocusStyling()}
          }
        }
      `}

      > button, ${StyledButton}:not(.search-button) {
        background-color: transparent;
        border: none;
        padding: 0;
      }
    `;
  }}
`;

const StyledContent = styled.span``;

export { StyledLink, StyledContent };
