import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import FieldHelpStyle from '../field-help/field-help.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../help/help.style';
import { THEMES } from '../../../style/themes';

const StyledCheckbox = styled.div`
  padding-top: 8px;

  input[type=checkbox] {
    cursor: pointer;
    opacity: 0;
    margin: 0;
    z-index: 999;
  }

  svg {
    background-color: ${baseTheme.colors.white};
    border: solid 1px ${baseTheme.colors.border};
  }

  input[type=checkbox],
  svg {
    position: absolute;
  }

  .carbon-checkbox__input,
  input[type=checkbox],
  svg {
    box-sizing: border-box;
    display: inline-block;
    height: 16px;
    padding: 1px;
    vertical-align: middle;
    width: 16px;
  }

  input[type=checkbox]:not([disabled]) {
    &:focus + svg,
    &:hover + svg {
      outline: solid 3px ${baseTheme.colors.focus};
    }
  }

  ${LabelStyle} {
    padding: 0 6px;
    text-align: ${({ labelAlign }) => labelAlign || 'left'};
    width: auto;

    & ${StyledHelp} {
      color: ${baseTheme.help.color};
      vertical-align: bottom;

      &:hover, &:focus {
        color: ${baseTheme.text.color};
      }
    }
  }

  label:hover + .carbon-checkbox__input input[type=checkbox]:not([disabled]) + svg {
    outline: solid 3px ${baseTheme.colors.focus};
  }

  ${FieldHelpStyle} {
    margin-left: 16px;
    margin-top: 0;
    padding-left: 6px;
  }

  ${({ size, fieldHelpInline, theme }) => theme.name !== THEMES.classic && size === 'large' && css`
    .carbon-checkbox__input,
    input[type=checkbox],
    input[type=checkbox] + svg {
      height: 24px;
      padding: 2px;
      width: 24px;
    }

    ${FieldHelpStyle} {
      margin-left: 24px;
    }

    ${fieldHelpInline && `${FieldHelpStyle},`}
    ${LabelStyle} {
      padding-top: 4px;
      padding-bottom: 4px;
    }
  `}

  ${({ checked }) => checked && css`
    svg path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  `}

  ${({ disabled }) => disabled && css`
    ${LabelStyle} {
      &, & ${StyledHelp} {
        color: ${baseTheme.disabled.disabled};
      }
    }

    svg {
      background-color: ${baseTheme.disabled.input};
      border: 1px solid ${baseTheme.disabled.border};
    }

    svg .checkbox-check { fill: ${({ checked }) => (checked ? baseTheme.disabled.border : baseTheme.disabled.input)}; }

    input[type=checkbox],
    svg,
    ${LabelStyle} {
      &:hover, &:focus {
        outline: none;
        cursor: not-allowed;
      }
    }
  `}

  ${({ error }) => error && css`
    svg {
      border: 1px solid ${baseTheme.colors.error};
    }
  `}

  ${({ fieldHelpInline }) => fieldHelpInline && css`
    ${FieldHelpStyle} {
      display: inline;
      margin: 0;
      width: auto;
    }
  `}

  ${({ inputWidth, reverse }) => inputWidth !== 0 && css`
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

  ${({ reverse }) => reverse && css`
    ${FieldHelpStyle} {
      margin-left: 0;
    }
  `}

  ${({ reverse, fieldHelpInline }) => reverse && fieldHelpInline && css`
    .carbon-checkbox__input { padding-left: 6px; }
  `}

  ${({ theme }) => theme.name === THEMES.classic && css`
    .carbon-checkbox__input,
    input[type=checkbox],
    input[type=checkbox] + svg {
      height: 15px;
      padding: 1px;
      width: 15px;
    }

    input[type=checkbox]:not([disabled]) {
      &:focus + svg,
      &:hover + svg {
        border: 1px solid #1963f6;
        outline: none;
      }
    }

    label:hover + .carbon-checkbox__input input[type=checkbox]:not([disabled]) + svg {
      border: 1px solid #1963f6;
      outline: none;
    }
  `}

  ${({ theme, checked }) => theme.name === THEMES.classic && checked && css`
    svg path { fill: rgba(0, 0, 0, 0.85); }
  `}

  ${({ theme, fieldHelpInline, reverse }) => theme.name === THEMES.classic && fieldHelpInline && reverse && css`
    .carbon-checkbox__input {
      padding-left: 6px;
    }
  `}
`;

StyledCheckbox.defaultProps = {
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
