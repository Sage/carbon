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
    let color = "var(--link-typical-label-default)";
    let hoverColor = "var(--link-typical-label-hover)";
    const focusColor = "var(--focus-label)";
    const focusBgColor = "var(--focus-bg)";
    const focusBoxShadowColor = "var(--focus-borderalt)";
    if (variant === "negative") {
      color = "var(--link-destructive-label-default)";
      hoverColor = "var(--link-destructive-label-hover)";
    } else if (variant === "subtle") {
      color = "var(--link-subtle-label-default)";
      hoverColor = "var(--link-subtle-label-hover)";
    }

    return {
      color,
      hoverColor,
      focusColor,
      focusBgColor,
      focusBoxShadowColor,
    };
  },
  dark: (variant) => {
    let color = "var(--link-typical-inverse-label-default)";
    let hoverColor = "var(--link-typical-inverse-label-hover)";
    const focusColor = "var(--focus-inverse-label)";
    const focusBgColor = "var(--focus-inverse-bg)";
    const focusBoxShadowColor = "var(--focus-inverse-borderalt)";

    if (variant === "negative") {
      color = "var(--link-destructive-inverse-label-default)";
      hoverColor = "var(--link-destructive-inverse-label-hover)";
    } else if (variant === "subtle") {
      color = "var(--link-subtle-inverse-label-default)";
      hoverColor = "var(--link-subtle-inverse-label-hover)";
    }

    return {
      color,
      hoverColor,
      focusColor,
      focusBgColor,
      focusBoxShadowColor,
    };
  },
};

const getFontStyle = (linkSize?: "medium" | "large", bold?: boolean) => {
  let font: string;

  if (linkSize === "large") {
    font = bold
      ? "--global-font-static-comp-lined-medium-l"
      : "--global-font-static-comp-regular-l";
  } else {
    font = bold
      ? "--global-font-static-comp-lined-medium-m"
      : "--global-font-static-comp-regular-m";
  }

  return css`
    font: var(${font});
  `;
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
    const { color, hoverColor, focusColor, focusBgColor, focusBoxShadowColor } =
      colorMap[colorMapKey](variant);

    return css`
      ${isSkipLink &&
      css`
        a {
          position: absolute;
          box-sizing: border-box;
          display: inline-flex;
          min-height: var(--global-size-m);
          padding: var(--global-space-comp-m) var(--global-space-comp-xl);
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          left: -999em;
          z-index: ${theme.zIndex.aboveAll};

          border: var(--global-borderwidth-s) solid var(--focus-borderalt);
          box-shadow: var(--global-depth-lvl1);
          border-radius: 0 var(--global-radius-action-m)
            var(--global-radius-action-m) 0;
          background-color: var(--focus-bg);

          font: var(--global-font-static-comp-regular-m);
          color: var(--link-subtle-label-default);
          text-decoration: underline;
          outline: none;

          &:focus {
            top: var(--global-space-comp-s);
            left: 0;
          }
        }
      `}

      ${!isSkipLink &&
      !isMenuItem &&
      css`
        > a,
        > button {
          ${getFontStyle(linkSize, bold)}
          text-decoration: ${hasContent && underline === "always"
            ? "underline"
            : "none"};

          ${!disabled &&
          css`
            color: ${color};
            ${StyledIcon} {
              width: 20px;
              height: 20px;
              color: ${color};

              ::before {
                font-size: 18px;
                line-height: 18px;
              }

              ${iconAlign === "left" &&
              css`
                margin-right: ${hasContent ? "var(--global-space-comp-s)" : 0};
              `}

              ${iconAlign === "right" &&
              /* istanbul ignore next: tested in chromatic, couldn't test in jest */
              css`
                margin-right: 0;
                margin-left: ${
                  /* istanbul ignore next */ hasContent
                    ? "var(--global-space-comp-s)"
                    : 0
                };
              `}
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
              color: ${focusColor};
              text-decoration: none;

              ${StyledIcon} {
                color: ${focusColor};
              }
            }

            &:has(img, svg, picture) {
              display: inline-block;
              vertical-align: middle;
            }

            &:has(img, svg, picture):focus {
              ${addFocusStyling()}
              border-radius: var(--global-radius-action-xs);
              outline: default;
            }
          `}

          ${disabled &&
          css`
            color: var(--colorsActionMajorYin030);
            &:hover,
            &:focus {
              cursor: not-allowed;
              color: var(--colorsActionMajorYin030);
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
        }

        &:focus {
          outline: none;
        }
      }

      ${!isSkipLink &&
      !disabled &&
      !isMenuItem &&
      hasFocus &&
      css`
        max-width: fit-content;
        &:not(:has(img, svg, picture)) {
          border-radius: var(--global-radius-action-xs);
          background-color: ${focusBgColor};
          box-shadow: 0 var(--global-size-5-xs) 0 0 ${focusBoxShadowColor};
        }

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
