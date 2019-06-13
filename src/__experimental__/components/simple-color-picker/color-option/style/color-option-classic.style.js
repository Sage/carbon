import { css } from 'styled-components';
import { THEMES } from '../../../../../style/themes';
import StyledColorSampleBox from './color-sample-box.style';

export default ({ theme }) => theme.name === THEMES.classic
  && css`
    margin-right: 1px;
    margin-bottom: 1px;

    &:hover {
      cursor: pointer;

      ${StyledColorSampleBox} {
        background-color: ${({ color }) => color};
      }
    }
  `;
