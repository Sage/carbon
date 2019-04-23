import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckboxStyle from './hidden-checkbox.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../help/help.style';
import checkBoxClassicStyle from './checkbox-classic.style';
import { THEMES } from '../../../style/themes';

const StyledCheckbox = styled.div`
  ${({
    checked, disabled, error, fieldHelpInline, inputWidth, reverse, size, theme
  }) => css`
    padding-top: 8px;

    .carbon-checkbox__input {
      padding-top: 1px;
    }

    svg {
      background-color: ${theme.colors.white};
      border: solid 1px ${theme.colors.border};
    }

    ${HiddenCheckboxStyle},
    svg {
      height: 16px;
      position: absolute;
      padding: 1px;
    }

    .carbon-checkbox__input,
    ${HiddenCheckboxStyle},
    svg {
      box-sizing: border-box;
      width: 16px;
    }

    ${HiddenCheckboxStyle}:not([disabled]) {
      &:focus + svg,
      &:hover + svg {
        outline: solid 3px ${theme.colors.focus};
      }
    }

    ${LabelStyle} {
      padding: 0 6px;
      text-align: ${({ labelAlign }) => labelAlign};
      width: auto;

      & ${StyledHelp} {
        color: ${theme.help.color};
        vertical-align: bottom;

        &:hover, &:focus {
          color: ${theme.text.color};
        }
      }
    }

    label:hover + .carbon-checkbox__input ${HiddenCheckboxStyle}:not([disabled]) + svg {
      outline: solid 3px ${theme.colors.focus};
    }

    ${FieldHelpStyle} {
      margin-left: 16px;
      margin-top: 0;
      padding-left: 6px;
    }

    ${() => theme.name !== THEMES.classic && size === 'large' && css`
      .carbon-checkbox__input,
      ${HiddenCheckboxStyle},
      ${HiddenCheckboxStyle} + svg {
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

    ${() => checked && css`
      svg path {
        fill: ${theme.colors.primary};
      }
    `}

    ${() => disabled && css`
      ${LabelStyle} {
        &, & ${StyledHelp} {
          color: ${theme.disabled.disabled};
        }
      }

      svg {
        background-color: ${theme.disabled.input};
        border: 1px solid ${theme.disabled.border};
      }

      svg .checkbox-check { fill: ${() => (checked ? theme.disabled.border : theme.disabled.input)}; }

      ${HiddenCheckboxStyle},
      svg,
      ${LabelStyle} {
        &:hover, &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${() => error && css`
      svg {
        border: 1px solid ${theme.colors.error};
      }
    `}

    ${() => fieldHelpInline && css`
      ${FieldHelpStyle} {
        display: inline;
        margin: 0;
        width: auto;
      }
    `}

    ${() => inputWidth !== 0 && css`
      .carbon-checkbox__input {
        width: ${inputWidth}%;
      }

      ${FieldHelpStyle} {
        ${reverse ? 'margin-right' : 'margin-left'}: ${inputWidth}%;
      }
    `}

    ${({ labelWidth }) => labelWidth !== 0 && css`
      ${LabelStyle} {
        width: ${labelWidth}%;
      }
    `}

    ${() => reverse && css`
      ${FieldHelpStyle} {
        margin-left: 0;
      }
    `}

    ${() => reverse && fieldHelpInline && css`
      .carbon-checkbox__input { padding-left: 6px; }
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
