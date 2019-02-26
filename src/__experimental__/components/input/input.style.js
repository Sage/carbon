import styled from 'styled-components';

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  flex-grow: 1;
  width: 30px;
  color: ${({ theme }) => theme.input.color};
  font-size: ${({ theme, size }) => {
    return theme.input.dimensions[size].fontSize;
  }};
`;

export default StyledInput;
