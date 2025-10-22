import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const FormFieldStyle = styled.div.attrs(applyBaseTheme)`
  position: relative;
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
  gap?: string;
}
const FieldLineStyle = styled.div<FieldLineStyleProps>`
  ${({ inline, maxWidth, gap }) => css`
    ${gap && `gap: ${gap};`}
    display: flex;
    flex-direction: ${inline ? "row" : "column"};
    ${maxWidth && `max-width: ${maxWidth};`}
  `}
`;

export { FieldLineStyle };
export default FormFieldStyle;
