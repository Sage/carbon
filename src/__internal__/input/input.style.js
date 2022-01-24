import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: var(--colorsUtilityYin090);
  flex-grow: 1;
  font-size: var(--fontSizes100);
  outline: none;
  padding: 0;
  margin: 0;
  width: 30px;

  &:-webkit-autofill {
    background-clip: text;
    -webkit-background-clip: text;
  }

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  &::placeholder {
    color: var(--colorsUtilityYin030);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--colorsUtilityYin030);
      cursor: not-allowed;
    `}

  ${({ readOnly }) =>
    readOnly &&
    css`
      color: var(--colorsActionMinorYin090);
    `}
`;

StyledInput.propTypes = {
  disabled: PropTypes.bool,
};

export default StyledInput;
