import styled from 'styled-components';
import FormFieldStyle from '../form-field/form-field.style';
import fieldsetClassicStyle from './fieldset-classic.style';
import ValidationIconStyle from '../../../components/validations/validation-icon.style';
import StyledIcon from '../../../components/icon/icon.style';
import CheckboxStyle from '../checkbox/checkbox.style';

const FieldsetStyle = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;

  &&& ${FormFieldStyle} {
    margin-top: 0;
    margin-bottom: -1px;
  }

  & ${CheckboxStyle} {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const LegendContainerStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  legend {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;

    ${fieldsetClassicStyle}
  }

  ${ValidationIconStyle} ${StyledIcon}:focus {
    outline: 2px solid #FFB500;
  }
`;

export {
  FieldsetStyle,
  LegendContainerStyle
};
