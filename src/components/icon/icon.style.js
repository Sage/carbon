import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import '../../style/fonts/fonts.css';
import iconUnicodes from './icon-unicodes';
import classicIconStyles from './icon-classic.style';
import baseTheme from '../../style/themes/base';
import generatePalette from '../../style/palette';
import iconSizeConfig from './icon-config';
import OptionsHelper from '../../utils/helpers/options-helper';
import browserTypeCheck, { isSafari } from '../../utils/helpers/browser-type-check';

const getBackgroundColor = (theme, bgTheme, disabled, isHover) => {
  if (bgTheme !== 'none') {
    if (disabled) return theme.icon.disabled;
  }

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
      return isHover ? theme.icon.defaultHover : theme.icon.default;
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

function adjustIconBgSize(fontSize, bgSize) {
  if (fontSize === 'large' && (bgSize === 'small' || bgSize === 'medium')) {
    return iconSizeConfig.backgroundSize.large;
  }

  return iconSizeConfig.backgroundSize[bgSize];
}

const StyledIcon = styled.span`
  ${({
    bgTheme, theme, iconColor, bgSize, bgShape, type, fontSize, disabled
  }) => css`

    display: inline-block;
    position: relative;
    color: ${getIconColor(bgTheme, theme, iconColor, disabled, false)};
    background-color: ${getBackgroundColor(theme, bgTheme, disabled, false)};

    &:hover {
      color: ${getIconColor(bgTheme, theme, iconColor, disabled, true)};
      background-color: ${getBackgroundColor(theme, bgTheme, disabled, true)};
    }

    ${bgTheme !== 'none' && css`
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
      ${type === 'services' && browserTypeCheck(window) && css`
        margin-top: ${fontSize === 'small' ? '-7px' : '-8px'};
      `}
      ${type === 'services' && isSafari(navigator) && !browserTypeCheck(window) && css`margin-top: -6px;`}
      display: block;
    }

    ${classicIconStyles};
  `}
`;

StyledIcon.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  bgSize: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  bgShape: PropTypes.oneOf(OptionsHelper.shapes),
  bgTheme: PropTypes.oneOf([...OptionsHelper.colors, ...OptionsHelper.iconBackgrounds, '']),
  fontSize: PropTypes.oneOf(OptionsHelper.sizesBinary),
  iconColor: PropTypes.oneOf(OptionsHelper.iconColors)
};

StyledIcon.defaultProps = {
  theme: baseTheme
};

export default StyledIcon;
