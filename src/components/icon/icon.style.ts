import styled, { css } from "styled-components";

import { margin } from "styled-system";

import Logger from "../../__internal__/utils/logger";

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
}

export interface StyledIconInternalProps {
  isInteractive?: boolean;
  hasTooltip?: boolean;
  theme?: ThemeObject;
}

function adjustIconBgSize(fontSize?: FontSize, bgSize?: BgSize) {
  const sizeValues: Record<BgSize | FontSize, number> = {
    small: 1,
    medium: 2,
    large: 3,
    "extra-large": 4,
  };

  if (fontSize && bgSize) {
    const fontSizeValue = sizeValues[fontSize];
    const bgSizeValue = sizeValues[bgSize];

    if (bgSizeValue < fontSizeValue) {
      Logger.warn(
        `[WARNING - Icon] The "${bgSize}" \`bgSize\` is smaller than "${fontSize}" \`fontSize\`, the \`bgSize\` has been auto adjusted to a larger size.`,
      );
      return iconConfig.backgroundSize[fontSize];
    }

    return iconConfig.backgroundSize[bgSize];
  }

  /* The below is ignored as removing it may cause regressions as some components import StyledIcon directly from this file
  however it cannot be tested in the Icon tests as these props always have a value. */
  /* istanbul ignore next */
  return bgSize ? iconConfig.backgroundSize[bgSize] : undefined;
}

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
  }) => {
    let finalColor = "var(--colorsYin090)";
    let bgColor = "transparent";

    const win = getWindow();
    const nav = getNavigator();
    const adjustedBgSize = adjustIconBgSize(fontSize, bgSize);

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
      height: ${adjustedBgSize};
      width: ${adjustedBgSize};
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

      ${hasTooltip &&
      `
        :focus {
          ${addFocusStyling()}
        }
      `}

      ${margin}
    `;
  }}

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
`;

export default StyledIcon;
