import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import sizes from "./input-sizes.style";

export const StyledInputPresentationContainer = styled.div`
  flex: 0 0 ${({ inputWidth }) => inputWidth}%;
  display: flex;
  position: relative;
`;

const InputPresentationStyle = styled.div`
  align-items: stretch;
  background: #fff;
  border: 1px solid var(--colorsUtilityMajor300);
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  min-height: ${({ size }) => sizes[size].height};
  padding-left: ${({ size }) => sizes[size].horizontalPadding};
  padding-right: ${({ size }) => sizes[size].horizontalPadding};

  ${({ disabled }) =>
    disabled &&
    css`
      background: var(--colorsUtilityDisabled400);
      border-color: var(--colorsUtilityDisabled600);
      cursor: not-allowed;
    `}

  ${({ hasFocus }) =>
    hasFocus &&
    css`
      & {
        outline: 3px solid var(--colorsSemanticFocus500);
        z-index: 2;
      }
    `}

  ${stylingForValidations}

  ${({ readOnly }) =>
    readOnly &&
    css`
      background-color: var(--colorsUtilityReadOnly400);
      border-color: var(--colorsUtilityReadOnly600);
    `}

  ${({ align }) => align === "right" && "flex-direction: row-reverse"}

  input::-ms-clear {
    display: none;
  }
  input::-webkit-contacts-auto-fill-button {
    display: none !important;
  }
`;

function stylingForValidations({ error, warning, info, disabled }) {
  let validationColor;

  if (disabled) {
    return "";
  }

  if (error) {
    validationColor = "var(--colorsSemanticNegative500)";
  } else if (warning) {
    validationColor = "var(--colorsSemanticCaution500)";
  } else if (info) {
    validationColor = "var(--colorsSemanticInfo500)";
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

InputPresentationStyle.defaultProps = {
  size: "medium",
};

InputPresentationStyle.propTypes = {
  align: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default InputPresentationStyle;
