import { css } from 'styled-components';
import StepSequenceItemContentStyle from './step-sequence-item-content.style';

const StepSequenceItemClassicStyle = css`
  height: 24px;

  ${({ status }) => status !== 'complete' && status !== 'current' && css`
    color: rgba(0, 0, 0, 0.55);
    
    &::before {
      background-color: rgba(0, 0, 0, 0.55);
    }
  `};

  ${({ orientation }) => orientation === 'vertical' && css`
    height: auto;
    
    &::before {
      height: 32px;
      margin: 0;
      background-color: transparent;
    }

    ${StepSequenceItemContentStyle} {
      height: 17px;
    }
  `};
`;

export default StepSequenceItemClassicStyle;
