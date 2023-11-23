import styled, { css } from "styled-components";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import StyledIconSpan from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import StyledInput from "../../__internal__/input/input.style";
import StyledFormField from "../../__internal__/form-field/form-field.style";
import StyledLabel from "../../__internal__/label/label.style";
import { StyledHintText } from "../textbox/textbox.style";

interface StyledDateFieldProps {
  isEnd?: boolean;
  isYearInput?: boolean;
  hasValidationIconInField?: boolean;
}

export const StyledNumeralDate = styled.div<{ name?: string }>`
  display: inline-flex;
  font-size: 14px;
  font-weight: 400;

  ${StyledFormField} {
    margin-top: 0px;
  }
  ${StyledLabel} {
    font-weight: 400;
  }

  ${StyledHintText} {
    color: var(--colorsUtilityYin090);
  }
`;

export const StyledDateField = styled.div<StyledDateFieldProps>`
  ${({ isYearInput, isEnd, hasValidationIconInField }) => {
    return css`
      ${StyledInputPresentation} {
        position: relative;
        margin-right: ${isEnd ? "0" : "12px"};
        min-width: ${isYearInput ? "80px" : "55px"};

        ${StyledInput} {
          text-align: center;
          padding: 0 12px;
          ${hasValidationIconInField && isEnd && "padding-right: 0"}
        }

        ${StyledIconSpan} {
          width: 32px;
          z-index: 999;
        }

        ${StyledValidationIcon} {
          z-index: 9000;
        }
      }
    `;
  }}
`;
