import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import FieldHelpStyle from '../field-help/field-help.style';
import { FieldLineStyle } from '../form-field/form-field.style';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../../../components/help/help.style';
import baseTheme from '../../../style/themes/base';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';

const StyledCheckableInput = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledCheckableInputWrapper = styled.div`
  ${({
    disabled, fieldHelpInline, inputWidth, labelAlign, labelWidth, reverse, theme
  }) => css`
    ${FieldLineStyle} {
      display: flex;
    }

    ${LabelStyle} {
      text-align: ${labelAlign};
      padding-top: 0;
      width: auto;

      & ${StyledHelp},
      & ${StyledValidationIcon} {
        color: ${theme.help.color};
        vertical-align: middle;
        top: -1px;

        &:hover, &:focus {
          color: ${theme.text.color};
        }
      }
    }

    ${FieldHelpStyle} {
      flex-basis: 100%;
    }

    ${disabled && css`
      ${LabelStyle} {
        &, & ${StyledHelp} {
          color: ${theme.disabled.disabled};
        }
      }

      ${HiddenCheckableInputStyle},
      ${LabelStyle} {
        &:hover, &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${fieldHelpInline && css`
      ${FieldLineStyle} {
        flex-wrap: nowrap;
      }

      ${StyledCheckableInput} {
        margin-right: 0;
        margin-left: 8px;
      }
      
      ${FieldHelpStyle} {
        flex-grow: 0;
        flex-basis: auto;
        padding-left: 0;
        width: auto;
      }
    `}

    ${reverse && fieldHelpInline && css`
      ${StyledCheckableInput} {
        margin-left: 0;
      }

      ${FieldHelpStyle} {
        flex-grow: 1;
      }
    `}

    ${inputWidth !== undefined && inputWidth !== 0 && css`
      ${StyledCheckableInput} {
        width: ${inputWidth}% !important;
      }
    `}

    ${labelWidth !== undefined && labelWidth !== 0 && `
      ${LabelStyle} {
        width: ${labelWidth}% !important;
      }
    `}
  `}
`;

StyledCheckableInputWrapper.propTypes = {
  disabled: PropTypes.bool,
  fieldHelpInline: PropTypes.bool,
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  theme: PropTypes.object
};

StyledCheckableInputWrapper.defaultProps = {
  labelAlign: 'left',
  theme: baseTheme
};

export { StyledCheckableInput, StyledCheckableInputWrapper };
