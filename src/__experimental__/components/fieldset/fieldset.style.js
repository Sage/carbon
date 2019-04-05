import styled, { css } from 'styled-components';
import FormFieldStyle from '../form-field/form-field.style';

const FieldsetStyle = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;

  ${FormFieldStyle} {
    margin-top: 0;
    margin-bottom: -1px;
  }
`;

const LegendStyle = styled.legend`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 32px;

  ${({ theme }) => theme.name === 'classic' && css`
    color: ${theme.label.color};
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
    margin: 0 0 8px 0;
    padding: 0 6px;
  `}
`;

export {
  FieldsetStyle,
  LegendStyle
};
