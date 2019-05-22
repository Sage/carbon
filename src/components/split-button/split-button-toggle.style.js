import styled, { css } from 'styled-components';
import StyledButton from '../button/button.style';
import { getSplitButtonToggleClassicStyles } from './split-button-classic.style';

const horizontalPaddingSizes = {
  small: '5px',
  medium: '10px',
  large: '14px'
};

export const StyledSplitButtonToggle = styled(StyledButton)`
  ${({
    buttonType,
    disabled,
    displayed,
    size,
    theme
  }) => css` 
    ${!disabled && displayed ? css`
      background-color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};

      && .carbon-icon {
        color: ${theme.colors.white};
      }

      &:focus {
        border-left-color: ${theme.colors.secondary};
      }

      &:active {
        background-color: ${theme.colors.tertiary};
        border-color: ${theme.colors.tertiary};
      }
    ` : ''}

    ${buttonType === 'primary' ? `border-left-color: ${theme.colors.secondary};` : 'border-left: none;'}
    padding 0 ${horizontalPaddingSizes[size]};
  `}
  
  ${StyledButton} + & {
    margin-left: 0;
    border-left: none;

    &:focus {
      margin-left: -2px;
      padding-left: 12px;
    }
  }

  ${StyledButton} + & .carbon-icon {
    margin-left: 0;
  }

  ${getSplitButtonToggleClassicStyles}
`;

export default StyledSplitButtonToggle;
