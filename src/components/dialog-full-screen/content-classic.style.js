import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

export default ({ theme, hasHeader }) => theme.name === THEMES.classic && css`
  padding-top: 30px;
  padding-bottom: 30px;

  .carbon-app-wrapper {
    max-width: 1600px;
    padding: 0 40px;
  }

  ${!hasHeader && `
    padding-top: 0;
    margin-top: 0;

    .carbon-app-wrapper {
      max-width: 100%;
      padding: 0;
      height: 106px;
    }
  `}
`;
