
import styled, { css } from 'styled-components';
import StepSequenceClassicStyle from './step-sequence-classic.style';
import { isClassic } from '../../utils/helpers/style-helper';

const StepSequenceStyle = styled.ol`
  display: flex;
  margin: 0;
  padding: 18px;
  font-weight: bold;
  
  ${({ orientation }) => orientation === 'vertical' && css`
    flex-direction: column;
    padding: 0;
  `};
  
  ${({ theme }) => isClassic(theme) && css`
    ${StepSequenceClassicStyle}
  `};
`;

export default StepSequenceStyle;
