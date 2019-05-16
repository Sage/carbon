
import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';
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
  
  ${({ theme, orientation }) => theme.name === THEMES.classic && css`
    ${StepSequenceClassicStyle}
    
    /* Avoids passing orientation prop down to child items of StepSequence */
    ${orientation === 'vertical' ? StepSequenceItemVerticalClassicStyle : null};
  `};
`;

export default StepSequenceStyle;
