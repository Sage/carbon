import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { shade } from "polished";
import { margin } from "styled-system";

import iconUnicodes from "./icon-unicodes";
import baseTheme from "../../style/themes/base";
import iconSizeConfig, { ICON_SHAPES } from "./icon-config";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";
import styledColor from "../../style/utils/color";

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
        finalColor = theme.icon.disabled;
        finalHoverColor = theme.icon.disabled;
      } else if (color) {
        const { color: renderedColor } = styledColor({ color, theme });
        finalColor = renderedColor;
        finalHoverColor = shade(0.2, renderedColor);
      } else {
        finalColor = theme.icon.default;
        finalHoverColor = theme.icon.defaultHover;
      }

      if (bg) {
        const { backgroundColor } = styledColor({ bg, theme });
        bgColor = backgroundColor;
        bgHoverColor = shade(0.2, backgroundColor);
      } else if (disabled) {
        bgColor = theme.icon.disabled;
        bgHoverColor = theme.icon.disabled;
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
      border-radius: ${iconSizeConfig.backgroundShape[bgShape]};

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

      ${hasTooltip &&
      `
        :focus {
          outline: 2px solid ${theme.colors.focus};
        }
      `}

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
  fontSize: PropTypes.oneOf(["small", "medium", "large", "extra-large"]),
};

StyledIcon.defaultProps = {
  theme: baseTheme,
};

export default StyledIcon;
