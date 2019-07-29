import styled, { css } from 'styled-components';
import '../../style/fonts/fonts.css';
import classicConfig from './icon-classic-config';
import iconUnicodes from './icon-unicodes';
import classicIconStyles from './icon-classic.style';
import baseTheme from '../../style/themes/base';

const getBackgroundColor = (theme, bgTheme) => {
  const statuses = ['info', 'error', 'success', 'warning'];
  if (statuses.includes(bgTheme)) return theme.colors[bgTheme];
  if (bgTheme === 'business') return theme.colors.primary;
  return 'transparent';
};

const getIconColor = (bgTheme, theme, iconColor) => {
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

const StyledIcon = styled.span`
  ${({
    bgTheme, theme, iconColor, bgSize, bgShape, isFont, type, fontSize
  }) => css`
  display: inline-block;
  position: relative;
  color: ${getIconColor(bgTheme, theme, iconColor)};

    ${bgTheme !== 'none'
      && css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${classicConfig.sizes[bgSize]};
        width: ${classicConfig.sizes[bgSize]};
        background-color: ${getBackgroundColor(theme, bgTheme)};
        border-radius: ${classicConfig.shapes[bgShape]};
      `}

    ${isFont
      && css`
        &::before {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          font-family: CarbonIcons;
          content: "${iconUnicodes[type]}";
          font-size: ${fontSize === 'large' ? '24px' : '16px'};
          font-style: normal;
          font-weight: normal;
          line-height: ${fontSize === 'large' ? '24px' : '16px'};
          vertical-align: middle;
        }
    `}
    ${classicIconStyles};
  `}
`;

StyledIcon.defaultProps = {
  theme: baseTheme
};

const StyledSvgIcon = styled.span`
  display: inline-block;

  .carbon-icon__svg {
    fill: currentColor;
  }
`;

export { StyledIcon, StyledSvgIcon };
