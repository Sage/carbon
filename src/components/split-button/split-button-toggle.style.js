import styled, { css } from 'styled-components';
import StyledButton from '../button/button.style';
import { getSplitButtonToggleClassicStyles } from './split-button-classic.style';

const horizontalPaddingSizes = {
  small: 5,
  medium: 10,
  large: 14
};

const StyledSplitButtonToggle = styled(StyledButton)`
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
    ` : ''}

    ${(!disabled && buttonType === 'primary') ? `border-left-color: ${theme.colors.secondary};` : 'border-left: none;'}
    padding: 0 ${horizontalPaddingSizes[size]}px;
  
    ${StyledButton} + & {
      margin-left: 0;

      ${buttonType === 'secondary' && css`
        &:focus {
          margin-left: -3px;
        }
      `}
    }

    ${StyledButton} + & .carbon-icon {
      margin-left: 0;
    }
  `}

  ${getSplitButtonToggleClassicStyles}
`;

export default StyledSplitButtonToggle;
