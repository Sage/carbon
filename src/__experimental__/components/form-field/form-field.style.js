import styled from "styled-components";
import { space } from "styled-system";
import BaseTheme from "../../../style/themes/base";

const FormFieldStyle = styled.div`
  & + & {
    margin-top: 16px;
  }

  &&& {
    ${space}
  }
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme,
};

const FieldLineStyle = styled.div`
  ${({ inline }) => {
    if (inline) {
      return `
        display: flex;
      `;
    }

    return "display: block;";
  }}
`;

export { FieldLineStyle };
export default FormFieldStyle;
