import { css } from 'styled-components';
import StepSequenceItemStyle from './step-sequence-item.style';
import StepSequenceItemContentStyle from './step-sequence-item-content.style';

// Should only be used to add styling to StepSequenceItemStyle
// Avoids passing orientation prop down to child items of StepSequence
const StepSequenceItemVerticalClassicStyle = css`
  ${StepSequenceItemStyle} {
    height: auto;
    
    &::before {
      height: 32px;
      margin: 0;
      background-color: transparent;
    }
  }

  ${StepSequenceItemContentStyle} {
    height: 17px;
  }
`;

export default StepSequenceItemVerticalClassicStyle;
