import { css } from 'styled-components';
import { THEMES } from '../../style/themes';
import StyledButton from '../button/button.style';

const classicColors = {
  active: '#1963f6',
  primary: '#255bc7',
  secondary: '#1e499f',
  tertiary: '#163777'
};

const getSplitButtonChildrenClassicStyles = ({ theme }) => (theme.name === THEMES.classic ? css`
  background-color: ${classicColors.secondary};
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  white-space: normal;

  ${StyledButton} {
    background-color: ${classicColors.secondary};
    border: 1px solid ${classicColors.secondary};
    color: #FFF;
    font-size: 14px;
    height: 31px;
    letter-spacing: 0;
    padding: 0 18px;
    text-align: left;
    
    &:focus {
      background-color: ${classicColors.tertiary};
    }

    &:hover {
      background-color: ${classicColors.tertiary};
    }
  }
` : '');

const getSplitButtonToggleClassicStyles = ({ theme, disabled, displayed }) => (theme.name === THEMES.classic ? css`
  z-index: 20;
  
  ${!disabled && displayed ? css`
    &:active {
      background-color: #1963f6;
      border-color: #1963f6;
    }

    && {
      background-color: #1e499f;
      border-color: #1e499f;

      .carbon-icon {
        color: #FFF;
      }
    }
  ` : ''}

  &&,
  ${StyledButton} + &:focus {
    margin-left: 0;
    padding: 0 5px;
  }
` : '');


export { getSplitButtonChildrenClassicStyles, getSplitButtonToggleClassicStyles };
