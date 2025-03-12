import styled, { css } from "styled-components";
import { margin } from "styled-system";

import baseTheme from "../../style/themes/base";
import StyledInput from "../../__internal__/input/input.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import { FieldLineStyle } from "../../__internal__/form-field/form-field.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import StyledLabel from "../../__internal__/label/label.style";
import { DateInputProps } from "./date.component";

const datePickerWidth = {
  large: "140px",
  medium: "135px",
  small: "120px",
};

interface StyledDateInputProps
  extends Pick<DateInputProps, "inputWidth" | "maxWidth" | "labelInline"> {
  applyDateRangeStyling?: boolean;
  size: Required<DateInputProps>["size"];
}

const StyledDateInput = styled.div<StyledDateInputProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}

  & ${StyledInputPresentation} {
    flex: none;
    width: ${({ inputWidth, maxWidth, size }) =>
      maxWidth || inputWidth ? "" : datePickerWidth[size]};

    ${StyledInput} {
      margin-right: -8px;
    }
  }

  ${({ applyDateRangeStyling, maxWidth, size, labelInline }) =>
    applyDateRangeStyling &&
    !labelInline &&
    css`
      ${FieldLineStyle} {
        max-width: ${maxWidth || datePickerWidth[size]};
      }

      ${StyledValidationMessage}, ${StyledLabel} {
        overflow-wrap: anywhere;
      }
    `}
`;

StyledDateInput.defaultProps = {
  theme: baseTheme,
};

export default StyledDateInput;
