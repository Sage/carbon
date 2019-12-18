import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
  color: #4d7080;

  &:hover {
    color: #255BC7;
  }
`;
