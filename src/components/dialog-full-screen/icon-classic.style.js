import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  color: #4d7080;

  &:hover {
    color: #255BC7;
  }
`;
