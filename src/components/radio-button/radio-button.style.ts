import styled, { css } from "styled-components";
import { margin } from "styled-system";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import CheckboxStyle from "../checkbox/checkbox.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import { RadioButtonProps } from "./radio-button.component";

const RadioButtonStyle = styled(CheckboxStyle).attrs(applyBaseTheme)<
  Pick<
    RadioButtonProps,
    "disabled" | "fieldHelpInline" | "reverse" | "size"
  > & { inline?: boolean }
>`
  ${({ disabled, fieldHelpInline, reverse, size, inline }) => css`
    margin-bottom: var(--spacing150);

    :last-of-type {
      margin-bottom: 0;
    }

    && ${FormFieldStyle} {
      margin: 0;
    }

    ${StyledCheckableInputSvgWrapper} {
      padding: 0;
    }

    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: var(--borderRadiusCircle);
    }

    ${StyledCheckableInput},
    ${HiddenCheckableInputStyle},
    ${StyledCheckableInputSvgWrapper},
    svg {
      height: 16px;
      width: 16px;
    }

    svg {
      padding: 1px;
    }

    circle {
      r: 5;
    }

    ${StyledLabelContainer} {
      flex: 1 1 calc(100% - 44px);
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: var(--colorsUtilityYin090);
    }

    ${disabled &&
    css`
      circle {
        fill: var(--colorsUtilityDisabled400);
      }

      ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
        fill: var(--colorsUtilityDisabled600);
      }
    `}

    ${(fieldHelpInline || reverse) &&
    `
      ${FieldHelpStyle} {
        margin-left: 0;
        margin-right: 6px;
      }

      ${StyledLabelContainer} {
        flex: 0 1 auto;
      }
    `}

    ${size === "large" &&
    css`
      ${StyledCheckableInput},
      ${HiddenCheckableInputStyle},
      ${StyledCheckableInputSvgWrapper},
      svg {
        height: 24px;
        width: 24px;
      }

      circle {
        r: 3.75;
      }

      ${reverse &&
      css`
        ${!fieldHelpInline &&
        `
          ${FieldHelpStyle} {
            padding: 0;
          }
        `}
      `}
    `}

    ${inline &&
    `
      margin: 0;
      &:not(:first-of-type) {
        margin-left: 32px;
      }
    `}
  `}

  ${margin};
`;

export default RadioButtonStyle;
