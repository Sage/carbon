import styled from "styled-components";
import { margin } from "styled-system";

import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import baseTheme from "../../style/themes/base";
import CheckboxStyle from "../checkbox/checkbox.style";

const FieldsetStyle = styled.fieldset`
  margin: 0;
  ${margin}
  border: none;
  padding: 0;

  &&&& ${FormFieldStyle} {
    margin-top: 0;
    margin-bottom: -1px;
  }

  & ${CheckboxStyle} {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

FieldsetStyle.defaultProps = {
  theme: baseTheme,
};

const StyledLegend = styled.legend`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-right: 4px;
`;

export { FieldsetStyle, StyledLegend };
