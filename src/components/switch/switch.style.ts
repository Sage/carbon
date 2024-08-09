import styled, { css } from "styled-components";
import { margin } from "styled-system";

import baseTheme, { ThemeObject } from "../../style/themes/base";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import StyledSwitchSlider from "./__internal__/switch-slider.style";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import { FieldLineStyle } from "../../__internal__/form-field/form-field.style";
import { SwitchProps } from "./switch.component";
import addFocusStyling from "../../style/utils/add-focus-styling";

interface StyledSwitchProps
  extends Pick<
    SwitchProps,
    "fieldHelpInline" | "labelInline" | "reverse" | "size"
  > {
  theme: ThemeObject;
}

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
`;

export const ErrorBorder = styled.span`
  ${({ warning }: { warning: boolean }) => css`
    position: absolute;
    z-index: 6;
    width: 2px;
    background-color: ${warning
      ? "var(--colorsSemanticCaution500)"
      : "var(--colorsSemanticNegative500)"};
    left: -12px;
    bottom: -4px;
    top: 2px;
  `}
`;

export const StyledHintText = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  color: var(--colorsUtilityYin055);
  font-size: 14px;
  font-weight: 400;
`;

const StyledSwitch = styled.div`
  ${({
    fieldHelpInline,
    labelInline,
    reverse,
    size,
    theme,
  }: StyledSwitchProps) => css`
    ${margin}
    ${FieldLineStyle} {
      display: flex;
      flex-flow: ${labelInline ? "row wrap" : "column wrap"};

      ${!labelInline &&
      fieldHelpInline &&
      css`
        display: grid;
        grid-template-columns: max-content max-content;
      `}
    }

    ${StyledCheckableInput}, ${HiddenCheckableInputStyle} {
      border: none;
      box-sizing: border-box;
      height: 24px;
      flex-basis: 100%;
      margin-left: 0;
    }

    ${HiddenCheckableInputStyle} {
      width: 100%;
    }

    ${StyledCheckableInput} {
      width: min-content;
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus ~ ${StyledSwitchSlider} {
        ${!theme.focusRedesignOptOut
          ? addFocusStyling()
          : /* istanbul ignore next */ oldFocusStyling}
      }
    }

    ${FieldHelpStyle} {
      margin-left: 0;
    }

    ${StyledLabelContainer} {
      ${!labelInline &&
      css`
        padding: 0;
      `};
      margin-bottom: 8px;

      ${StyledValidationIcon} {
        position: relative;
        display: inline-block;
      }
    }

    ${fieldHelpInline &&
    css`
      ${FieldHelpStyle} {
        margin: 0;
      }
    `}

    ${reverse &&
    css`
      ${!labelInline &&
      css`
        ${StyledLabelContainer} {
          margin-top: 8px;
        }

        ${fieldHelpInline &&
        css`
          ${FieldHelpStyle} {
            margin-top: 8px;
          }
        `}
      `}
    `}

    ${labelInline &&
    css`
      ${StyledCheckableInput} {
        flex-basis: auto;
      }

      ${FieldLineStyle} {
        display: flex;
      }

      ${StyledLabelContainer} {
        margin-bottom: 0;
      }

      ${FieldHelpStyle} {
        margin-bottom: 0;
        margin-top: 0;
      }

      ${reverse &&
      css`
        ${StyledCheckableInput} {
          margin-left: 0;
          margin-top: 0;
        }

        ${!fieldHelpInline &&
        css`
          ${FieldHelpStyle} {
            margin-left: 60px;
          }
        `}
      `}

      ${fieldHelpInline &&
      css`
        ${!reverse &&
        `
          ${StyledCheckableInput} {
            margin-left: 10px;
          }
        `}

        ${StyledLabelContainer} {
          margin-right: 10px;
        }

        ${FieldHelpStyle} {
          margin-left: 0;
          align-self: center;
        }
      `}
    `}

    ${size === "large" &&
    css`
      ${StyledCheckableInput}, ${HiddenCheckableInputStyle}, ${StyledSwitchSlider} {
        height: 44px;
        min-width: fit-content;
      }

      ${labelInline &&
      !fieldHelpInline &&
      reverse &&
      css`
        ${FieldHelpStyle} {
          padding: 10px 0;
        }
      `}

      ${labelInline &&
      css`
        ${StyledLabelContainer} {
          margin-top: 1px;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        ${!fieldHelpInline &&
        reverse &&
        css`
          ${FieldHelpStyle} {
            margin-left: 78px;
          }
        `}
      `}
    `}
  `}
`;

StyledSwitch.defaultProps = {
  theme: baseTheme,
};

export default StyledSwitch;
