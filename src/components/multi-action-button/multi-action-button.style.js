import styled, { css } from 'styled-components';
import StyledButton from '../button/button.style';
import StyledSplitButtonChildrenContainer from '../split-button/split-button-children.style';
import baseTheme from '../../style/themes/base';
import StyledSplitButton from '../split-button/split-button.style';
import getMultiActionButtonClassicStyles from './multi-action-button-classic.style';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledIcon from '../icon/icon.style';

const StyledMultiActionButton = styled.div`
  ${({ disabled, displayed, theme }) => (!disabled && displayed) && css`
    ${StyledSplitButton} > ${StyledButton} {
      background-color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};

      &,
      ${StyledIcon} {
        color: ${theme.colors.white};
        margin-right: 0;
        top: 2px;
        left: ${isClassic(theme) ? '6px' : '8px'};
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
    z-index: 12;

    ${({ align }) => align === 'right' && css`
      left: auto;
      right: 0;

      ${StyledButton} {
        text-align: right;
      }
    `}
  }

  ${StyledIcon} {
    margin-right: 0px;
    top: 2px;
    left: ${({ theme }) => (isClassic(theme) ? '6px' : '8px')};
  }
  
  ${getMultiActionButtonClassicStyles}
`;

StyledMultiActionButton.defaultProps = {
  theme: baseTheme,
  size: 'medium',
  legacyColorVariant: 'blue'
};

export default StyledMultiActionButton;
