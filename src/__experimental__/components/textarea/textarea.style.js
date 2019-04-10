import styled from 'styled-components';
import FormFieldStyle from '../form-field/form-field.style';

const StyledTextarea = styled.div`
  ${FormFieldStyle} {
    textarea {
      background-color: transparent;
      flex: 1;
      padding-top: 12px;
      padding-bottom: 12px;
      border: none;
      resize: none;
      box-sizing: border-box;
    
      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
`;

export default StyledTextarea;
