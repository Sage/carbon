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
import getColorValue from "../../style/utils/get-color-value";

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

const getIconColor = ({ disabled, color, theme }) => {
  if (disabled) {
    return "color: var(--colorsYin030)";
  }
  if (color) {
    const { color: renderedColor } = styledColor({ color, theme });
    return `&&&& {color: ${renderedColor}}`;
  }

  return "color: var(--colorsYin090)";
};

const getIconBgColor = ({ bg, theme }) => {
  if (bg) {
    const { backgroundColor } = styledColor({ bg, theme });
    return backgroundColor;
  }
  return "transparent";
};

const getIconHoverColor = ({ disabled, color, theme }) => {
  if (disabled) {
    return "var(--colorsYin030)";
  }
  if (color) {
    const { color: renderedColor } = styledColor({ color, theme });
    return shade(0.2, getColorValue(renderedColor));
  }

  return "var(--colorsYin090)";
};

const getIconBgHoverColor = ({ bg, theme }) => {
  if (bg) {
    const { backgroundColor } = styledColor({ bg, theme });
    return shade(0.2, getColorValue(backgroundColor));
  }
  return "transparent";
};

const StyledIcon = styled.span`
  ${({ isInteractive, bgSize, bgShape, type, fontSize, hasTooltip }) => {
    return css`
      position: relative;
      ${getIconColor};
      background-color: ${getIconBgColor};
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
          color: ${getIconHoverColor};
          background-color: ${getIconBgHoverColor};
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
          outline: 2px solid var(--colorsSemanticFocus500);
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
