import styled from 'styled-components';
import StyledButton from '../button/button.style';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

export const StyledSplitButtonToggle = styled(StyledButton)`
  ${(props) => {
    const isClassicTheme = props.theme.name === THEMES.classic;

    return (isClassicTheme) ? applyClassicStyling(props) : applyModernStyling(props);
  }}

  ${StyledButton} + & {
    margin-left: 0;
  }

  ${StyledButton} + & .carbon-icon {
    margin-left: 0;
  }
`;

function applyClassicStyling({ disabled, displayed }) {
  return `
    ${!disabled && displayed ? `
      &:active {
        background-color: #1963f6;
        border-color: #1963f6;
      }
      background-color: #1e499f;
      border-color: #1e499f;
      
      && .carbon-icon {
        color: #FFF;
      }
    ` : ''}
    && {
      padding: 0 5px;
    }
    z-index: 20;
  `;
}

function applyModernStyling(props) {
  const {
    buttonType,
    disabled,
    displayed,
    size,
    theme
  } = props;
  const horizontalPaddingSizes = {
    small: '5px',
    medium: '10px',
    large: '14px'
  };

  return `
    ${!disabled && displayed ? `
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
  `;
}

StyledSplitButtonToggle.defaultProps = {
  theme: BaseTheme,
  variant: 'blue'
};

export default StyledSplitButtonToggle;
