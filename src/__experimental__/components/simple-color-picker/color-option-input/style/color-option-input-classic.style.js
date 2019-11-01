import { css } from 'styled-components';
import StyledColorSampleBox from '../../color-sample-box/style/color-sample-box.style';
import { isClassic } from '../../../../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
  &:checked + ${StyledColorSampleBox}, 
  &:focus + ${StyledColorSampleBox} {
    box-shadow: none;
    border: 1px solid #003349;
  }
`;
