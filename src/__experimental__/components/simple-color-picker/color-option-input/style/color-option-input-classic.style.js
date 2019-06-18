import { css } from 'styled-components';
import { THEMES } from '../../../../../style/themes';
import StyledColorSampleBox from '../../color-sample-box/style/color-sample-box.style';

export default ({ theme }) => theme.name === THEMES.classic && css`
  &:checked + ${StyledColorSampleBox}, 
  &:focus + ${StyledColorSampleBox} {
    box-shadow: none;
    border: 1px solid #003349;
  }
`;
