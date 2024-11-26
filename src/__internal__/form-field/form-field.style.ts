import styled, { css } from "styled-components";
import { space } from "styled-system";
import { baseTheme } from "../../style/themes";

const FormFieldStyle = styled.div`
  & + & {
    margin-top: 16px;
  }

  &&& {
    ${space}
  }
`;

FormFieldStyle.defaultProps = {
  theme: baseTheme,
};

export interface FieldLineStyleProps {
  inline?: boolean;
  maxWidth?: string;
}
const FieldLineStyle = styled.div<FieldLineStyleProps>`
  ${({ inline, maxWidth }) => css`
    display: ${inline ? "flex" : "block"};
    ${maxWidth && `max-width: ${maxWidth};`}
  `}
`;

export { FieldLineStyle };
export default FormFieldStyle;
