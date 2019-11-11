import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledFieldHelp from '../field-help/field-help.style';
import StyledHiddenCheckableInput from '../checkable-input/hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import StyledLabel from '../label/label.style';
import styledCheckBoxClassic from './checkbox-classic.style';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';
import StyledFormField from '../form-field/form-field.style';
import StyledIcon from '../../../components/icon/icon.style';

const CheckboxStyle = styled.div`
  ${({
    checked, disabled, hasError, hasWarning, hasInfo, fieldHelpInline, inputWidth, reverse, size, theme
  }) => css`
    padding-top: 8px;

    ${StyledCheckableInput} {
      padding-top: 1px;
    }

    ${StyledCheckableInputSvgWrapper} { height: 16px; }

    svg {
      background-color: ${theme.colors.white};
      ${!disabled && css`
        border: 1px solid ${theme.colors.border};

        ${hasInfo && `border: 1px solid ${theme.colors.info};`}
        ${hasWarning && `border: 1px solid ${theme.colors.warning};`}
        ${hasError && `border: 1px solid ${theme.colors.error};`}
      `}
    }

    ${StyledHiddenCheckableInput},
    svg {
      height: 16px;
      position: absolute;
      padding: 1px;
    }

    ${StyledCheckableInput},
    ${StyledHiddenCheckableInput},
    ${StyledCheckableInputSvgWrapper},
    svg {
      box-sizing: border-box;
      width: 16px;
    }

    ${StyledHiddenCheckableInput}:not([disabled]) {
      &:focus + ${StyledCheckableInputSvgWrapper},
      &:hover + ${StyledCheckableInputSvgWrapper} {
        box-shadow: 0 0 0 3px ${theme.colors.focus};
      }
    }

    ${StyledLabel} {
      padding: 0 6px;
      width: auto;
    }

    ${StyledFieldHelp} {
      margin-left: 16px;
      margin-top: 0;
      padding-left: 6px;
    }

    ${StyledValidationIcon} {
      position: relative;
      display: inline-block;
    }

    ${size === 'large' && css`
      ${StyledCheckableInputSvgWrapper} { height: 24px; }

      ${StyledCheckableInput},
      ${StyledHiddenCheckableInput},
      svg {
        padding: 2px;
      }

      ${StyledCheckableInput},
      ${StyledHiddenCheckableInput},
      ${StyledCheckableInputSvgWrapper},
      svg {
        height: 24px;
        width: 24px;
      }

      ${StyledFieldHelp} {
        margin-left: 24px;
      }

      ${StyledFieldHelp},
      ${StyledLabel} {
        padding-left: 8px;
      }

      ${fieldHelpInline && `${StyledFieldHelp},`}
      ${StyledLabel} {
        padding-top: 4px;
        padding-bottom: 4px;
      }
    `}

    ${checked && `
      svg path {
        fill: ${theme.checkable.checked};
      }
    `}

    ${disabled && `
      svg {
        background-color: ${theme.disabled.input};
        border: 1px solid ${theme.disabled.border};
      }

      svg path { fill: ${(checked ? theme.disabled.border : theme.disabled.input)}; }

      ${StyledCheckableInputSvgWrapper} {
        &:hover, &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${fieldHelpInline && `
      ${StyledFieldHelp} {
        margin: 0;
      }
    `}

    ${inputWidth !== undefined && inputWidth !== 0 && `
      ${StyledFieldHelp} {
        ${reverse ? 'margin-right' : 'margin-left'}: ${inputWidth}% !important;
      }
    `}

    ${reverse && `
      ${StyledFieldHelp} {
        margin-left: 0;
      }
    `}

    ${reverse && fieldHelpInline && `
      ${StyledCheckableInput} { margin-right: 8px; }
    `}

    ${styledCheckBoxClassic}
  `}
`;

CheckboxStyle.defaultProps = {
  labelAlign: 'left',
  theme: baseTheme
};

CheckboxStyle.propTypes = {
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  fieldHelpInline: PropTypes.bool,
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.string
};

const StyledCheckboxGroup = styled.div`
  ${StyledIcon}::before {
    font-size: 16px;
  }

  ${StyledLabel} {
    margin-top: -2px;
  }

  & ${CheckboxStyle} {
    padding-top: 12px;

    & ${StyledFormField} {
      & ${StyledLabel} {
        line-height: 21px;
      }
    }
  }

  & > ${StyledFormField} {
    & > ${StyledLabel} {
      padding-bottom: 4px;

      label {
        vertical-align: middle;
      }

      ${StyledValidationIcon} {
        display: inline-block;
      }
    }
  }
`;

StyledCheckboxGroup.defaultProps = {
  theme: baseTheme
};

export { StyledCheckboxGroup };

export default CheckboxStyle;
