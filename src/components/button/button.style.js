import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';
import buttonClassicStyle from './button-classic.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledButton = styled.button`
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: center;
  vertical-align: middle;
  ${addButtonStyle}

  ${({ iconPosition }) => css`
    ${StyledIcon} {
      margin-left: ${iconPosition === 'before' ? '0px' : '8px'};
      margin-right: ${iconPosition === 'before' ? '8px' : '0px'};
      height: ${additionalIconStyle};
      svg { 
        margin-top: 0;
      }
    }
  `}
`;

export const StyledButtonSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
  display: block;
`;

function additionalIconStyle({ theme, iconType }) {
  if (isClassic(theme)) {
    if (iconType === 'services') return '8px';

    return '18px';
  }
  if (iconType === 'services') return '6px';
  return '16px;';
}

function addButtonStyle(props) {
  if (isClassicButton(props)) return buttonClassicStyle(props);

  return stylingForType(props);
}

function stylingForType({
  disabled,
  buttonType,
  theme,
  size
}) {
  return css`
    border: 2px solid transparent;
    box-sizing: border-box;
    font-weight: 600;
    padding-top: 1px;
    padding-bottom: 1px;
    text-decoration: none;
    &:focus {
      outline: solid 3px ${theme.colors.focus};
    }
    
    margin-right: 16px;

    ${buttonTypes(theme, disabled)[buttonType]};
    ${buttonSizes(theme)[size]}
  `;
}

function isClassicButton({ theme, buttonType }) {
  const isClassicButtonType = OptionsHelper.themesBinary.includes(buttonType);

  return isClassic(theme) && isClassicButtonType;
}

StyledButton.defaultProps = {
  theme: BaseTheme,
  medium: true,
  buttonType: 'secondary',
  legacyColorVariant: 'blue'
};

StyledButton.propTypes = {
  /** Button types for new business themes */
  buttonType: PropTypes.oneOf(OptionsHelper.buttonTypes),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Used to transfrom button into anchor */
  href: PropTypes.string,
  /** Defines an Icon position within the button */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions, '']),
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf([...OptionsHelper.icons, '']),
  /** Assigns a size to the button */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: PropTypes.string,
  /** Set this prop to pass in legacy theme color variants */
  legacyColorVariant: PropTypes.oneOf(OptionsHelper.buttonColors),
  /** Used to transfrom button into anchor */
  to: PropTypes.string
};

export default StyledButton;
