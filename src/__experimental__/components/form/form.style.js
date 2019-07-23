import styled from 'styled-components';
import StyledFormField from '../form-field/form-field.style';
import StyledButton from '../../../components/button/button.style';

export const StyledFormFooter = styled.div`
 && ${StyledButton} {
  margin-top: 0;
  border-left-style: solid;
  border-left-color: white;
  border-right-style: solid;
  border-right-color: white;
  border-width: 0;
  box-sizing: border-box;
  margin-left: 15px;
 }

.carbon-dialog__dialog--fixed-bottom.carbon-dialog__dialog--sticky-form-footer .carbon-form,
.carbon-form--sticky-footer {
  padding-bottom: 80px;



  animation: form-buttons-animate-in 0.25s ease-out;
    background-color: white;
    bottom: 0;
    box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.05);
    box-sizing: content-box;
    left: 0;
    padding-bottom: 13px;
    padding-top: 15px;
    position: fixed;
    width: 100%;
    z-index: 1000;
}
`;

const StyledForm = styled.form`
  && ${StyledFormField} {
    margin-bottom: 32px;
  }
`;


export default StyledForm;
