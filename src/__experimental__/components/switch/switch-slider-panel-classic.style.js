import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ loading, theme }) => theme.name === THEMES.classic && css`
  &[type='off'] {
    color: ${theme.colors.white};
    margin-top: 5px;

    ${!loading && `
      margin-right: 9px;
    `}
  }
`;
