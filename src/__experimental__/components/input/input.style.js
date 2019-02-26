import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  ${({ disabled }) => disabled && css`cursor: not-allowed;`}
  outline: none;
  flex-grow: 1;
  width: 30px;
  color: ${({ theme }) => theme.input.color};
  font-size: ${({ theme, size }) => {
    return theme.input.dimensions[size].fontSize;
  }};
`;

StyledInput.defaultProps = {
  theme: baseTheme,
  size: 'medium'
};

export default StyledInput;
