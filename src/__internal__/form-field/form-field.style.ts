import styled, { css } from "styled-components";
import { space } from "styled-system";
import { baseTheme } from "../../style/themes";

const FormFieldStyle = styled.div`
  &&& {
    ${space}
  }
`;

FormFieldStyle.defaultProps = {
  theme: baseTheme,
};

export interface FieldLineStyleProps {
  inline?: boolean;
}
const FieldLineStyle = styled.div<FieldLineStyleProps>`
  ${({ inline }) => css`
    display: ${inline ? "flex" : "block"};
  `}
`;

export { FieldLineStyle };
export default FormFieldStyle;
