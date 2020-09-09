import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import FieldHelpStyle from '../field-help/field-help.style';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import { StyledLabelContainer } from '../label/label.style';
import { StyledCheckableInput } from '../checkable-input/checkable-input.style';
import StyledSwitchSlider from './switch-slider.style';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';
import { FieldLineStyle } from '../form-field/form-field.style';

const StyledSwitch = styled.div`
  ${({
    fieldHelpInline, labelInline, labelWidth, reverse, size, theme
  }) => css`
    ${FieldLineStyle} {
      display: flex;
      flex-flow: row wrap;
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

    ${StyledLabelContainer} {
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
        margin: 0;
      }
    `}

    ${reverse && css`
      ${!labelInline && css`
        ${StyledLabelContainer} {
          margin-top: 8px;
        }

        ${fieldHelpInline && css`
          ${FieldHelpStyle} {
            margin-top: 8px;
          }
        `}
      `}
    `}

    ${labelInline && css`
      ${StyledCheckableInput} {
        flex-basis: auto;
      }

      ${FieldLineStyle} {
        display: flex;
      }

      ${StyledLabelContainer} {
        margin-bottom: 0;
        padding-right: 0;
        margin-right: 32px;
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

        ${StyledLabelContainer} {
          margin-left: 10px;
        }

        ${!fieldHelpInline && `
          ${FieldHelpStyle} {
            margin-left: 70px;
          }
        `}
      `}

      ${fieldHelpInline && css`
        ${!reverse && `
          ${StyledCheckableInput} {
            margin-left: 10px;
          }
        `}

        ${StyledLabelContainer} {
          margin-right: 10px;
        }

        ${FieldHelpStyle} {
          margin-left: 0;
          align-self: center;
        }
      `}
    `}

    ${size === 'large' && css`
      ${StyledCheckableInput}, ${HiddenCheckableInputStyle}, ${StyledSwitchSlider} {
        height: 40px;
        width: 78px;
      }

      ${labelInline && !fieldHelpInline && reverse && css`
        ${FieldHelpStyle} {
          margin-left: 88px;
        }
      `}
    `}
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
