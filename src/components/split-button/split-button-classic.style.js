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
    height: 31px;
    letter-spacing: 0;
    padding: 0 18px;

    &:focus,
    &:hover {
      background-color: ${classicColors.tertiary};
    }
  }
` : '');

const getMainSplitButtonClassicStyles = ({ theme }) => (theme.name === THEMES.classic ? css`
  & > ${StyledButton}:focus {
    border: 1px solid #1e499f;
    margin: 0;
  }
` : '');

const getSplitButtonToggleClassicStyles = ({
  theme,
  disabled,
  displayed,
  buttonType
}) => (theme.name === THEMES.classic ? css`
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

  ${(!disabled && buttonType === 'primary') ? css`
    border-left: 1px solid #1e499f;
  ` : ''}

  &&,
  ${StyledButton} + &:focus {
    margin-left: 0;
    padding: 0 5px;
  }
` : '');


export {
  getSplitButtonChildrenClassicStyles,
  getSplitButtonToggleClassicStyles,
  getMainSplitButtonClassicStyles
};
