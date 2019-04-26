import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    box-shadow: inset 0px -2px 0px 0px #ccd6db;
    cursor: pointer;
    list-style: none;
    margin: 0 0 10px;
    padding: 0;

    ${({ align }) => align === 'right'
      && css`
        text-align: right;
      `}
  `;
