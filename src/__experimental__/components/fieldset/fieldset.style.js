import styled from 'styled-components';
import FormFieldStyle from '../form-field/form-field.style';
import InputPresentation from '../input/input-presentation.style';

const FieldsetStyle = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;

  ${FormFieldStyle} {
    margin-top: 0;
    margin-bottom: -1px;
  }
  ${InputPresentation} {
    border: 1px solid #668592;
  }
`;

const LegendStyle = styled.legend`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 32px;
`;

export {
  FieldsetStyle,
  LegendStyle
};
