import styled, { css } from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";
import { StyledCheckableInput } from "../checkable-input/checkable-input.style";
import StyledFieldHelp from "../field-help/field-help.style";
import StyledHiddenCheckableInput from "../checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../checkable-input/checkable-input-svg-wrapper.style";
import StyledLabel, { StyledLabelContainer } from "../label/label.style";
import StyledValidationIcon from "../../../components/validations/validation-icon.style";
import StyledFormField from "../form-field/form-field.style";
import StyledIcon from "../../../components/icon/icon.style";

const CheckboxStyle = styled.div`
  ${space}
  ${({
    disabled,
    error,
    warning,
    info,
    fieldHelpInline,
    labelSpacing,
    inputWidth,
    reverse,
    size,
    theme,
  }) => css`
    ${StyledCheckableInput} {
      padding-top: 1px;
    }

    ${StyledCheckableInputSvgWrapper} {
      height: 16px;
    }

    svg {
      background-color: ${theme.colors.white};
      ${!disabled &&
      css`
        border: 1px solid ${theme.colors.border};

        ${info && `border: 1px solid ${theme.colors.info};`}
        ${warning && `border: 1px solid ${theme.colors.warning};`}
        ${error && `border: 2px solid ${theme.colors.error};`}
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
      min-width: 16px;
      width: 16px;
    }

    // prettier-ignore
    ${StyledHiddenCheckableInput}:not([disabled]) {
      &:focus + ${StyledCheckableInputSvgWrapper},
      &:hover + ${StyledCheckableInputSvgWrapper} {
        box-shadow: 0 0 0 3px ${theme.colors.focus};
      }
    }

    ${StyledLabelContainer} {
      width: auto;
      flex: 0 1 auto;
    }

    ${StyledFieldHelp} {
      margin-left: 16px;
      margin-top: 0;
      padding-left: ${labelSpacing * theme.spacing}px;
    }

    ${StyledValidationIcon} {
      position: relative;
      display: inline-block;
    }

    ${size === "large" &&
    css`
      ${StyledCheckableInputSvgWrapper} {
        height: 24px;
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
        padding-left: ${labelSpacing * theme.spacing}px;
      }

      ${fieldHelpInline &&
      css`
        ${StyledFieldHelp}, ${StyledLabelContainer} {
          align-self: center;
        }
      `}
    `}

    ${StyledHiddenCheckableInput}:checked ~ ${StyledCheckableInputSvgWrapper} svg path {
      fill: ${theme.checkable.checked};
    }

    ${disabled &&
    css`
      svg {
        background-color: ${theme.disabled.input};
        border: 1px solid ${theme.disabled.border};
      }

      svg path {
        fill: ${theme.disabled.input};
      }

      ${StyledHiddenCheckableInput}:checked ~ ${StyledCheckableInputSvgWrapper} svg path {
        fill: ${theme.disabled.border};
      }

      ${StyledCheckableInputSvgWrapper} {
        &:hover,
        &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${fieldHelpInline &&
    `
      ${StyledFieldHelp} {
        margin-left: 0;
      }

      ${StyledLabel} {
        flex: 0 1 auto;
      }
    `}

    ${inputWidth !== undefined &&
    inputWidth !== 0 &&
    `
      ${StyledFieldHelp} {
        ${reverse ? "margin-right" : "margin-left"}: ${inputWidth}% !important;
      }
    `}

    ${reverse &&
    css`
      ${StyledFieldHelp} {
        margin-left: 0;
        padding-left: 0;
      }

      ${StyledLabel} {
        flex: 0 1 auto;
      }

      ${fieldHelpInline &&
      css`
        ${StyledCheckableInput} {
          margin-right: 8px;
        }

        ${StyledFieldHelp} {
          padding-left: 6px;
        }
      `}
    `}
  `}
`;

CheckboxStyle.defaultProps = {
  theme: baseTheme,
};

CheckboxStyle.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fieldHelpInline: PropTypes.bool,
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.string,
};

const StyledCheckboxGroup = styled.div`
  ${StyledIcon}::before {
    font-size: 16px;
  }

  & ${CheckboxStyle} {
    padding-top: 12px;
  }

  & > ${StyledFormField} {
    & > ${StyledLabelContainer} {
      margin-bottom: 4px;
      vertical-align: middle;

      ${StyledValidationIcon} {
        display: inline-block;
      }
    }
  }
`;

StyledCheckboxGroup.defaultProps = {
  theme: baseTheme,
};

export { StyledCheckboxGroup };

export default CheckboxStyle;
