import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledInput = styled.input`
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
    color: ${theme.text.disabled};
    cursor: not-allowed;
  `}
`;

StyledInput.defaultProps = {
  theme: baseTheme
};

export default StyledInput;
