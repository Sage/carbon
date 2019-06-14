import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ loading, theme }) => theme.name === THEMES.classic && css`
  margin-top: 5px;

  &[type='off'] {
    color: ${theme.colors.white};
    margin-right: 9px;

    ${loading && `
      margin-right: 3px;
    `}
  }
`;
