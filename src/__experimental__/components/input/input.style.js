import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const StyledInput = styled.input`
  background: transparent;
  border: none;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text.color};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.text.size};
  height: 100%;
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

StyledInput.defaultProps = {
  theme: baseTheme
};

StyledInput.propTypes = {
  disabled: PropTypes.bool
};

export default StyledInput;
