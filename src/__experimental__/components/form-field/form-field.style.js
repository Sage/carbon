import styled from 'styled-components';

const FormFieldStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin-top: 20px;
  }
`;

export default FormFieldStyle;
