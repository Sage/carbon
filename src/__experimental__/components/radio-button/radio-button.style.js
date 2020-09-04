import styled, { css } from 'styled-components';
import CheckboxStyle from '../checkbox/checkbox.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import { StyledLabelContainer } from '../label/label.style';
import ClassicRadioButtonStyles from './radio-button-classic.style';
import baseTheme from '../../../style/themes/base';

const RadioButtonStyle = styled(CheckboxStyle)`
  ${({
    disabled,
    fieldHelpInline,
    reverse,
    size,
    theme,
    inline
  }) => css`
    padding-top: 8px;
    margin-bottom: 12px;

    ${FieldHelpStyle} {
      margin-left: 32px;
      padding-left: 0;
    }

    ${StyledCheckableInput} {
      margin-right: 16px;
    }

    ${StyledCheckableInputSvgWrapper} {
      padding: 0;
    }

    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: 50%;
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
      margin-left: 0;

      ${reverse && css`
        padding-right: 0;
        margin-right: 8px;
      `}
    }

    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
      fill: ${theme.text.color};
    }

    ${disabled && css`
      circle {
        fill: ${theme.disabled.input};
      }

      ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle {
        fill: ${theme.disabled.border};
      }
    `}

    ${(fieldHelpInline || reverse) && `
      ${FieldHelpStyle} {
        margin-left: 0;
        margin-right: 6px;
      }

      ${StyledLabelContainer} {
        flex: 0 1 auto;
      }
    `}

    ${size === 'large' && css`
      ${StyledCheckableInput} {
        margin-right: 14px;
      }

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

      ${reverse && css`
        ${StyledCheckableInput} {
          margin-right: 0;
          margin-left: 16px;
        }

        ${!fieldHelpInline && `
          ${FieldHelpStyle} {
            padding: 0;
          }
        `}
      `}
    `}

    ${inline && `
      &:not(:first-of-type) {
        margin-left: 32px;
      }
    `}

    ${ClassicRadioButtonStyles}
  `}
`;

RadioButtonStyle.defaultProps = {
  theme: baseTheme
};

export default RadioButtonStyle;
