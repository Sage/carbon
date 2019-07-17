import styled, { css } from 'styled-components';
import CheckboxStyle from '../checkbox/checkbox.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import LabelStyle from '../label/label.style';
import ClassicRadioButtonStyles from './radio-button-classic.style';

const RadioButtonStyle = styled(CheckboxStyle)`
  ${({
    checked,
    disabled,
    fieldHelpInline,
    reverse,
    size,
    theme
  }) => css`
    margin-bottom: 12px;

    ${FieldHelpStyle} {
      margin-left: 32px;
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
      r: ${size === 'large' ? 3.75 : 5};
    }

    ${checked && css`
      circle { fill: ${theme.colors.primary}; }
    `}

    ${disabled && css`
      circle { fill: ${(checked ? theme.disabled.border : theme.disabled.input)}; }
    `}

    ${(fieldHelpInline || reverse) && `
      ${FieldHelpStyle} {
        margin-left: 0;
        margin-right: 6px;
      }
    `}

    ${size === 'large' && css`
      ${LabelStyle} {
        padding: 4px 0;
      }

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

      ${reverse && css`
        ${StyledCheckableInput} {
          margin-left: 6px;
        }

        ${!fieldHelpInline && `
          ${FieldHelpStyle} {
            padding: 0;
          }
        `}
      `}
    `}

    ${ClassicRadioButtonStyles}
  `}
`;

const StyledRadioButtonGroup = styled.div`
  & > ${LabelStyle} {
    cursor: default ;
    margin-bottom: 16px;
    padding: 0;
  }
`;

export { RadioButtonStyle, StyledRadioButtonGroup };
