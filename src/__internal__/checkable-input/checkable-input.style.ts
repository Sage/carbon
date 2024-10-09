import styled, { css } from "styled-components";

import FieldHelpStyle from "../field-help/field-help.style";
import { FieldLineStyle } from "../form-field/form-field.style";
import LabelStyle, { StyledLabelContainer } from "../label/label.style";
import StyledValidationIcon from "../validations/validation-icon.style";
import StyledHelp from "../../components/help/help.style";

import HiddenCheckableInputStyle from "./hidden-checkable-input.style";

const StyledCheckableInput = styled.div`
  display: inline-block;
  position: relative;
`;

export interface StyledCheckableInputWrapperProps {
  disabled?: boolean;
  fieldHelpInline?: boolean;
  inputWidth?: number | string;
  labelWidth?: number;
  labelInline?: boolean;
  reverse?: boolean;
}

const StyledCheckableInputWrapper = styled.div<StyledCheckableInputWrapperProps>`
  ${({
    disabled,
    fieldHelpInline,
    inputWidth,
    labelWidth,
    labelInline,
    reverse,
  }) => css`
    width: 100% !important;

    ${FieldLineStyle} {
      display: flex;
    }

    ${StyledLabelContainer} {
      ${labelInline &&
      css`
        justify-content: ${reverse ? "flex-start" : "flex-end"};
      `}
      padding-top: 0;
      width: auto;

      & ${StyledHelp}, & ${StyledValidationIcon} {
        color: var(--colorsUtilityYin065);
        vertical-align: middle;

        &:hover,
        &:focus {
          color: var(--colorsUtilityYin090);
        }
      }
    }

    ${FieldHelpStyle} {
      flex-basis: 100%;
    }

    ${disabled &&
    css`
      ${HiddenCheckableInputStyle},
      ${LabelStyle} {
        &:hover,
        &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${fieldHelpInline &&
    css`
      ${FieldLineStyle} {
        flex-wrap: nowrap;
      }

      ${StyledCheckableInput} {
        margin-right: 0;
        margin-left: 8px;
      }

      ${FieldHelpStyle} {
        flex-grow: 0;
        flex-basis: auto;
        padding-left: 0;
        width: auto;
      }
    `}

    ${reverse &&
    fieldHelpInline &&
    css`
      ${StyledCheckableInput} {
        margin-left: 0;
      }

      ${FieldHelpStyle} {
        flex-grow: 1;
      }
    `}

    ${inputWidth !== undefined &&
    inputWidth !== 0 &&
    css`
      ${StyledCheckableInput} {
        width: ${inputWidth}% !important;
        min-width: 67px;
      }
    `}

    ${labelWidth !== undefined &&
    labelWidth !== 0 &&
    `
      ${StyledLabelContainer} {
        width: ${labelWidth}% !important;
      }
    `}
  `}
`;

export { StyledCheckableInput, StyledCheckableInputWrapper };
