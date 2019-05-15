
import styled, { css } from 'styled-components';
import StepSequenceClassicStyle from './step-sequence-classic.style';
import StepSequenceItemVerticalStyle from './step-sequence-item/step-sequence-item-vertical.style';
import StepSequenceItemVerticalClassicStyle from './step-sequence-item/step-sequence-item-vertical-classic.style';

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
  
  ${({ theme }) => theme.name === 'classic' && css`
    ${StepSequenceClassicStyle}
    
    ${({ orientation }) => orientation === 'vertical' && css`
      /* Avoids passing orientation prop down to child items of StepSequence */
      ${StepSequenceItemVerticalClassicStyle}
    `};
  `};
`;

export default StepSequenceStyle;
