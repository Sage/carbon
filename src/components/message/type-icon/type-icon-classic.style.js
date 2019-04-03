import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicConfig from '../message-classic-config.style';

export default ({
  theme, transparent, type, roundedCorners
}) => theme.name === THEMES.classic
  && css`
    border-radius: ${roundedCorners ? '3px 0 0 3px' : '0'};
    background-color: ${transparent ? classicConfig.transparent.white : classicConfig[type].color};
    span {
      &:before {
        color: ${transparent ? classicConfig[type].color : classicConfig.transparent.white};
      }
    }
  `;
