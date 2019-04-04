import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({
  theme, border, transparent, messageType
}) => theme.name === THEMES.classic
  && css`
    border: ${getBorderStyle(border, transparent, messageType, theme)};
    background-color: ${getBackgroundColorStyle(transparent, messageType, theme)};
    border-radius: ${({ roundedCorners }) => (roundedCorners && border ? '3px;' : '0px;')};
  `;

function getBorderStyle(border, transparent, messageType, theme) {
  if (border === false || transparent) {
    return 'none';
  }
  return `1px solid ${theme.colors[messageType][2]}`;
}

function getBackgroundColorStyle(transparent, messageType, theme) {
  if (transparent) {
    return theme.colors.white;
  }
  return theme.colors[messageType][1];
}
