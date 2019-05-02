import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  background-color: ${theme.colors.white};
  color: rgba(0, 0, 0, .6);
  font-size: 14px;
  font-weight: 700;
  text-transform: capitalize;
  border-color: ${theme.colors.white};
  border-style: solid;
  border-width: 0 3px 3px 3px;
  min-width: auto;
  padding: 10px 12px;
`;
