import styled, { css } from "styled-components";
import labelConfig from "../../../components/textbox/__next__/config";

const InputWrapper = styled.div`
  position: relative;
  ${({ labelInline }: { labelInline?: boolean }) =>
    labelInline &&
    css`
      width: 100%;
    `}
  ${({
    labelInline,
    size,
  }: {
    labelInline?: boolean;
    size?: "small" | "medium" | "large";
  }) =>
    size &&
    css`
      ${labelInline
        ? labelConfig[size].gap.inline
        : labelConfig[size].gap.nonInline}
    `}

  [data-role="validation-message"] {
    margin: 0px;
  }
`;

export default InputWrapper;
