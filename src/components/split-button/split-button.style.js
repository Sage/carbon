import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../button/button.style';
import BaseTheme from '../../style/themes/base';
import colors from './split-button-colors.style';
import OptionsHelper from '../../utils/helpers/options-helper';

const StyledSplitButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  &:focus {
    z-index: 20;
  }
`;
// Need to size the main button
export const StyledToggleButton = styled(StyledButton)`
  ${styleSplitButton}

  && {
    margin-left: 0;
    border-left: none;
  }

  && .carbon-icon {
    margin-left: 0;
  }
`;

function styleSplitButton(props) {
  return props.theme.name === 'classic' ? applyClassicStyling(props) : applyModernStyling(props);
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
    padding: 0 5px;
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
      padding: 0 8px
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
    padding: 0 8px
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
  /** Color variants for new business themes */
  renderAs: PropTypes.oneOf([OptionsHelper.themesBinary[0], OptionsHelper.themesBinary[1]]),
  /** The text the button displays */
  // children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Used to transfrom button into anchor */
  href: PropTypes.string,
  /** Defines an Icon position within the button */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions, '']),
  /** Defines an Icon type within the button */
  iconType: PropTypes.oneOf([...OptionsHelper.icons, '']),
  /** Assigns a size to the button */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: (props) => {
    if (props.subtext.length > 0 && props.size !== 'large') {
      throw new Error('subtext prop has no effect unless the button is large');
    } else {
      return null;
    }
  },
  /** Used to transfrom button into anchor */
  to: PropTypes.string
};
export default StyledSplitButtonContainer;
