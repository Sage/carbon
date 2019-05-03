import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledCheckableInput from '../checkable-input/checkable-input.style';
import StyledSwitchSlider from './switch-slider.style';

export default ({
  fieldHelpInline, labelInline, reverse, size, theme
}) => theme.name === THEMES.classic && css`
  ${StyledCheckableInput}, ${HiddenCheckableInputStyle} {
    border-radius: 24px;
    height: 28px;
    width: 55px;
  }

  ${StyledSwitchSlider} { transition: box-shadow .1s linear; }

  ${HiddenCheckableInputStyle}:not([disabled]) {
    &:focus + ${StyledSwitchSlider} {
      box-shadow: 0 0 6px 2px rgba(37, 91, 199, 0.6);
    }

    &:focus + ${StyledSwitchSlider},
    &:hover + ${StyledSwitchSlider} {
      outline: none;
    }
  }

  ${LabelStyle} .carbon-icon::before {
    content: '\\E943';
  }

  ${labelInline && `
    ${LabelStyle} {
      padding: 5px 0;
    }
  `}

  ${!fieldHelpInline && labelInline && reverse && `
    ${FieldHelpStyle} {
      margin-left: 66px;
    }
  `}

  ${size === 'large' && css`
    ${StyledCheckableInput}, ${HiddenCheckableInputStyle}, ${StyledSwitchSlider} {
      height: 28px;
      width: 55px;
    }

    ${fieldHelpInline && `
      ${FieldHelpStyle} {
        margin-top: 0;
        padding: 3px 0;
      }
    `}

    ${labelInline && `
      ${LabelStyle} {
        margin-top: 0;
        padding: 5px 0;
      }
    `}

    ${!fieldHelpInline && labelInline && reverse && `
      ${FieldHelpStyle} {
        margin-left: 66px;
      }
    `}
  `}
`;
