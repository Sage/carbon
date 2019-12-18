import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
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
