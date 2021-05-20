import styled, { css } from "styled-components";
import StyledValidationIcon from "../validations/validation-icon.style";
import StyledIconSpan from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import { baseTheme } from "../../style/themes";
import StyledFormField from "../../__experimental__/components/form-field/form-field.style";
import StyledInputPresentantion from "../../__experimental__/components/input/input-presentation.style";
import StyledIcon from "../icon/icon.style";

export const StyledNumeralDate = styled.div`
  display: inline-flex;
  border: 1px solid transparent;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 2px;
  padding-top: 1px;

  ${StyledFormField} {
    margin-top: 0px;
  }
`;
StyledNumeralDate.defaultProps = { theme: baseTheme };

export const StyledDateField = styled.div`
  ${({ isYearInput, theme, isEnd, hasValidationIcon, isMiddle }) => {
    const yearInputOrError = isYearInput || (isEnd && hasValidationIcon);

    return css`
      ${StyledInputPresentantion} {
        position: relative;
        width: ${yearInputOrError ? "78px;" : "58px;"};
        text-align: center;

        ${
          (isMiddle || isEnd) &&
          css`
            margin-left: -1px;
          `
        }

        ${StyledIcon} {
          display: flex;
          color: ${theme.numeralDate.error};
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        ${StyledIconSpan} {
          width: 32px;
          z-index: 999;
        }

        ${StyledValidationIcon} {
          z-index: 9000;
        }
      `;
  }}
`;

StyledDateField.defaultProps = { theme: baseTheme };
