import styled, { css } from 'styled-components';
import CheckboxStyle from '../checkbox/checkbox.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import ValidationIconStyle from '../../../components/validations/validation-icon.style';
import LabelStyle from '../label/label.style';
import ClassicRadioButtonStyles from './radio-button-classic.style';
import baseTheme from '../../../style/themes/base';
import FormFieldStyle from '../form-field/form-field.style';

const RadioButtonStyle = styled(CheckboxStyle)`
  ${({
    disabled,
    fieldHelpInline,
    reverse,
    size,
    theme
  }) => css`
    margin-bottom: 12px;

    ${FieldHelpStyle} {
      margin-left: 32px;
    }

    ${StyledCheckableInput} {
      margin-right: 16px;
    }

    ${StyledCheckableInputSvgWrapper} {
      padding: 0;
    }

    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: 50%;
    }

    ${StyledCheckableInput},
    ${HiddenCheckableInputStyle},
    ${StyledCheckableInputSvgWrapper},
    svg {
      height: 16px;
      width: 16px;
    }

    svg {
      padding: 1px;
    }

    circle {
      r: 5;
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: ${theme.colors.primary};
    }

    ${disabled && css`
      circle {
        fill: ${theme.disabled.input};
      }

      ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
        fill: ${theme.disabled.border};
      }
    `}

    ${(fieldHelpInline || reverse) && `
      ${FieldHelpStyle} {
        margin-left: 0;
        margin-right: 6px;
      }
    `}

    ${size === 'large' && css`
      ${LabelStyle} {
        padding: 4px 0;
      }

      ${StyledCheckableInput} {
        margin-right: 14px;
      }

      ${StyledCheckableInput},
      ${HiddenCheckableInputStyle},
      ${StyledCheckableInputSvgWrapper},
      svg {
        height: 24px;
        width: 24px;
      }

      circle {
        r: 3.75;
      }

      ${reverse && css`
        ${StyledCheckableInput} {
          margin-left: 6px;
        }

        ${!fieldHelpInline && `
          ${FieldHelpStyle} {
            padding: 0;
          }
        `}
      `}
    `}

    ${ClassicRadioButtonStyles}
  `}
`;

const StyledRadioButtonGroup = styled.div`
${({
    theme, disabled, hasError, hasWarning, hasInfo
  }) => css`
  ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} svg {
        ${!disabled && css`
          ${hasInfo && `border-color: ${theme.colors.info};`}
          ${hasWarning && `border-color: ${theme.colors.warning};`}
          ${hasError && `border-color: ${theme.colors.error};`}
        `}
      }
    `}

  & > ${FormFieldStyle} {
    & > ${LabelStyle} {
      cursor: default ;
      margin-bottom: 16px;
      padding: 0;

      > label {
        vertical-align: middle;
      }

      & ${ValidationIconStyle} {
        margin-top: 0;
        margin-right: 0;
        display: inline-block;

        & ::before {
          font-size: 16px;
        }
      }
    }
  }
`;

StyledRadioButtonGroup.defaultProps = {
  theme: baseTheme
};

export { RadioButtonStyle, StyledRadioButtonGroup };
