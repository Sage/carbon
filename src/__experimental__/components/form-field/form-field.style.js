import styled from 'styled-components';

const FormFieldStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin-top: ${({ theme }) => theme.input.gutter};
  }
`;

export default FormFieldStyle;
