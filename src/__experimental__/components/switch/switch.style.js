import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";
import FieldHelpStyle from "../field-help/field-help.style";
import HiddenCheckableInputStyle from "../checkable-input/hidden-checkable-input.style";
import { StyledLabelContainer } from "../label/label.style";
import { StyledCheckableInput } from "../checkable-input/checkable-input.style";
import StyledSwitchSlider from "./switch-slider.style";
import StyledValidationIcon from "../../../components/validations/validation-icon.style";
import { FieldLineStyle } from "../form-field/form-field.style";

const StyledSwitch = styled.div`
  ${({
    fieldHelpInline,
    labelInline,
    labelSpacing,
    reverse,
    size,
    theme,
  }) => css`
    ${FieldLineStyle} {
      display: flex;
      flex-flow: row wrap;
    }

    ${StyledCheckableInput}, ${HiddenCheckableInputStyle} {
      border: none;
      box-sizing: border-box;
      height: 24px;
      width: 60px;
      flex-basis: 100%;
      margin-left: 0;
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus + ${StyledSwitchSlider}, &:hover + ${StyledSwitchSlider} {
        outline: solid 3px ${theme.colors.focus};
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
        `
          ${FieldHelpStyle} {
            margin-left: 60px;
            padding-left: ${labelSpacing * theme.spacing}px;
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
        height: 40px;
        width: 78px;
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
        `
          ${FieldHelpStyle} {
            margin-left: 78px;
            padding-left: ${labelSpacing * theme.spacing}px;
          }
        `}
      `}
    `}
  `}
`;

StyledSwitch.propTypes = {
  disabled: PropTypes.bool,
  fieldHelpInline: PropTypes.bool,
  labelInline: PropTypes.bool,
  reverse: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object,
};

StyledSwitch.defaultProps = {
  theme: baseTheme,
};

export default StyledSwitch;
