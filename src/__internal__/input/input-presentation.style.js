import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import sizes from "./input-sizes.style";

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
    `}

  ${stylingForValidations}

  ${({ readOnly, theme, error }) =>
    readOnly &&
    css`
      background-color: ${theme.readOnly.textboxBackground};
      ${!error && `border-color: ${theme.readOnly.textboxBorder}`};
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
    border-color: ${validationColor};
    z-index: 1;
    ${error &&
    `box-shadow: inset 1px 1px 0 ${validationColor}, inset -1px -1px 0 ${validationColor};`}
  `;
}

InputPresentationStyle.defaultProps = {
  size: "medium",
  theme: baseTheme,
};

InputPresentationStyle.propTypes = {
  align: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InputPresentationStyle;
