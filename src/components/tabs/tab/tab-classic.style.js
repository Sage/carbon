import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    display: none;

    ${({ isTabSelected }) => isTabSelected
      && css`
        display: block;
      `}
    ${({ isTabSelected, position }) => isTabSelected
      && position === 'left'
      && css`
        width: 80%;
      `}
  `;
