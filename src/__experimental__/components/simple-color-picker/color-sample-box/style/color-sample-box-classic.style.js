import { css } from 'styled-components';
import { THEMES } from '../../../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  border: 1px solid transparent;
  ${({ color }) => (color === 'transparent' || color === 'none') && css`
    border-color: #b3c2c8;
  `}
`;
