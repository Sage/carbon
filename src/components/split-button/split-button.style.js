import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../button/button.style';
import BaseTheme from '../../style/themes/base';
import colors from './split-button-colors.style';
import { THEMES } from '../../style/themes';

const StyledSplitButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  ${({ theme }) => theme.name === THEMES.classic && css`
    ${StyledButton} {
      font-size: 14px;
      height: 31px;
      line-height: 16px;
      margin-left: 0;
      margin-right: 0;
      padding: 0 18px;
    }
  `}
`;

export const StyledToggleButton = styled(StyledButton)`
  ${styleToggleButton}

  && {
    margin-left: 0;
    border-left: none;
  }

  && .carbon-icon {
    margin-left: 0;
  }
`;

function styleToggleButton(props) {
  return props.theme.name === THEMES.classic ? applyClassicStyling(props) : applyModernStyling(props);
}

function applyClassicStyling(props) {
  if (props.disabled) {
    return css`
      padding: 0 5px;
      ${classicToggleStyle(props)}
      z-index: 20;
    `;
  }
  return css`
    &:active {
      background-color: ${colors.classic.active};
      border-color: ${colors.classic.active};
      && .carbon-icon {
        color: ${colors.white};
      }
    }
    && {
      padding: 0 5px;
    }
    ${classicToggleStyle(props)}
    z-index: 20;
  `;
}

function classicToggleStyle({ displayed }) {
  if (!displayed) return null;
  return css`
    background-color: ${colors.classic.secondary};
    border-color: ${colors.classic.secondary};
    && .carbon-icon {
      color: ${colors.white};
    }
  `;
}

function applyModernStyling(props) {
  if (props.disabled) {
    return css`
      padding: 0 8px;
      ${modernToggleStyle(props)}
    `;
  }
  return css`
    &:active {
      background-color: ${({ theme }) => theme.colors.tertiary};
      border-color: ${({ theme }) => theme.colors.tertiary};
      && .carbon-icon {
        color: ${colors.white};
      }
    }
    padding: 0 8px;
    ${modernToggleStyle(props)}
  `;
}

function modernToggleStyle({ displayed, theme }) {
  if (!displayed) return null;
  return `
    background-color: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
    && .carbon-icon {
      color: ${colors.white};
    }
    &:focus {
      border-left-color: ${theme.colors.secondary};
    }
  `;
}

StyledSplitButtonContainer.defaultProps = {
  theme: BaseTheme,
  medium: true,
  renderAs: 'secondary',
  variant: 'blue'
};

StyledSplitButtonContainer.propTypes = {
  /** Function to handle mouse leave event */
  onMouseLeave: PropTypes.func
};
export default StyledSplitButtonContainer;
