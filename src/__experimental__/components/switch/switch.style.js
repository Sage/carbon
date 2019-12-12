import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import LabelStyle from '../label/label.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledSwitchSlider from './switch-slider.style';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';
import { FieldLineStyle } from '../form-field/form-field.style';
import ClassicSwitchStyles from './switch-classic.style';

const StyledSwitch = styled.div`
  ${({
    fieldHelpInline, labelInline, labelWidth, reverse, size, theme
  }) => css`
    ${FieldLineStyle} {
      display: block;
    }

    ${StyledCheckableInput}, ${HiddenCheckableInputStyle} {
      border: none;
      box-sizing: border-box;
      height: 24px;
      width: 60px;
      flex-basis: 100%;
      margin-left: 0;
    }

    margin-bottom: 24px;

    ${HiddenCheckableInputStyle}:not([disabled]) {
      &:focus + ${StyledSwitchSlider},
      &:hover + ${StyledSwitchSlider} {
        outline: solid 3px ${theme.colors.focus};
      }
    }

    ${FieldHelpStyle} {
      margin-left: 0;
    }

    ${LabelStyle} {
      padding: 0;
      margin-bottom: 8px;

      ${StyledValidationIcon} {
        position: relative;
        display: inline-block;
      }

      ${labelWidth && css`
        margin-right: ${100 - labelWidth}%;
      `}
    }

    ${fieldHelpInline && css`
      ${FieldHelpStyle} {
        margin-bottom: 10px;
      }
    `}

    ${reverse && css`
      ${!labelInline && css`
        ${LabelStyle} {
          margin-top: 8px;
        }
      `}
    `}

    ${labelInline && css`
      ${StyledCheckableInput} {
        flex-basis: auto;
      }

      ${FieldLineStyle} {
        display: flex;
      }
  
      ${LabelStyle} {
        margin-bottom: 0;
        margin-right: 32px;
        padding-top: 4px;
        width: auto;
      }

      ${FieldHelpStyle} {
        margin-bottom: 0;
        margin-top: 0;
      }

      ${reverse && css`
        ${StyledCheckableInput} {
          margin-left: 0;
          margin-top: 0;
        }

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
        ${StyledCheckableInput} {
          margin-left: 10px;
        }

        ${LabelStyle} {
          margin-right: 10px;
        }

        ${FieldHelpStyle} {
          margin-left: 0;
          margin-top: -1px;
          align-self: center;
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
