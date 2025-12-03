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
  /** Sets the link style to bold */
  bold?: boolean;
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
    let color =
      "var(--link-typical-label-default, var(--colorsActionMajor500))";
    let hoverColor =
      "var(--link-typical-label-hover, var(--colorsActionMajor600))";
    const focusColor = "var(--focus-label, var(--colorsUtilityYin090))";
    const focusBgColor = "var(--focus-bg, var(--colorsSemanticFocus250))";
    const focusBoxShadowColor =
      "var(--focus-borderalt, var(--colorsUtilityYin090))";
    if (variant === "negative") {
      color =
        "var(--link-destructive-label-default, var(--colorsSemanticNegative500))";
      hoverColor =
        "var(--link-destructive-label-hover, var(--colorsSemanticNegative600))";
    } else if (variant === "subtle") {
      color = "var(--link-subtle-label-default, var(--colorsUtilityYin090))";
      hoverColor = "var(--link-subtle-label-hover, var(--colorsUtilityYin090))";
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
    let color =
      "var(--link-typical-inverse-label-default, var(--colorsActionMajor350))";
    let hoverColor =
      "var(--link-typical-inverse-label-hover, var(--colorsActionMajor450))";
    const focusColor =
      "var(--focus-inverse-label, var(--colorsUtilityYang100))";
    const focusBgColor = "var(--focus-inverse-bg, #885E00)";
    const focusBoxShadowColor = "var(--focus-inverse-borderalt, #FFB500)";

    if (variant === "negative") {
      color =
        "var(--link-destructive-inverse-label-default, var(--colorsSemanticNegative350))";
      hoverColor =
        "var(--link-destructive-inverse-label-hover, var(--colorsSemanticNegative600))";
    } else if (variant === "subtle") {
      color =
        "var(--link-subtle-inverse-label-default, var(--colorsUtilityYang100))";
      hoverColor =
        "var(--link-subtle-inverse-label-hover, var(--colorsUtilityYang100))";
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
    bold,
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
      linkSize === "medium"
        ? "var(--core-fontSize-static-large-step0, var(--fontSizes100))"
        : "var(--core-fontSize-static-large-step1, var(--fontSizes200))";
    const fontWeight = bold ? "600" : "400";

    return css`
      ${isSkipLink &&
      css`
        a {
          position: absolute;
          box-sizing: border-box;
          display: inline-flex;
          min-height: var(--global-size-m, var(--sizing500));
          padding: var(--global-space-comp-m, var(--spacing150))
            var(--global-space-comp-xl, var(--spacing300));
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          left: -999em;
          z-index: ${theme.zIndex.aboveAll};

          border: var(--global-borderwidth-s, var(--sizing025)) solid
            var(--focus-borderalt, var(--colorsUtilityYin090));
          box-shadow: var(----global-depth-lvl1, var(--boxShadow300));
          border-radius: 0
            var(--global-radius-action-m, var(----borderRadius100))
            var(--global-radius-action-m, var(----borderRadius100)) 0;
          background-color: var(--focus-bg, var(--colorsSemanticFocus500));

          font-size: ${fontSize};
          color: var(--link-subtle-label-default, var(--colorsUtilityYin090));
          text-decoration: underline;
          outline: none;

          &:focus {
            top: var(--global-space-comp-s, var(--spacing100));
            left: 0;
          }
        }
      `}

      ${!isSkipLink &&
      css`
        > a,
        > button {
          font-size: ${fontSize};
          font-weight: ${fontWeight};
          text-decoration: ${hasContent && underline === "always"
            ? "underline"
            : "none"};

          ${!disabled &&
          css`
            color: ${color};
            ${StyledIcon} {
              color: ${color};
            }

            &:hover {
              color: ${hoverColor};
              text-decoration: ${hasContent &&
              (underline === "hover" || underline === "always")
                ? "underline"
                : "none"};

              > ${StyledIcon} {
                color: ${hoverColor};
              }
            }

            &:not(:has(img, svg, picture)):focus {
              border-top-left-radius: var(
                --global-radius-action-xs,
                var(--borderRadius025)
              );
              border-top-right-radius: var(
                --global-radius-action-xs,
                var(--borderRadius025)
              );
              background-color: ${focusBgColor};
              color: ${focusColor};
              text-decoration: none;

              ${StyledIcon} {
                color: ${focusColor};
              }
            }

            &:has(img, svg, picture) {
              display: inline-block;
            }

            &:has(img, svg, picture):focus {
              ${addFocusStyling()}
              border-radius: var(--global-radius-action-xs, var(--borderRadius025));
              outline: default;
            }
          `}

          ${disabled &&
          css`
            color: ${disabledColor};
            &:hover,
            &:focus {
              cursor: not-allowed;
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
        ${isMenuItem && "display: inline-block;"}

        > ${StyledIcon} {
          display: ${hasContent ? "inline-block" : "inline"};
          position: relative;
          vertical-align: middle;
          ${iconAlign === "left" &&
          css`
            margin-right: ${hasContent
              ? "var(--global-space-comp-s, var(--spacing100))"
              : 0};
          `}
          ${iconAlign === "right" &&
          css`
            margin-right: 0;
            margin-left: ${hasContent
              ? "var(--global-space-comp-s, var(--spacing100))"
              : 0};
          `}
        }

        &:focus {
          outline: none;
        }
      }

      ${!isSkipLink &&
      !disabled &&
      hasFocus &&
      css`
        max-width: fit-content;
        box-shadow: 0 var(--global-size-5xs, var(--sizing050)) 0 0
          ${focusBoxShadowColor};
        border-bottom-left-radius: var(
          --global-radius-action-xs,
          var(--borderRadius025)
        );
        border-bottom-right-radius: var(
          --global-radius-action-xs,
          var(--borderRadius025)
        );

        &:has([data-popover-container-button="true"]) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
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
