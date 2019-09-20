import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
  background-color: ${theme.colors.white};
  border-radius: 100%;
  margin-bottom: 0;
  height: 4px;
  width: 4px;
`;
