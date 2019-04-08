import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  padding-top: 12px;
  padding-bottom: 12px;
  border: none;
  resize: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

export default StyledTextarea;
