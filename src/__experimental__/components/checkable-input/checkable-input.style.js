import styled from 'styled-components';
import FormFieldStyle from '../form-field/form-field.style';

const StyledCheckableInput = styled.div`
  display: inline-block;
  padding-top: 1px;
  position: relative;
`;

const StyledCheckableInputWrapper = styled.div`
  ${FormFieldStyle} {
    display: flex;
    flex-wrap: wrap;
  }
`;

export { StyledCheckableInput, StyledCheckableInputWrapper };
