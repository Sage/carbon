import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import buttonTypes from './button-types.style';
import buttonSizes from './button-sizes.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import StyledIcon from '../icon/icon.style';

const StyledButton = styled.button`
  ${space}
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: center;
  vertical-align: middle;
  ${stylingForType}

  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  ${({ iconPosition, theme }) => css`
    ${StyledIcon} {
      margin-left: ${iconPosition === 'before' ? '0px' : `${theme.spacing}px`};
      margin-right: ${iconPosition === 'before' ? `${theme.spacing}px` : '0px'};
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

function additionalIconStyle({ iconType }) {
  if (iconType === 'services') return '6px';
  return '16px;';
}

function stylingForType({
  disabled,
  buttonType,
  theme,
  size,
  destructive,
  ml
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

    ${buttonTypes(theme, disabled, destructive)[buttonType]};
    ${buttonSizes(theme, ml)[size]}
  `;
}

StyledButton.defaultProps = {
  theme: BaseTheme,
  medium: true,
  buttonType: 'secondary'
};

StyledButton.propTypes = {
  /** Button types for new business themes */
  buttonType: PropTypes.oneOf(OptionsHelper.buttonTypes),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Used to transform button into anchor */
  href: PropTypes.string,
  /** Defines an Icon position within the button */
  iconPosition: PropTypes.oneOf([...OptionsHelper.buttonIconPositions, '']),
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf([...OptionsHelper.icons, '']),
  /** Assigns a size to the button */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: PropTypes.string,
  /** Used to transform button into anchor */
  to: PropTypes.string
};

export default StyledButton;
