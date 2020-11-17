import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text.color};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.text.size};
  outline: none;
  padding: 0;
  width: 30px;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-border: none;
  }

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.disabled.disabled};
      cursor: not-allowed;
    `}

  &:invalid, &:required {
    box-shadow: none;
  }

  ${({ readOnly, theme }) =>
    readOnly &&
    css`
      color: ${theme.readOnly.textboxText};
    `}

  ${({ styleOverride }) => styleOverride};
`;

StyledInput.defaultProps = {
  theme: baseTheme,
};

StyledInput.propTypes = {
  disabled: PropTypes.bool,
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default StyledInput;
