import { css } from 'styled-components';
import { THEMES } from '../../../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    margin-right: 1px;
    margin-bottom: 1px;
  `;
