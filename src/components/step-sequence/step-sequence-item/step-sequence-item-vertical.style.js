import { css } from 'styled-components';
import StepSequenceItemStyle from './step-sequence-item.style';

// Should only be used to add styling to StepSequenceItemStyle
// Avoids passing orientation prop down to child items of StepSequence
const StepSequenceItemVerticalStyle = css`
  ${StepSequenceItemStyle} {
    flex-direction: column;
    align-items: flex-start;

    &::before {
      flex-grow: 0;
      width: 1px;
      height: 25px;
      margin: 12px 8px;
    }
  }
`;

export default StepSequenceItemVerticalStyle;
