import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import classicThemeColors from './message-classic-theme-colors';

export default ({
  theme, border, transparent, messageType
}) => theme.name === THEMES.classic
  && css`
    border: ${getBorderStyle(border, transparent, messageType)};
    background-color: ${getBackgroundColorStyle(transparent, messageType)};
    border-radius: ${({ roundedCorners }) => (roundedCorners && border ? '3px;' : '0px;')};
  `;

function getBorderStyle(border, transparent, messageType) {
  if (border === false || transparent) {
    return 'none';
  }
  return `1px solid ${classicThemeColors[messageType].borderColor}`;
}

function getBackgroundColorStyle(transparent, messageType) {
  if (transparent) {
    return classicThemeColors.transparent.backgroundColor;
  }
  return classicThemeColors[messageType].backgroundColor;
}
