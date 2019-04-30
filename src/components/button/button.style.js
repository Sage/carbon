import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';
import buttonClasicStyle from './button-classic.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import { THEMES } from '../../style/themes';

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
    .carbon-icon {
      margin-left: ${iconPosition === 'before' ? '0px' : '8px'};
      margin-right: ${iconPosition === 'before' ? '8px' : '0px'};
    }
  `}
`;

export const StyledButtonSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
  display: block;
`;

function addButtonStyle(props) {
  if (isClassicButton(props)) return buttonClasicStyle(props);

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
    ${disabled ? buttonTypes(theme)[buttonType].disabled : buttonTypes(theme)[buttonType].default};
    font-weight: 600;
    padding-top: 1px;
    padding-bottom: 1px;
    text-decoration: none;
    &:focus {
      outline: solid 3px ${theme.colors.warning};
    }
    & + & {
      margin-left: 16px;
    }
    ${buttonSizes(theme)[size]}
  `;
}

function isClassicButton({ theme, buttonType }) {
  const isClassicTheme = (theme.name === THEMES.classic);
  const isClassicButtonType = OptionsHelper.themesBinaryClassic.includes(buttonType);

  return isClassicTheme && isClassicButtonType;
}

StyledButton.defaultProps = {
  theme: BaseTheme,
  medium: true,
  buttonType: 'secondary',
  legacyColorVariant: 'blue'
};

StyledButton.propTypes = {
  /** Button types for new business themes */
  buttonType: PropTypes.oneOf(OptionsHelper.themesBinary),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Used to transfrom button into anchor */
  href: PropTypes.string,
  /** Defines an Icon position within the button */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions, '']),
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
  /** Set this prop to pass in legacy theme color variants */
  legacyColorVariant: PropTypes.oneOf(OptionsHelper.buttonColors),
  /** Used to transfrom button into anchor */
  to: PropTypes.string
};
export default StyledButton;
