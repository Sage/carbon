import styled, { css } from "styled-components";
import { margin } from "styled-system";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import StyledLabel from "../../__internal__/label/label.style";
import { DateInputProps } from "./date.component";

interface StyledDateInputProps
  extends Pick<DateInputProps, "inputWidth" | "maxWidth" | "labelInline"> {
  applyDateRangeStyling?: boolean;
  size: Required<DateInputProps>["size"];
}

const StyledDateInput = styled.div.attrs(applyBaseTheme)<StyledDateInputProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}

  ${({ applyDateRangeStyling, labelInline }) =>
    applyDateRangeStyling &&
    !labelInline &&
    css`
      ${StyledValidationMessage}, ${StyledLabel} {
        overflow-wrap: anywhere;
      }
    `}
`;

export default StyledDateInput;
