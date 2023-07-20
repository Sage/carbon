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
  extends Pick<
    DateInputProps,
    "inputWidth" | "size" | "maxWidth" | "labelInline"
  > {
  applyDateRangeStyling?: boolean;
}

const StyledDateInput = styled.div<StyledDateInputProps>`
  ${margin}

  & ${StyledInputPresentation} {
    flex: none;
    width: ${({ inputWidth, maxWidth, size = "medium" }) =>
      maxWidth || inputWidth ? "" : datePickerWidth[size]};

    ${StyledInput} {
      margin-right: -8px;
    }
  }

  ${({ applyDateRangeStyling, maxWidth, size = "medium", labelInline }) =>
    applyDateRangeStyling &&
    !labelInline &&
    css`
      ${FieldLineStyle} {
        max-width: ${maxWidth || datePickerWidth[size]}};
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
