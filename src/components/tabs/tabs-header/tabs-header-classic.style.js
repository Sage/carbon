import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    box-shadow: inset 0px -2px 0px 0px #ccd6db;
  `;
