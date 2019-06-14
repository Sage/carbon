import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  background-color: ${theme.colors.white};
  border-radius: 100%;
  margin-bottom: 0;
  height: 4px;
  width: 4px;
`;
