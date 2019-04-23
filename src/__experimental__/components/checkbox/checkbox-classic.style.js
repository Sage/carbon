import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import HiddenCheckboxStyle from './hidden-checkbox.style';
import LabelStyle from '../label/label.style';
import StyledHelp from '../help/help.style';

export default ({ disabled, checked, theme }) => theme.name === THEMES.classic && css`
  .carbon-checkbox__input,
  ${HiddenCheckboxStyle},
  ${HiddenCheckboxStyle} + svg {
    height: 15px;
    width: 15px;
  }

  ${HiddenCheckboxStyle}:not([disabled]) {
    &:focus + svg,
    &:hover + svg {
      border: 1px solid #1963f6;
      outline: none;
    }
  }

  label:hover + .carbon-checkbox__input ${HiddenCheckboxStyle}:not([disabled]) + svg {
    border: 1px solid #1963f6;
    outline: none;
  }

  ${() => disabled && css`
    ${LabelStyle} {
      &, & ${StyledHelp} {
        color: ${theme.disabled.text};
      }
    }

    svg {
      background-color: ${theme.disabled.disabled};
      border: 1px solid ${theme.disabled.border};
    }

    svg .checkbox-check { fill: ${() => (checked ? theme.disabled.border : theme.disabled.disabled)}; }
  `}

  ${() => checked && css`
    svg path { fill: rgba(0, 0, 0, 0.85); }
  `}

  ${({ fieldHelpInline, reverse }) => fieldHelpInline && reverse && css`
    .carbon-checkbox__input {
      padding-left: 6px;
    }
  `}
`;
