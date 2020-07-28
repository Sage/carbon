import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';
import InputIconToggleStyle from '../input-icon-toggle/input-icon-toggle.style';
import StyledHelpIcon from '../../../components/help/help.style';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';
import { isClassic } from '../../../utils/helpers/style-helper';

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.text.color};
  display: block;
  font-weight: 600;
  padding-bottom: 8px;

  ${StyledHelpIcon},
  ${StyledValidationIcon} {
    vertical-align: middle;
  }

  ${({
    align, inline, inputSize, rightSpacing, leftSpacing, width, theme
  }) => inline && css`
    box-sizing: border-box;
    padding-bottom: 0;
    padding-top: ${sizes[inputSize].verticalPadding};
    padding-right: ${rightSpacing * theme.spacing}px;
    padding-left: ${leftSpacing * theme.spacing}px;
    text-align: ${align};
    width: ${width === 0 ? StyledLabel.defaultProps.width : width}%;
  `}

  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.disabled};
  `}

  ${({ inline, theme }) => isClassic(theme) && css`
    color: #003349;
    padding-left: 6px;
    padding-right: 6px;

    ${inline && css`
      padding-left: 0;
      padding-right: 8px;
    `}

    &:hover ${InputIconToggleStyle} {
      background-color: #1e499f;
      border-color: #1e499f;
    }
  `}

  ${({
    childOfForm,
    inline,
    align,
    optional,
    theme
  }) => childOfForm && !isClassic(theme) && css`
    ${!inline && css`
      margin-bottom: 12px;
    `}

    ${inline && align === 'right' && css`
      margin-left: 12px;
    `}

    ${optional && css`
      ::after {
        content: '(optional)';
        font-weight: 350;
        margin-left: 4px;
      }
    `}
  `}

  ${({ styleOverride }) => styleOverride};
`;

StyledLabel.defaultProps = {
  align: 'left',
  inputSize: 'medium',
  theme: BaseTheme,
  width: 30
};

StyledLabel.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  inline: PropTypes.bool,
  inputSize: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  width: PropTypes.number,
  readOnly: PropTypes.bool,
  rightSpacing: PropTypes.number,
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default StyledLabel;
