import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../help/help.style';

export default ({
  checked, disabled, fieldHelpInline, reverse, theme
}) => theme.name === THEMES.classic && css`
  ${StyledCheckableInput} {
    padding: 1px 0 0 0;
  }

  ${HiddenCheckableInputStyle},
  svg {
    padding: 1px;
  }

  ${StyledCheckableInput},
  ${HiddenCheckableInputStyle},
  ${HiddenCheckableInputStyle} + svg {
    height: 15px;
    width: 15px;
  }

  ${FieldHelpStyle} {
    margin-left: 15px;
  }

  ${LabelStyle} .carbon-icon::before {
    content: '\\E943';
  }

  ${FieldHelpStyle},
  ${LabelStyle} {
    padding-left: 6px;
  }

  ${fieldHelpInline && `${FieldHelpStyle},`}
  ${LabelStyle} {
    padding-top: 0;
    padding-bottom: 0;
  }

  ${HiddenCheckableInputStyle}:not([disabled]) {
    &:focus + svg,
    &:hover + svg {
      border: 1px solid #1963f6;
      outline: none;
    }
  }

  ${checked && `
    svg path { fill: rgba(0, 0, 0, 0.85); }
  `}

  ${disabled && css`
    ${LabelStyle} {
      &, & ${StyledHelp} {
        color: ${theme.disabled.text};
      }
    }

    svg {
      background-color: ${theme.disabled.disabled};
      border: 1px solid ${theme.disabled.border};
    }

    svg path { fill: ${checked ? theme.disabled.border : theme.disabled.disabled}; }
  `}

  ${(fieldHelpInline || reverse) && `
    ${FieldHelpStyle} {
      margin-left: 0;
    }
  `}

  ${fieldHelpInline && reverse && `
    ${StyledCheckableInput} {
      padding-left: 6px;
    }
  `}
`;
