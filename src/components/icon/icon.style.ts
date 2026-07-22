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

export const ICON_COLOR_TYPES = [
  "neutral",
  "subtle",
  "caution",
  "info",
  "negative",
  "positive",
] as const;

export type IconColor = (typeof ICON_COLOR_TYPES)[number];

const ICON_STATUS_COLOR_TOKENS: Record<
  Exclude<IconColor, "neutral" | "subtle">,
  string
> = {
  caution: "var(--page-content-caution-icon)",
  info: "var(--page-content-info-icon)",
  negative: "var(--page-content-negative-icon)",
  positive: "var(--page-content-positive-icon)",
};

const getIconColorToken = (color: IconColor, inverse?: boolean) => {
  if (color === "neutral") {
    return `var(--page-content${inverse ? "-inverse" : ""}-icon-default)`;
  }

  if (color === "subtle") {
    return `var(--page-content${inverse ? "-inverse" : ""}-icon-alt)`;
  }

  // Status colors (caution, info, negative, positive) carry semantic meaning
  // that is independent of surface context, so they intentionally have no
  // inverse variant. The `inverse` prop is ignored for these presets.
  return ICON_STATUS_COLOR_TOKENS[color];
};

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
  /** Custom icon colour retained for backward compatibility. */
  $customColor?: string;
  /** Semantic icon color. */
  color?: IconColor;
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

  .legacy-search & {
    color: var(--colorsUtilityYin065);

    &:hover {
      color: var(--colorsUtilityYin100);
    }
  }

  .legacy-search.dark-background:not(.with-button) & {
    color: var(--colorsUtilityYang080);

    :hover {
      color: var(--colorsUtilityYang100);
    }
  }

  .multi-select &,
  .filterable-select & {
    cursor: pointer;
  }

  .button-toggle && {
    color: currentColor;
  }
`;

const StyledIcon = styled.span.attrs(applyBaseTheme)<
  StyledIconProps & StyledIconInternalProps
>`
  ${({
    theme,
    $customColor,
    color,
    bg,
    isInteractive,
    bgSize,
    bgShape,
    type,
    fontSize,
    disabled,
    tabIndex,
    inverse,
  }) => {
    let finalColor = getIconColorToken(color ?? "neutral", inverse);
    let bgColor = "transparent";

    const win = getWindow();
    const nav = getNavigator();
    const backgroundSize = bgSize
      ? iconConfig.backgroundSize[bgSize]
      : undefined;

    if (disabled) {
      finalColor = "var(--mode-color-action-inactive-icon)";
    } else if ($customColor) {
      const { color: renderedColor } = styledColor({
        color: $customColor,
        theme,
      });
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

      ${tabIndex !== undefined &&
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

  ${StyledNextButton} &, .popover-menu-item & {
    color: currentColor;
  }

  .mentions-list-item && {
    color: currentColor;
  }

  .mentions-list-item:hover &&,
  .mentions-list-item.selected && {
    color: currentColor;
  }
`;

export default StyledIcon;
