import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({
  theme, border, transparent, type
}) => theme.name === THEMES.classic
  && css`
    border: ${getBorderStyle(border, transparent, type, theme)};
    background-color: ${getBackgroundColorStyle(transparent, type, theme)};
    border-radius: ${({ roundedCorners }) => (roundedCorners && border ? '3px;' : '0px;')};
  `;

function getBorderStyle(border, transparent, type, theme) {
  if (border === false || transparent) {
    return 'none';
  }
  return `1px solid ${theme.colors[type][2]}`;
}

function getBackgroundColorStyle(transparent, type, theme) {
  if (transparent) {
    return theme.colors.white;
  }
  return theme.colors[type][1];
}
