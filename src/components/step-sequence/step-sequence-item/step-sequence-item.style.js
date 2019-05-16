import styled, { css } from 'styled-components';
import StepSequenceItemClassicStyle from './step-sequence-item-classic.style';
import StepSequenceItemVerticalStyle from './step-sequence-item-vertical.style';
import StepSequenceItemVerticalClassicStyle from './step-sequence-item-vertical-classic.style';

const StepSequenceItemStyle = styled.li`
  display: flex;
  align-items: center;
  flex-grow: 1;
  text-align: right;
  list-style-type: none;
  color: ${({ theme }) => theme.disabled.disabled};

  &::before {
    content: '';
    flex-grow: 1;
    display: block;
    height: 1px;
    margin: 0 16px;
    background-color: ${({ theme }) => theme.disabled.disabled};
  }

  .carbon-icon {
    position: relative;
    top: -2px;
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.base};
  }

  &:first-child {
    flex-grow: 0;

    &::before {
      display: none;
    }
  }

  ${({ theme, status }) => status === 'current' && css`
    color: ${theme.text.color};

    &::before {
      background-color: ${theme.colors.base};
    }
  `};

  ${({ theme, status }) => status === 'complete' && css`
    color: ${theme.colors.base};
  
    &::before {
      background-color: ${theme.colors.base};
    }
  `};

  ${({ orientation }) => orientation === 'vertical' && css`
    ${StepSequenceItemVerticalStyle}
  `};

  ${({ theme, orientation }) => theme.name === 'classic' && css`
    ${StepSequenceItemClassicStyle}

    ${orientation === 'vertical' ? StepSequenceItemVerticalClassicStyle : null};
  `};
`;

export default StepSequenceItemStyle;
