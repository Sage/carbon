import { css } from 'styled-components';
import StepSequenceItemContentStyle from './step-sequence-item-content.style';

const StepSequenceItemVerticalClassicStyle = css`
  height: auto;
  
  &::before {
    height: 32px;
    margin: 0;
    background-color: transparent;
  }

  ${StepSequenceItemContentStyle} {
    height: 17px;
  }
`;

export default StepSequenceItemVerticalClassicStyle;
