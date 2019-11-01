import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
  box-shadow: inset 0px -2px 0px 0px #ccd6da;
`;
