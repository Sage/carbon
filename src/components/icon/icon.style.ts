import styled, { css } from "styled-components";
import { shade } from "polished";
import { margin } from "styled-system";

import iconUnicodes from "./icon-unicodes";
import baseTheme, { ThemeObject } from "../../style/themes/base";
import iconConfig from "./icon-config";
import { ExplicitUnion } from "../../__internal__/utils/helpers/types";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";
import styledColor from "../../style/utils/color";
import getColorValue from "../../style/utils/get-color-value";
import { IconType } from "./icon-type";

export type BackgroundShape = "circle" | "rounded-rect" | "square";

export type BgSize =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

export type FontSize = "small" | "medium" | "large" | "extra-large";

export interface StyledIconProps {
  /** Background colour, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Background shape */
  bgShape?: ExplicitUnion<BackgroundShape>;
  /** Background size */
  bgSize?: ExplicitUnion<BgSize>;
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
  fontSize?: ExplicitUnion<FontSize>;
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
  if (fontSize && fontSize !== "small") {
    return iconConfig.backgroundSize[fontSize];
  }

  return bgSize ? iconConfig.backgroundSize[bgSize] : undefined;
}

const StyledIcon = styled.span<StyledIconProps & StyledIconInternalProps>`
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
    let finalColor;
    let finalHoverColor;
    let bgColor;
    let bgHoverColor;

    try {
      if (disabled) {
        finalColor = "var(--colorsYin030)";
        finalHoverColor = "var(--colorsYin030)";
      } else if (color) {
        const { color: renderedColor } = styledColor({ color, theme });
        finalColor = renderedColor;
        finalHoverColor = shade(0.2, getColorValue(renderedColor));
      } else {
        finalColor = "var(--colorsYin090)";
        finalHoverColor = "var(--colorsYin090)";
      }

      if (bg) {
        const { backgroundColor } = styledColor({ bg, theme });
        bgColor = backgroundColor;
        bgHoverColor = shade(0.2, getColorValue(backgroundColor));
      } else {
        bgColor = "transparent";
        bgHoverColor = "transparent";
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    return css`
      position: relative;
      color: ${finalColor};
      background-color: ${bgColor};
      vertical-align: middle;
      align-items: center;
      display: inline-flex;
      justify-content: center;
      height: ${adjustIconBgSize(fontSize, bgSize)};
      width: ${adjustIconBgSize(fontSize, bgSize)};
      ${bgShape ? `border-radius: ${iconConfig.backgroundShape[bgShape]}` : ""};

      ${isInteractive &&
      css`
        &:hover {
          color: ${finalHoverColor};
          background-color: ${bgHoverColor};
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

        ${type === "services" &&
        browserTypeCheck(window) &&
        css`
          margin-top: ${fontSize === "small" ? "-7px" : "-8px"};
        `}

        ${type === "services" &&
        isSafari(navigator) &&
        !browserTypeCheck(window) &&
        css`
          margin-top: -6px;
        `}
        
        display: block;
      }

      ${hasTooltip &&
      `
        :focus {
          outline: 2px solid var(--colorsSemanticFocus500);
        }
      `}

      ${margin}
    `;
  }}
`;

StyledIcon.defaultProps = {
  theme: baseTheme,
};

export default StyledIcon;
