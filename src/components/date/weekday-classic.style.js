import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  background-color: #fff;
  color: rgba(0,0,0,.6);
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
  border-color: #fff;
  border-style: solid;
  border-width: 0 3px 3px 3px;
`;
