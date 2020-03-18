import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text.color};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.text.size};
  outline: none;
  width: 30px;

  ${({ align }) => align && css`
    text-align: ${align};
  `}

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.disabled};
    cursor: not-allowed;
  `}

  &:invalid, &:required {
    box-shadow: none;
  }

  ${({ readOnly, theme }) => readOnly && css`
    color: ${theme.readOnly.textboxText};
  `}

  ${({ styleOverride }) => styleOverride};
`;

StyledInput.defaultProps = {
  theme: baseTheme
};

StyledInput.propTypes = {
  disabled: PropTypes.bool,
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default StyledInput;
