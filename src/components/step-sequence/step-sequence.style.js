
import styled, { css } from 'styled-components';
import StepSequenceItemVerticalStyle from './step-sequence-item-vertical.style';

const StepSequenceStyle = styled.ol`
  display: flex;
  margin: 0;
  padding: 18px;
  font-weight: bold;
  
  ${({ orientation }) => orientation === 'vertical' && css`
    flex-direction: column;

    /* Avoids passing orientation prop down to child items of StepSequence */
    ${StepSequenceItemVerticalStyle}
  `};
`;

export default StepSequenceStyle;
