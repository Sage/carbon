import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";

import baseTheme from "../../style/themes/base";
import StyledInput from "../../__internal__/input/input.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import { FieldLineStyle } from "../../__internal__/form-field/form-field.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import StyledLabel from "../../__internal__/label/label.style";

const datePickerWidth = {
  large: "140px",
  medium: "135px",
  small: "120px",
};

const StyledDateInput = styled.div`
  ${margin}

  & ${StyledInputPresentation} {
    flex: none;
    width: ${({ size }) => datePickerWidth[size]};

    ${StyledInput} {
      margin-right: -8px;
    }
  }

  ${({ applyDateRangeStyling, size, labelInline }) =>
    applyDateRangeStyling &&
    !labelInline &&
    css`
      ${FieldLineStyle} {
        max-width: ${datePickerWidth[size]};
      }

      ${StyledValidationMessage}, ${StyledLabel} {
        overflow-wrap: anywhere;
      }
    `}
`;

StyledDateInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

StyledDateInput.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

export default StyledDateInput;
