import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledSwitchSlider from './switch-slider.style';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';

import ClassicSwitchStyles from './switch-classic.style';

const StyledSwitch = styled.div`
  ${({
    fieldHelpInline, labelInline, labelWidth, reverse, size, theme
  }) => css`
    ${StyledCheckableInput}, ${HiddenCheckableInputStyle} {
      border: none;
      box-sizing: border-box;
      height: 24px;
      width: 60px;
    }

    margin-bottom: 24px;

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
      margin-top: 1px;

      label {
        margin-top: 2px;
      }

      ${StyledValidationIcon} {
        position: relative;
        display: inline-block;
      }

      ${labelWidth && css`
        margin-right: ${100 - labelWidth}%;
      `}
    }

    ${reverse && `
      ${LabelStyle} {
        margin-top: 8px;
      }
    `}

    ${fieldHelpInline && `
      ${FieldHelpStyle} {
        margin-right: 32px;
      }
    `}

    ${labelInline && css`
      ${LabelStyle} {
        margin: 0 32px 0 0;
        padding: 3px 0;
        width: auto;
      }

      ${FieldHelpStyle} {
        margin-top: 0;
      }

      ${reverse && css`
        ${LabelStyle} {
          margin-left: 10px;
        }

        ${!fieldHelpInline && `
          ${FieldHelpStyle} {
            margin-left: 70px;
          }
        `}
      `}

      ${fieldHelpInline && `
        ${LabelStyle} {
          margin-right: 10px;
        }

        ${FieldHelpStyle} {
          margin-top: 0;
          padding: 3px 0;
        }
      `}
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

      ${labelInline && css`
        ${LabelStyle} {
          margin-top: 1px;
          padding: 10px 0;
        }

        ${!fieldHelpInline && reverse && `
          ${FieldHelpStyle} {
            margin-left: 88px;
          }
        `}
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
  theme: PropTypes.object
};

StyledSwitch.defaultProps = {
  theme: baseTheme
};

export default StyledSwitch;
