import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import labelConfig from "../../components/textbox/__next__/config";

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
  labelInline?: boolean;
  size?: "small" | "medium" | "large";
}
const FieldLineStyle = styled.div<FieldLineStyleProps>`
  ${({ inline, maxWidth, labelInline, size = "medium" }) => css`
    display: flex;
    flex-direction: ${inline ? "row" : "column"};
    ${maxWidth && `max-width: ${maxWidth};`}
    gap: ${labelInline
      ? labelConfig[size].gap.inline
      : labelConfig[size].gap.nonInline};
  `}
`;

interface LabelFieldProps {
  width?: number;
  labelInline?: boolean;
  isLarge?: boolean;
}

const LabelField = styled.div<LabelFieldProps>`
  ${({ width }) => width && `width: ${width}%;`}
  display: flex;
  flex-direction: column;
  ${({ labelInline }) => `align-items: ${labelInline ? "end" : "start"};`}
  ${({ isLarge }) =>
    `font-size: ${isLarge ? "var(--fontSizes200)" : "var(--fontSizes100)"};`}

  [data-role="label-container"] {
    all: revert;
  }
`;

export { FieldLineStyle, LabelField };
export default FormFieldStyle;
