import styled, { css } from 'styled-components';
import BaseTheme from '../../style/themes/base';
import StyledButton from '../button/button.style';
import { getSplitButtonChildrenClassicStyles } from './split-button-classic.style';

const StyledSplitButtonChildrenContainer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 0;
    background-color: ${theme.colors.secondary};
    min-width: 75%;
    white-space: nowrap;

    ${StyledButton} {
      background-color: ${theme.colors.secondary};
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.white};
      display: block;
      margin-left: 0;
      margin-top: 3px;
      margin-bottom: 3px;
      min-width: 100%;
      text-align: left;
      z-index: 10;

      &:focus,
      &:hover {
        background-color: ${theme.colors.tertiary};
      }

      & + & {
        margin-top: 3px;
      }
    }
  `}

  ${getSplitButtonChildrenClassicStyles}
`;

StyledSplitButtonChildrenContainer.defaultProps = {
  theme: BaseTheme
};

export default StyledSplitButtonChildrenContainer;
