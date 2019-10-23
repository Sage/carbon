import styled from 'styled-components';
import FormFieldStyle from '../form-field/form-field.style';
import fieldsetClassicStyle from './fieldset-classic.style';

const FieldsetStyle = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;

  &&& ${FormFieldStyle} {
    margin-top: 0;
    margin-bottom: -1px;
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
`;

export {
  FieldsetStyle,
  LegendContainerStyle
};
