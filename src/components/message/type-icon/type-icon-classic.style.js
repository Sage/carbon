import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import classicConfig from '../message-classic-config.style';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    background-color: ${({ transparent, type }) => (transparent ? classicConfig.transparent.white : classicConfig[type].color)};
    span {
      &:before {
        color: ${({ transparent, type }) => (transparent ? classicConfig[type].color : classicConfig.transparent.white)};
      }
    }
  `;
