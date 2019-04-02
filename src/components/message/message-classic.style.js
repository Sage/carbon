import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import classicConfig from './message-classic-config.style';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    border: ${getBorderStyle};
    background-color: ${getBackgroundColorStyle};
  `;

function getBorderStyle({ border, transparent, type }) {
  if (border === false || transparent) {
    return 'none';
  }
  return `1px solid ${classicConfig[type].borderColor}`;
}

function getBackgroundColorStyle({ transparent, type }) {
  if (transparent) {
    return classicConfig.white;
  }
  return classicConfig[type].backgroundColor;
}
