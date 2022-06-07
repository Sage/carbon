import styled, { css } from "styled-components";
import { FieldHelpProps } from "./field-help.component";

const FieldHelpStyle = styled.span<
  Pick<FieldHelpProps, "labelInline" | "labelWidth">
>`
  display: block;
  flex: 1;
  margin-top: 8px;
  white-space: pre-wrap;

  ${({ labelInline, labelWidth }) =>
    labelInline &&
    css`
      margin-left: ${labelWidth}%;
      padding-left: 0;
    `}
`;

export default FieldHelpStyle;
