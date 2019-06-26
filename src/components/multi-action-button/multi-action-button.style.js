import styled, { css } from 'styled-components';
import StyledButton from '../button/button.style';
import StyledSplitButtonChildrenContainer from '../split-button/split-button-children.style';
import baseTheme from '../../style/themes/base';
import StyledSplitButton from '../split-button/split-button.style';
import getMultiActionButtonClassicStyles from './multi-action-button-classic.style';

const StyledMultiActionButton = styled.div`
  ${({ disabled, displayed, theme }) => (!disabled && displayed) && css`
    ${StyledSplitButton} > ${StyledButton} {
      background-color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};

      &,
      .carbon-icon {
        color: ${theme.colors.white};
      }

      &:focus {
        border-color: ${theme.colors.focus};
        margin: 0 -1px;
      }
    }
  `}
  
  ${StyledSplitButtonChildrenContainer} {
    min-width: 100%;
    white-space: nowrap;
    left: 0;
    right: auto;

    ${({ align }) => align === 'right' && css`
      left: auto;
      right: 0;

      ${StyledButton} {
        text-align: right;
      }
    `}
  }

  .carbon-icon {
    &.icon-dropdown {
      margin-right: -4px;
      top: 0px;
    }
  }

  ${getMultiActionButtonClassicStyles}
`;

StyledMultiActionButton.defaultProps = {
  theme: baseTheme,
  size: 'medium',
  legacyColorVariant: 'blue'
};

export default StyledMultiActionButton;
