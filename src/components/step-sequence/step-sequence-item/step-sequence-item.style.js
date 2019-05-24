import styled, { css } from 'styled-components';
import StepSequenceItemClassicStyle from './step-sequence-item-classic.style';
import baseTheme from '../../../style/themes/base';

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
      background-color: ${theme.colors.withOpacity};
    }
  `};

  ${({ theme, status }) => status === 'complete' && css`
    color: ${theme.colors.base};
  
    &::before {
      background-color: ${theme.colors.base};
    }
  `};

  ${({ orientation }) => orientation === 'vertical' && css`
    flex-direction: column;
    align-items: flex-start;

    &::before {
      flex-grow: 0;
      width: 1px;
      height: 24px;
      margin: 12px 8px;
    }
  `};

  ${({ theme }) => theme.name === 'classic' && css`
    ${StepSequenceItemClassicStyle}
  `};
`;

StepSequenceItemStyle.defaultProps = {
  theme: baseTheme
};

export default StepSequenceItemStyle;
