import styled from "styled-components";
import { margin } from "styled-system";

import FormFieldStyle from "../../__experimental__/components/form-field/form-field.style";
import ValidationIconStyle from "../validations/validation-icon.style";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";
import CheckboxStyle from "../checkbox/checkbox.style";

const FieldsetStyle = styled.fieldset`
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

const LegendContainerStyle = styled.div`
  ${({ inline }) =>
    inline &&
    `
  margin-right: 32px;
  height: 34px !important;
  `}
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  legend {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin-right: 4px;
  }

  ${ValidationIconStyle} ${StyledIcon}:focus {
    outline: 2px solid #ffb500;
  }
`;

const FieldsetContentStyle = styled.div`
  ${({ inline }) => inline && "display: flex;"}
`;

export { FieldsetStyle, LegendContainerStyle, FieldsetContentStyle };
