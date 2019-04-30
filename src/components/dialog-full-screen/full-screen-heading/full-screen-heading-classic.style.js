import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';

export default ({ theme }) => theme.name === THEMES.classic && css`
  border-bottom-color: #CCD6DA;

  .carbon-app-wrapper {
    max-width: 1600px;
    padding: 0 40px;
  }

  .carbon-heading {
    .carbon-heading__header {
      height: 106px;
    }
  }
`;
