import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const FormFieldStyle = styled.div.attrs(applyBaseTheme)`
  margin-bottom: var(--fieldSpacing);
  & + & {
    margin-top: 16px;
  }

  &&& {
    ${space}
  }
`;

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
