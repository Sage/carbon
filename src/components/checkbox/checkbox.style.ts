import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import StyledFieldHelp from "../../__internal__/field-help/field-help.style";
import StyledHiddenCheckableInput from "../../__internal__/checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import StyledLabel, {
  StyledLabelContainer,
} from "../../__internal__/label/label.style";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import baseTheme from "../../style/themes/base";
import { ValidationProps } from "../../__internal__/validations";
import addFocusStyling from "../../style/utils/add-focus-styling";

export interface StyledCheckboxProps extends ValidationProps, MarginProps {
  disabled?: boolean;
  fieldHelpInline?: boolean;
  inputWidth?: number | string;
  size?: string;
  labelSpacing?: 1 | 2;
  reverse?: boolean;
  adaptiveSpacingSmallScreen?: boolean;
  applyNewValidation?: boolean;
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin}
  ${({
    disabled,
    error,
    warning,
    info,
    fieldHelpInline,
    labelSpacing,
    inputWidth,
    reverse,
    size,
    adaptiveSpacingSmallScreen,
    applyNewValidation,
  }) => css`
    ${adaptiveSpacingSmallScreen && "margin-left: 0;"}

    ${StyledCheckableInput} {
      padding-top: 1px;
    }

    ${StyledCheckableInputSvgWrapper} {
      height: 16px;
    }

    svg {
      background-color: var(--colorsUtilityYang100);
      ${!disabled &&
      css`
        border: 1px solid var(--colorsUtilityMajor300);

        ${info && `border: 1px solid var(--colorsSemanticInfo500);`}
        ${warning && `border: 1px solid var(--colorsSemanticCaution500);`}
        ${error && `border: 2px solid var(--colorsSemanticNegative500);`}

        ${warning &&
        applyNewValidation &&
        `border: 1px solid var(--colorsUtilityMajor300);`}
      `}
    }

    ${StyledHiddenCheckableInput},
    svg {
      height: 16px;
      position: absolute;
      padding: 1px;
    }

    ${StyledCheckableInput},
    ${StyledHiddenCheckableInput},
    ${StyledCheckableInputSvgWrapper},
    svg {
      box-sizing: border-box;
      min-width: 16px;
      width: 16px;
      border-radius: var(--borderRadius025);
      ${size === "large" && `border-radius: var(--borderRadius050)`};
    }

    // prettier-ignore
    ${StyledHiddenCheckableInput}:not([disabled]) {
        &:focus + ${StyledCheckableInputSvgWrapper} ,
        &:hover + ${StyledCheckableInputSvgWrapper} {
          ${addFocusStyling()}
      }
    }

    ${StyledLabelContainer} {
      width: auto;
      flex: 0 1 auto;
    }

    ${StyledFieldHelp} {
      margin-left: 16px;
      margin-top: 0;
      padding-left: ${labelSpacing === 1
        ? "var(--spacing100)"
        : "var(--spacing200)"};
    }

    ${StyledValidationIcon} {
      position: relative;
      display: inline-block;
    }

    ${size === "large" &&
    css`
      ${StyledCheckableInputSvgWrapper} {
        height: 24px;
      }

      ${StyledCheckableInput},
      ${StyledHiddenCheckableInput},
      ${StyledCheckableInputSvgWrapper},
      svg {
        height: 24px;
        width: 24px;
        min-width: 24px;
      }

      ${StyledFieldHelp} {
        margin-left: 24px;
      }

      ${fieldHelpInline &&
      css`
        ${StyledFieldHelp}, ${StyledLabelContainer} {
          align-self: center;
        }
      `}
    `}

    ${StyledHiddenCheckableInput}:checked ~ ${StyledCheckableInputSvgWrapper} svg path {
      fill: var(--colorsUtilityYin090);
    }

    ${disabled &&
    css`
      svg {
        background-color: var(--colorsUtilityDisabled400);
        border: 1px solid var(--colorsUtilityDisabled600);
      }

      svg path {
        fill: var(--colorsUtilityDisabled400);
      }

      ${StyledHiddenCheckableInput}:checked ~ ${StyledCheckableInputSvgWrapper} svg path {
        fill: var(--colorsUtilityYin030);
      }

      ${StyledCheckableInputSvgWrapper} {
        &:hover,
        &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${fieldHelpInline &&
    `
      ${StyledFieldHelp} {
        margin-left: 0;
      }

      ${StyledLabel} {
        flex: 0 1 auto;
      }
    `}

    ${inputWidth !== undefined &&
    inputWidth !== 0 &&
    `
      ${StyledFieldHelp} {
        ${reverse ? "margin-right" : "margin-left"}: ${inputWidth}% !important;
      }
    `}

    ${reverse &&
    css`
      ${StyledFieldHelp} {
        margin-left: 0;
        padding-left: 0;
      }

      ${StyledLabel} {
        flex: 0 1 auto;
      }

      ${fieldHelpInline &&
      css`
        ${StyledCheckableInput} {
          margin-right: 8px;
        }

        ${StyledFieldHelp} {
          padding-left: 6px;
        }
      `}
    `}
  `}
`;

StyledCheckbox.defaultProps = {
  theme: baseTheme,
};

export default StyledCheckbox;
