import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import StyledCheckableInput from '../checkable-input/checkable-input.style';
import StyledSwitchSlider from './switch-slider.style';
import StyledHelp from '../help/help.style';

import ClassicSwitchStyles from './switch-classic.style';

const StyledSwitch = styled.div`
  ${({
    disabled, fieldHelpInline, labelInline, reverse, size, theme
  }) => css`
    ${StyledCheckableInput}, ${HiddenCheckableInputStyle} {
      border: none;
      box-sizing: border-box;
      height: 24px;
      width: 60px;
    }

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus + ${StyledSwitchSlider},
      &:hover + ${StyledSwitchSlider} {
        outline: solid 3px ${theme.colors.focus};
      }
    }

    ${FieldHelpStyle} {
      margin-left: 0px;
      margin-top: 5px;
    }

    ${LabelStyle} {
      padding: 0;
      margin-bottom: 8px;
      text-align: ${({ labelAlign }) => labelAlign};

      & ${StyledHelp} {
        color: ${theme.help.color};
        vertical-align: bottom;

        &:hover, &:focus {
          color: ${theme.text.color};
        }
      }
    }

    ${disabled && `
      ${LabelStyle} {
        &, & ${StyledHelp} {
          color: ${theme.disabled.disabled};
        }
      }

      ${HiddenCheckableInputStyle},
      ${LabelStyle} {
        &:hover, &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}

    ${reverse && `
      ${LabelStyle} {
        margin-top: 8px;
      }
    `}

    ${fieldHelpInline && `
      ${FieldHelpStyle} {
        display: inline;
        margin-right: 32px;
        padding-left: 0;
        width: auto;
      }
    `}

    ${labelInline && `
      ${LabelStyle} {
        margin: 0 32px 0 0;
        padding: 3px 0;
        width: auto;
      }

      ${FieldHelpStyle} {
        margin-top: 0;
      }
    `}

    ${labelInline && reverse && css`
      ${LabelStyle} {
        margin-left: 10px;
      }

      ${!fieldHelpInline && `
        ${FieldHelpStyle} {
          margin-left: 70px;
        }
      `}
    `}

    ${labelInline && fieldHelpInline && `
      ${LabelStyle} {
        margin-right: 10px;
      }

      ${FieldHelpStyle} {
        margin-top: 0;
        padding: 3px 0;
      }
    `}

    ${size === 'large' && css`
      ${StyledCheckableInput}, ${HiddenCheckableInputStyle}, ${StyledSwitchSlider} {
        height: 40px;
        width: 78px;
      }

      ${fieldHelpInline && `
        ${FieldHelpStyle} {
          margin-top: 0;
          padding: 10px 0;
        }
      `}

      ${labelInline && `
        ${LabelStyle} {
          margin-top: 1px;
          padding: 10px 0;
        }
      `}

      ${!fieldHelpInline && labelInline && reverse && `
        ${FieldHelpStyle} {
          margin-left: 88px;
        }
      `}
    `}

    ${ClassicSwitchStyles}
  `}
`;

StyledSwitch.propTypes = {
  disabled: PropTypes.bool,
  fieldHelpInline: PropTypes.bool,
  labelInline: PropTypes.bool,
  reverse: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.node
};

StyledSwitch.defaultProps = {
  theme: baseTheme
};

export default StyledSwitch;
