import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import classicConfig from './message-classic-config.style';

export default ({
  theme, border, transparent, type
}) => theme.name === THEMES.classic
  && css`
    border: ${getBorderStyle(border, transparent, type)};
    background-color: ${getBackgroundColorStyle(transparent, type)};
    border-radius: ${({ roundedCorners }) => (roundedCorners && border ? '3px;' : '0px;')};
  `;

function getBorderStyle(border, transparent, type) {
  if (border === false || transparent) {
    return 'none';
  }
  return `1px solid ${classicConfig[type].borderColor}`;
}

function getBackgroundColorStyle(transparent, type) {
  if (transparent) {
    return classicConfig.white;
  }
  return classicConfig[type].backgroundColor;
}
