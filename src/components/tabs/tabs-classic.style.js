import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    ${({ position }) => position === 'top'
      && css`
        margin-top: 15px;
      `}

    ${({ position }) => position === 'left'
      && css`
        display: flex;
        width: 100%;
      `}
  `;
