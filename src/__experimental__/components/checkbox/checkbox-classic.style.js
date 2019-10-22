import { css } from 'styled-components';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../../../components/help/help.style';
import StyledIcon from '../../../components/icon/icon.style';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({
  checked, disabled, fieldHelpInline, reverse, theme
}) => isClassic(theme) && css`
  ${StyledCheckableInput} {
    padding: 1px 0 0 0;
  }

  ${HiddenCheckableInputStyle},
  svg {
    padding: 1px;
  }

  ${StyledCheckableInput},
  ${HiddenCheckableInputStyle},
  ${StyledCheckableInputSvgWrapper},
  svg {
    height: 15px;
    width: 15px;
  }

  ${FieldHelpStyle} {
    margin-left: 15px;
  }

  ${LabelStyle} ${StyledHelp} {
    &, &:hover, &:focus {
      color: #8099a4;
    }
  }

  ${LabelStyle} ${StyledIcon}::before {
    content: '\\E943';
  }

  ${LabelStyle} {
    padding-left: 6px;
  }

  ${fieldHelpInline && `${FieldHelpStyle},`}
  ${LabelStyle} {
    padding-top: 0;
    padding-bottom: 0;
  }

  ${HiddenCheckableInputStyle}:not([disabled]) {
    &:focus + ${StyledCheckableInputSvgWrapper},
    &:hover + ${StyledCheckableInputSvgWrapper} {
      box-shadow: none;
    }
  }

  ${HiddenCheckableInputStyle}:not([disabled]) {
    &:focus + ${StyledCheckableInputSvgWrapper} > svg,
    &:hover + ${StyledCheckableInputSvgWrapper} > svg {
      border: 1px solid #1963f6;
      outline: none;
    }
  }

  ${checked && `
    svg path { fill: rgba(0, 0, 0, 0.85); }
  `}

  ${disabled && css`
    ${LabelStyle} {
      color: ${theme.disabled.text};
    }

    svg {
      background-color: #e6ebed;
      border-color: #bfccd2;
    }

    svg path { fill: #${checked ? '8099a4' : 'e6ebed'}; }
  `}

  ${(fieldHelpInline || reverse) && `
    ${FieldHelpStyle} {
      margin-left: 0;
    }
  `}
`;
