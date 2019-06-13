import { css } from 'styled-components';
import { THEMES } from '../../../../../style/themes';
import StyledColorSampleBox from './color-sample-box.style';
import StyledTickIcon from './tick-icon.style';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    &:checked + ${StyledColorSampleBox} {
      box-shadow: none;
      border: 1px solid #003349;
      ${StyledTickIcon} {
        display: block;
      }
    }

    &:focus + ${StyledColorSampleBox} {
      border: 1px solid #003349;
      box-shadow: none;
    }
  `;
