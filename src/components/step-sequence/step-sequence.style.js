
import styled, { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import StepSequenceClassicStyle from './step-sequence-classic.style';

const StepSequenceStyle = styled.ol`
  display: flex;
  margin: 0;
  padding: 18px;
  font-weight: bold;
  
  ${({ orientation }) => orientation === 'vertical' && css`
    flex-direction: column;
    padding: 0;
  `};
  
  ${({ theme }) => theme.name === THEMES.classic && css`
    ${StepSequenceClassicStyle}
  `};
`;

export default StepSequenceStyle;
