import { space } from "../../style/utils/spacing";
import styled, { css } from "styled-components";

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
}
const FieldLineStyle = styled.div<FieldLineStyleProps>`
  ${({ inline, maxWidth }) => css`
    display: ${inline ? "flex" : "block"};
    ${maxWidth && `max-width: ${maxWidth};`}
  `}
`;

export { FieldLineStyle };
export default FormFieldStyle;
