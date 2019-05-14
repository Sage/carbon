import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
   ${console.log(theme)}
  margin-top: 30px;
  position: fixed;
  right: 30px;
  top: 0;
  width: 300px;
  z-index: 2001;
`;
