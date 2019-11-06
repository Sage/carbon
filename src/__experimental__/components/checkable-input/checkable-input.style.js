import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import FieldHelpStyle from '../field-help/field-help.style';
import FormFieldStyle from '../form-field/form-field.style';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from './checkable-input-svg-wrapper.style';
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
    disabled, fieldHelpInline, inputWidth, labelAlign, labelWidth, theme
  }) => css`
    ${FormFieldStyle} {
      display: flex;
      flex-flow: row wrap;
    }

    ${LabelStyle} {
      display: flex;
      flex: 1 1 calc(100% - 28px);
      justify-content: flex-start;
      flex-flow: row wrap;
      text-align: ${labelAlign};
      width: auto;
      white-space: normal;
      margin-top: -2px;

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

    ${StyledCheckableInput},
    ${HiddenCheckableInputStyle},
    ${StyledCheckableInputSvgWrapper},
    svg {
      display: flex;
      flex: 0 1 16px;
    }

    ${FieldHelpStyle && css`
      display: flex;
      flex: 1 1 100%;
    `}

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

    ${fieldHelpInline && `
      ${FieldHelpStyle} {
        display: inline;
        padding-left: 0;
        width: auto;
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
