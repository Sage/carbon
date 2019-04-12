import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const inputStyle = css`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text.color};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.text.size};
  outline: none;
  width: 30px;

  &::placeholder {
    color: ${({ theme }) => theme.text.placeholder};
  }

  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.text};
    cursor: not-allowed;
  `}
`;

const StyledInput = styled.input`
  ${inputStyle}
`;

StyledInput.defaultProps = {
  theme: baseTheme
};

StyledInput.propTypes = {
  disabled: PropTypes.bool
};

export { StyledInput as default, inputStyle };
