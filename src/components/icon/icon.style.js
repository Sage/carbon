import styled, { css } from 'styled-components';
import '../../style/fonts/fonts.css';
import iconUnicodes from './icon-unicodes';
import classicIconStyles from './icon-classic.style';
import baseTheme from '../../style/themes/base';
import generatePalette from '../../style/palette';
import dlsConfig from './icon-config';

const getBackgroundColor = (theme, bgTheme, disabled, isHover) => {
  if (disabled) return theme.icon.disabled;

  const palette = generatePalette({ statusColor: theme.colors[bgTheme], businessColor: theme.colors.primary });
  const statuses = ['info', 'error', 'success', 'warning'];
  if (statuses.includes(bgTheme)) {
    return isHover ? palette.statusColorShade(20) : theme.colors[bgTheme];
  }

  if (bgTheme === 'business') {
    return isHover ? palette.businessColorShade(20) : theme.colors.primary;
  }

  return 'transparent';
};

const getIconColor = (bgTheme, theme, iconColor, disabled, isHover) => {
  if (disabled) return theme.icon.disabled;

  if (bgTheme !== 'none') {
    const whiteIconBackgrounds = ['error', 'info', 'business'];
    const darkIconBackgrounds = ['success', 'warning'];

    if (whiteIconBackgrounds.includes(bgTheme)) return theme.colors.white;

    if (darkIconBackgrounds.includes(bgTheme)) {
      return isHover ? theme.icon.defaultHover : theme.icon.hover;
    }
  }

  const palette = generatePalette({ businessColor: theme.colors.primary });
  switch (iconColor) {
    case 'on-dark-background':
      return theme.colors.white;
    case 'on-light-background':
      return isHover ? theme.icon.onLightBackgroundHover : theme.icon.onLightBackground;
    case 'business-color':
      return isHover ? palette.businessColorShade(20) : theme.colors.primary;
    default:
      return isHover ? theme.icon.defaultHover : theme.icon.default;
  }
};

const StyledIcon = styled.span`
  ${({
    bgTheme, theme, iconColor, bgSize, bgShape, isFont, type, fontSize, disabled
  }) => css`
    display: inline-block;
    position: relative;
    color: ${getIconColor(bgTheme, theme, iconColor, disabled, false)};

    &:hover {
      color: ${getIconColor(bgTheme, theme, iconColor, disabled, true)};
    }

    ${bgTheme !== 'none'
      && css`
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: ${dlsConfig.backgroundSize[bgSize]};
        width: ${dlsConfig.backgroundSize[bgSize]};
        background-color: ${getBackgroundColor(theme, bgTheme, disabled, false)};
        border-radius: ${dlsConfig.backgroundShape[bgShape]};

        &:hover {
          background-color: ${getBackgroundColor(theme, bgTheme, disabled, true)};
        }
      `}

    ${isFont
      && css`
      &::before {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        font-family: CarbonIcons;
        content: "${iconUnicodes[type]}";
        font-size: ${dlsConfig.iconSize[fontSize]};
        font-style: normal;
        font-weight: normal;
        line-height: ${dlsConfig.iconSize[fontSize]};
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
  ${({ fontSize }) => css`
    display: inline-block;

    svg {
      fill: currentColor;
      width: ${dlsConfig.iconSize[fontSize]};
      height: ${dlsConfig.iconSize[fontSize]};
    }
  `}
`;

export { StyledIcon, StyledSvgIconWrapper };
