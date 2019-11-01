import { css } from 'styled-components';
import StyledButton from '../button/button.style';
import { isClassic } from '../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
  margin-top: 20px;

  ${StyledButton} {
    margin-left: 10px;
  }
`;
