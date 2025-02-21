import styled, { css } from "styled-components";
import StyledFormField from "../../../__internal__/form-field/form-field.style";
import StyledIcon from "../../icon/icon.style";
import CheckboxStyle from "../checkbox.style";
import { StyledLabelContainer } from "../../../__internal__/label/label.style";
import StyledValidationIcon from "../../../__internal__/validations/validation-icon.style";

const StyledCheckboxGroup = styled.div<{
  legendInline?: boolean;
  inline?: boolean;
}>`
  display: flex;
  flex-direction: column;
  ${StyledIcon}::before {
    font-size: 16px;
  }

  && ${StyledFormField} {
    margin: 0;
  }

  & ${CheckboxStyle} {
    margin-bottom: var(--spacing150);

    :last-of-type {
      margin-bottom: 0;
    }
  }

  & > ${StyledFormField} {
    & > ${StyledLabelContainer} {
      margin-bottom: 4px;
      vertical-align: middle;

      ${StyledValidationIcon} {
        display: inline-block;
      }
    }
  }

  ${({ legendInline }) =>
    legendInline &&
    css`
      ${CheckboxStyle}:first-child {
        padding-top: 4px;
      }
    `}

  ${({ inline }) =>
    inline &&
    css`
      flex-direction: row;
      ${CheckboxStyle}:not(:first-of-type) {
        margin-left: 32px;
      }
    `}
`;

export default StyledCheckboxGroup;
