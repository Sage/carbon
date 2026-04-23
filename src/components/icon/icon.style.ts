import styled, { css } from "styled-components";

import { margin } from "styled-system";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import { ThemeObject } from "../../style/themes/theme.types";
import addFocusStyling from "../../style/utils/add-focus-styling";
import styledColor from "../../style/utils/color";
import { getNavigator, getWindow } from "../../__internal__/dom/globals";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";

import iconConfig from "./icon-config";
import { IconType } from "./icon-type";
import iconUnicodes from "./icon-unicodes";
import StyledNextButton from "../button/__next__/button.style";

export type BackgroundShape = "circle" | "rounded-rect" | "square";

export type BgSize = "small" | "medium" | "large" | "extra-large";

export type FontSize = "small" | "medium" | "large" | "extra-large";

export interface StyledIconProps {
  /** Background colour, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Background shape */
  bgShape?: BackgroundShape;
  /** Background size */
  bgSize?: BgSize;
  /**
   * @private
   * @ignore
   * Add classes to this component
   */
  className?: string;
  /** Icon colour, provide any color from palette or any valid css color value. */
  color?: string;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
  /** Icon font size */
  fontSize?: FontSize;
  /**
   * Icon type
   *
   * The full list of types can be seen [here](https://github.com/Sage/carbon/blob/master/src/components/icon/icon-config.js).
   */
  type: IconType;
  /**
   * Renders the Icon using the inverse colour token, suitable for use on dark backgrounds.
   */
  inverse?: boolean;
}

export interface StyledIconInternalProps {
  isInteractive?: boolean;
  hasTooltip?: boolean;
  theme?: ThemeObject;
}

const styleOverrides = css`
  ${StyledNextButton} & {
    color: currentColor;
  }

  .mentions-list-item && {
    color: currentColor;
  }

  .mentions-list-item:hover &&,
  .mentions-list-item.selected && {
    color: currentColor;
  }

  .search & {
    color: var(--colorsUtilityYin065);

    &:hover {
      color: var(--colorsUtilityYin100);
    }
  }

  .search.dark-background:not(.with-button) & {
    color: var(--colorsUtilityYang080);

    :hover {
      color: var(--colorsUtilityYang100);
    }
  }

  .multi-select &,
  .filterable-select & {
    cursor: pointer;
  }
`;

const StyledIcon = styled.span.attrs(applyBaseTheme)<
  StyledIconProps & StyledIconInternalProps
>`
  ${({
    theme,
    color,
    bg,
    isInteractive,
    bgSize,
    bgShape,
    type,
    fontSize,
    disabled,
    hasTooltip,
    inverse,
  }) => {
    let finalColor = inverse
      ? "var(--container-standard-inverse-icon)"
      : "var(--container-standard-icon)";
    let bgColor = "transparent";

    const win = getWindow();
    const nav = getNavigator();
    const backgroundSize = bgSize
      ? iconConfig.backgroundSize[bgSize]
      : undefined;

    if (disabled) {
      finalColor = "var(--colorsYin030)";
    } else if (color) {
      const { color: renderedColor } = styledColor({ color, theme });
      finalColor = renderedColor;
    }

    if (bg) {
      const { backgroundColor } = styledColor({ bg, theme });
      bgColor = backgroundColor;
    }

    return css`
      position: relative;
      color: ${finalColor};
      background-color: ${bgColor};
      vertical-align: middle;
      align-items: center;
      display: inline-flex;
      justify-content: center;
      height: ${backgroundSize};
      width: ${backgroundSize};
      ${bgShape ? `border-radius: ${iconConfig.backgroundShape[bgShape]}` : ""};

      ${isInteractive &&
      css`
        &:not(:focus):hover {
          filter: brightness(0.9);
        }
      `}

      &::before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        font-family: CarbonIcons;
        content: "${iconUnicodes[type]}";
        font-style: normal;
        font-weight: normal;
        vertical-align: middle;

        ${fontSize &&
        css`
          font-size: ${iconConfig.iconSize[fontSize]};
          line-height: ${iconConfig.iconSize[fontSize]};
        `}
        // FIXME: this can cause hydration mismatches during SSR.
        ${win &&
        type === "services" &&
        browserTypeCheck(win) &&
        css`
          margin-top: ${fontSize === "small" ? "-7px" : "-8px"};
        `}
        ${nav &&
        win &&
        type === "services" &&
        isSafari(nav) &&
        !browserTypeCheck(win) &&
        css`
          margin-top: -6px;
        `}

        display: block;
      }

      // We can remove this fully once we stop supporting tooltips
      ${hasTooltip &&
      // istanbul ignore next
      `
        :focus {
          ${addFocusStyling()}
        }
      `}

      ${margin}

      ${styleOverrides}
    `;
  }}
`;

export default StyledIcon;
