import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  padding-top: 30px;
  padding-bottom: 30px;

  .carbon-app-wrapper {
    max-width: 1600px;
    padding: 0 40px;
  }
`;
