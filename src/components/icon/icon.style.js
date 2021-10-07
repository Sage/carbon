import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { shade } from "polished";
import { margin } from "styled-system";

import iconUnicodes from "./icon-unicodes";
import baseTheme from "../../style/themes/base";
import generatePalette from "../../style/palette";
import iconSizeConfig, {
  ICON_BACKGROUNDS,
  ICON_COLORS,
  ICON_SHAPES,
} from "./icon-config";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";
import styledColor from "../../style/utils/color";

const getBackgroundColor = (theme, bgTheme, disabled, isHover) => {
  if (bgTheme !== "none") {
    if (disabled) return theme.icon.disabled;
  }

  const palette = generatePalette({
    statusColor: theme.colors[bgTheme],
    businessColor: theme.colors.primary,
  });
  const statuses = ["info", "error", "success", "warning"];
  if (statuses.includes(bgTheme)) {
    return isHover ? palette.statusColorShade(20) : theme.colors[bgTheme];
  }

  if (bgTheme === "business") {
    return isHover ? palette.businessColorShade(20) : theme.colors.primary;
  }

  return "transparent";
};

const getIconColor = (bgTheme, theme, iconColor, disabled, isHover) => {
  if (disabled) return theme.icon.disabled;

  if (bgTheme !== "none") {
    const whiteIconBackgrounds = ["error", "info", "business"];
    const darkIconBackgrounds = ["success", "warning"];

    if (whiteIconBackgrounds.includes(bgTheme)) return theme.colors.white;

    if (darkIconBackgrounds.includes(bgTheme)) {
      return isHover ? theme.icon.defaultHover : theme.icon.default;
    }
  }

  const palette = generatePalette({ businessColor: theme.colors.primary });

  switch (iconColor) {
    case "on-dark-background":
      return theme.colors.white;
    case "on-light-background":
      return isHover
        ? theme.icon.onLightBackgroundHover
        : theme.icon.onLightBackground;
    case "business-color":
      return isHover ? palette.businessColorShade(20) : theme.colors.primary;
    default:
      return isHover ? theme.icon.defaultHover : theme.icon.default;
  }
};

function adjustIconBgSize(fontSize, bgSize) {
  const replacements = {
    medium: {
      small: "medium",
    },
    large: {
      small: "large",
      medium: "large",
    },
    "extra-large": {
      small: "extra-large",
      medium: "extra-large",
      large: "extra-large",
    },
  };

  const replacement = replacements?.[fontSize]?.[bgSize];

  if (replacement) {
    return iconSizeConfig.backgroundSize[replacement];
  }

  return iconSizeConfig.backgroundSize[bgSize];
}

const StyledIcon = styled.span`
  ${({
    bgTheme,
    theme,
    color,
    bg,
    isInteractive,
    iconColor,
    bgSize,
    bgShape,
    type,
    fontSize,
    disabled,
  }) => {
    let finalColor;
    let finalHoverColor;
    let bgColor;
    let bgHoverColor;

    try {
      if (color) {
        const { color: renderedColor } = styledColor({ color, theme });
        finalColor = renderedColor;
        finalHoverColor = shade(0.2, renderedColor);
      } else {
        finalColor = getIconColor(bgTheme, theme, iconColor, disabled, false);
        finalHoverColor = getIconColor(
          bgTheme,
          theme,
          iconColor,
          disabled,
          true
        );
      }

      if (bg) {
        const { backgroundColor } = styledColor({ bg, theme });
        bgColor = backgroundColor;
        bgHoverColor = shade(0.2, backgroundColor);
      } else {
        bgColor = getBackgroundColor(theme, bgTheme, disabled, false);
        bgHoverColor = getBackgroundColor(theme, bgTheme, disabled, true);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return css`
      display: inline-block;
      position: relative;
      color: ${finalColor};
      background-color: ${bgColor};
      vertical-align: middle;

      ${isInteractive &&
      css`
        &:hover {
          color: ${finalHoverColor};
          background-color: ${bgHoverColor};
        }
      `}

      ${bgTheme !== "none" &&
      css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${adjustIconBgSize(fontSize, bgSize)};
        width: ${adjustIconBgSize(fontSize, bgSize)};
        border-radius: ${iconSizeConfig.backgroundShape[bgShape]};
      `}

      &::before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        font-family: CarbonIcons;
        content: "${iconUnicodes[type]}";
        font-size: ${iconSizeConfig.iconSize[fontSize]};
        font-style: normal;
        font-weight: normal;
        line-height: ${iconSizeConfig.iconSize[fontSize]};
        vertical-align: middle;

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

      ${margin}
    `;
  }}
`;

StyledIcon.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string,
  isInteractive: PropTypes.bool,
  disabled: PropTypes.bool,
  bgSize: PropTypes.oneOf([
    "extra-small",
    "small",
    "medium",
    "large",
    "extra-large",
  ]),
  bgShape: PropTypes.oneOf(ICON_SHAPES),
  bgTheme: PropTypes.oneOf([...ICON_COLORS, ...ICON_BACKGROUNDS, ""]),
  fontSize: PropTypes.oneOf(["small", "medium", "large", "extra-large"]),
  iconColor: PropTypes.oneOf(ICON_COLORS),
};

StyledIcon.defaultProps = {
  theme: baseTheme,
};

export default StyledIcon;
