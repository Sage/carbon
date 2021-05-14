import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";
import OptionsHelper from "../../../utils/helpers/options-helper";
import sizes from "./input-sizes.style";
import StyledInput from "./input.style";
import StyledInlineInputs from "../../../components/inline-inputs/inline-inputs.style";

export const StyledInputPresentationContainer = styled.div`
  flex: 0 0 ${({ inputWidth }) => inputWidth}%;
  display: flex;
  position: relative;
`;

const InputPresentationStyle = styled.div`
  align-items: stretch;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  min-height: ${({ size }) => sizes[size].height};
  padding-left: ${({ size }) => sizes[size].horizontalPadding};
  padding-right: ${({ size }) => sizes[size].horizontalPadding};

  ${StyledInput} {
    &:-webkit-autofill {
      margin-top: 2px;
    }
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.disabled.input};
      border-color: ${theme.disabled.border};
      cursor: not-allowed;
    `}

  ${({ hasFocus, theme }) =>
    hasFocus &&
    css`
      && {
        outline: 3px solid ${theme.colors.focus};
        z-index: 2;
      }

      ${StyledInlineInputs} && {
        position: relative;
      }
    `}

  ${stylingForValidations}

  ${({ readOnly, theme }) =>
    readOnly &&
    css`
      background-color: ${theme.readOnly.textboxBackground};
      border-color: ${theme.readOnly.textboxBorder};
    `}

  ${({ align }) => align === "right" && "flex-direction: row-reverse"}

  input::-ms-clear {
    display: none;
  }
  input::-webkit-contacts-auto-fill-button {
    display: none !important;
  }
`;

function stylingForValidations({ theme, error, warning, info, disabled }) {
  let validationColor;

  if (disabled) {
    return "";
  }

  if (error) {
    validationColor = theme.colors.error;
  } else if (warning) {
    validationColor = theme.colors.warning;
  } else if (info) {
    validationColor = theme.colors.info;
  } else {
    return "";
  }

  return css`
    border-color: ${validationColor} !important;
    z-index: 1;
    ${error &&
    `box-shadow: inset 1px 1px 0 ${validationColor}, inset -1px -1px 0 ${validationColor};`}
  `;
}

InputPresentationStyle.safeProps = [
  "align",
  "disabled",
  "hasFocus",
  "inputWidth",
  "readOnly",
  "size",
  "error",
  "warning",
  "info",
];

InputPresentationStyle.defaultProps = {
  inputWidth: 100,
  size: "medium",
  theme: baseTheme,
};

InputPresentationStyle.propTypes = {
  align: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  inputWidth: PropTypes.number,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InputPresentationStyle;
