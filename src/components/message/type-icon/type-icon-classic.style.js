import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicThemeColors from '../message-classic-theme-colors';

export default ({
  theme, transparent, messageType, roundedCorners
}) => theme.name === THEMES.classic
  && css`
    border-radius: ${roundedCorners ? '3px 0 0 3px' : '0px'};
    background-color: ${transparent
    ? classicThemeColors.transparent.backgroundColor
    : classicThemeColors[messageType].main};
    span {
      &:before {
        color: ${transparent ? classicThemeColors[messageType].main : classicThemeColors.transparent.backgroundColor};
      }
    }
  `;
