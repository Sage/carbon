import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../button/button.style';
import BaseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';

const StyledSplitButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  && .horribleHack {
    border-color: ${({ theme }) => (theme.name === 'classic' ? '#1e499f' : theme.colors.secondary)};
    color: #ffffff;
    margin-left: 0;
    min-width: 100%;
    padding: 5px 18px;
    ~ {
      text-align: left;
    }
    &:hover {
      background-color: #163777;
    }
  }
`;

export const StyledToggleButton = styled(StyledButton)`
  height: 31px;
  width: 10px;
  &:active {
    background-color: #1963f6;
    border-color: #1963f6;
    && .carbon-icon {
      color: #ffffff;
    }
  }
  
  ${({ disabled }) => !disabled && styleToggleButton}

  && {
    margin-left: 0;
  }

  && .carbon-icon {
    margin-left: 0;
  }
`;

function styleToggleButton(props) {
  return props.theme.name === 'classic' ? classicToggleStyle(props) : modernToggleStyle(props);
}

function classicToggleStyle(props) {
  const { displayed } = props;
  if (!displayed) return null;
  return css`
    background-color: #1e499f;
    border-bottom-color: #1e499f;
    && .carbon-icon {
      color: #ffffff;
    }
  `;
}

function modernToggleStyle(props) {
  const { displayed, theme } = props;
  if (!displayed) return null;
  return css`
    background-color: ${theme.colors.secondary};
    border-bottom-color: ${theme.colors.secondary};
    && .carbon-icon {
      color: #ffffff;
    }
  `;
}

export const StyledSplitButtonChildrenContainer = styled.div`
  background-color: ${({ theme }) => (theme.name === 'classic' ? '#1e499f' : theme.colors.secondary)};
  min-width: 100%;
  position: absolute;
  z-index: 10;

  ${({ displayButtons }) => (!displayButtons ? 'display: none' : undefined)}
`;

StyledSplitButtonChildrenContainer.propTypes = {
  displayButtons: PropTypes.bool
};

StyledSplitButtonChildrenContainer.defaultProps = {
  displayButtons: false
};

// function stylingForClassic({ disabled, theme }) {
//   if (disabled) {
//     return css`
//     `;
//   }
//   return css`
//     & + & {
//       margin-left: 0;
//     }

//     && .horribleHack {
//       border-color: #1e499f;
//       color: #ffffff;
//       margin-left: 0;
//       min-width: 100%;
//       padding: 5px 18px;
//       ~ {
//         text-align: left;
//       }
//       &:hover {
//         background-color: #163777;
//       }
//     }
//   `;
// }

// function addButtonStyle(props) {
//   const { theme } = props;
//   if (theme.name === 'classic') return stylingForClassic(props);
//   return stylingForType(props);
// }

// function stylingForType({
//   disabled,
//   renderAs,
//   theme,
//   size
// }) {
//   return css`
//     border: 2px solid transparent;
//     box-sizing: border-box;
//     ${disabled ? buttonTypes(theme)[renderAs].disabled : buttonTypes(theme)[renderAs].default};
//     font-weight: 600;
//     padding-top: 1px;
//     padding-bottom: 1px;
//     text-decoration: none;
//     &:focus {
//       outline: solid 3px ${theme.colors.warning};
//     }
//     & + & {
//       margin-left: 16px;
//     }
//     ${buttonSizes(theme)[size]}
//   `;
// }

// function classicRenderAs(renderAs) {
//   return renderAs === 'primary' || renderAs === 'secondary';
// }

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
