import styled, { css } from 'styled-components';
import '../../style/fonts/fonts.css';
import iconUnicodes from './icon-unicodes';
import classicIconStyles from './icon-classic.style';
import baseTheme from '../../style/themes/base';

const getBackgroundColor = (theme, bgTheme, disabled) => {
  if (disabled) return theme.icon.disabled;
  const statuses = ['info', 'error', 'success', 'warning'];
  if (statuses.includes(bgTheme)) return theme.colors[bgTheme];
  if (bgTheme === 'business') return theme.colors.primary;
  return 'transparent';
};

const getIconColor = (bgTheme, theme, iconColor, disabled) => {
  if (disabled) return theme.icon.disabled;

  if (bgTheme !== 'none') {
    const whiteIconBackgrounds = ['error', 'info', 'business'];
    const darkIconBackgrounds = ['success', 'warning'];

    if (whiteIconBackgrounds.includes(bgTheme)) return theme.colors.white;
    if (darkIconBackgrounds.includes(bgTheme)) return theme.icon.default;
  }

  switch (iconColor) {
    case 'on-dark-background':
      return theme.colors.white;
    case 'on-light-background':
      return theme.icon.onLightBackground;
    case 'business-color':
      return theme.colors.primary;
    default:
      return theme.icon.default;
  }
};

const backgroundSize = {
  small: '24px',
  medium: '32px',
  large: '40px'
};

const backgroundShapes = {
  square: '0%',
  'rounded-rect': '20%',
  circle: '50%'
};

const iconSize = {
  small: '16px',
  large: '24px'
};

const StyledIcon = styled.span`
  ${({
    bgTheme, theme, iconColor, bgSize, bgShape, isFont, type, fontSize, disabled
  }) => css`
    display: inline-block;
    position: relative;
    color: ${getIconColor(bgTheme, theme, iconColor, disabled)};

    ${bgTheme !== 'none'
      && css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${backgroundSize[bgSize]};
        width: ${backgroundSize[bgSize]};
        background-color: ${getBackgroundColor(theme, bgTheme, disabled)};
        border-radius: ${backgroundShapes[bgShape]};
      `}

    ${isFont
      && css`
      &::before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        font-family: CarbonIcons;
        content: "${iconUnicodes[type]}";
        font-size: ${iconSize[fontSize]};
        font-style: normal;
        font-weight: normal;
        line-height: ${iconSize[fontSize]};
        vertical-align: middle;
      }
    `}

    ${classicIconStyles};
  `}
`;

StyledIcon.defaultProps = {
  theme: baseTheme
};

const StyledSvgIconWrapper = styled.span`
  display: inline-block;

  svg {
    fill: currentColor;
  }
`;

export { StyledIcon, StyledSvgIconWrapper };
