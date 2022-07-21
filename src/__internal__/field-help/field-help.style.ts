import styled, { css } from "styled-components";

export interface StyledFieldHelpProps {
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
}

const StyledFieldHelp = styled.span<StyledFieldHelpProps>`
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

export default StyledFieldHelp;
