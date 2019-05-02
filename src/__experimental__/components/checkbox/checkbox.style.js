import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import StyledCheckableInput from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../help/help.style';
import checkBoxClassicStyle from './checkbox-classic.style';

const StyledCheckbox = styled.div`
  ${({
    checked, disabled, error, fieldHelpInline, inputWidth, labelAlign, labelWidth, reverse, size, theme
  }) => css`
    padding-top: 8px;

    ${StyledCheckableInput} {
      padding-top: 1px;
    }

    svg {
      background-color: ${theme.colors.white};
      border: solid 1px ${theme.colors.border};
    }

    ${HiddenCheckableInputStyle},
    svg {
      height: 16px;
      position: absolute;
      padding: 1px;
    }

    ${StyledCheckableInput},
    ${HiddenCheckableInputStyle},
    svg {
      box-sizing: border-box;
      width: 16px;
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus + svg,
      &:hover + svg {
        outline: solid 3px ${theme.colors.focus};
      }
    }

    ${LabelStyle} {
      padding: 0 6px;
      text-align: ${labelAlign};
      width: auto;

      & ${StyledHelp} {
        color: ${theme.help.color};
        vertical-align: bottom;

        &:hover, &:focus {
          color: ${theme.text.color};
        }
      }
    }

    label:hover + ${StyledCheckableInput} ${HiddenCheckableInputStyle}:not([disabled]) + svg {
      outline: solid 3px ${theme.colors.focus};
    }

    ${FieldHelpStyle} {
      margin-left: 16px;
      margin-top: 0;
      padding-left: 6px;
    }

    ${size === 'large' && css`
      ${StyledCheckableInput},
      ${HiddenCheckableInputStyle},
      ${HiddenCheckableInputStyle} + svg {
        height: 24px;
        padding: 2px;
        width: 24px;
      }

      ${FieldHelpStyle} {
        margin-left: 24px;
      }

      ${FieldHelpStyle},
      ${LabelStyle} {
        padding-left: 8px;
      }

      ${fieldHelpInline && `${FieldHelpStyle},`}
      ${LabelStyle} {
        padding-top: 4px;
        padding-bottom: 4px;
      }
    `}

    ${checked && `
      svg path {
        fill: ${theme.colors.primary};
      }
    `}

    ${disabled && `
      ${LabelStyle} {
        &, & ${StyledHelp} {
          color: ${theme.disabled.disabled};
        }
      }

      svg {
        background-color: ${theme.disabled.input};
        border: 1px solid ${theme.disabled.border};
      }

      svg path { fill: ${(checked ? theme.disabled.border : theme.disabled.input)}; }

      ${HiddenCheckableInputStyle},
      svg,
      ${LabelStyle} {
        &:hover, &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${error && `
      svg {
        border: 1px solid ${theme.colors.error};
      }
    `}

    ${fieldHelpInline && `
      ${FieldHelpStyle} {
        display: inline;
        margin: 0;
        padding-left: 0;
        width: auto;
      }
    `}

    ${inputWidth !== 0 && `
      ${StyledCheckableInput} {
        width: ${inputWidth}%;
      }

      ${FieldHelpStyle} {
        ${reverse ? 'margin-right' : 'margin-left'}: ${inputWidth}%;
      }
    `}

    ${labelWidth !== 0 && `
      ${LabelStyle} {
        width: ${labelWidth}%;
      }
    `}

    ${reverse && `
      ${FieldHelpStyle} {
        margin-left: 0;
      }
    `}

    ${reverse && fieldHelpInline && `
      ${StyledCheckableInput} { padding-left: 6px; }
    `}

    ${checkBoxClassicStyle}
  `}
`;

StyledCheckbox.defaultProps = {
  labelAlign: 'left',
  theme: baseTheme
};

StyledCheckbox.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fieldHelpInline: PropTypes.bool,
  inputWidth: PropTypes.number,
  labeLAlign: PropTypes.string,
  labelWidth: PropTypes.number,
  size: PropTypes.string
};

export default StyledCheckbox;
