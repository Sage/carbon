import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from './input-sizes.style';
import inputClassicStyling from './input-presentation-classic.style';
import StyledInput from './input.style';
import StyledInlineInputs from '../../../components/inline-inputs/inline-inputs.style';

const InputPresentationStyle = styled.div`
  align-items: stretch;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 ${({ inputWidth }) => inputWidth}%;
  margin: 0;
  min-height: ${({ size }) => sizes[size].height};
  padding-left: ${({ size }) => sizes[size].horizontalPadding};
  padding-right: ${({ size }) => sizes[size].horizontalPadding};

  ${StyledInput} {
    /* this is required for an IE11 fix: */
    height: calc(${({ size }) => sizes[size].height} - 4px);
  }

  ${({ disabled, theme }) => disabled && css`
    background: ${theme.disabled.input};
    border-color: ${theme.disabled.border};
    cursor: not-allowed;
  `}

  ${({ hasFocus, theme }) => hasFocus && css`
    && {
      outline: 3px solid ${theme.colors.focus};
      z-index: 2;
    }

    ${StyledInlineInputs} && {
      position: relative;
    }
  `}

  ${stylingForValidations}

  ${({ readOnly }) => readOnly && css`
    background: transparent !important;
    box-shadow: none;
  `}

  ${inputClassicStyling}

  input::-ms-clear {
    display: none;
  }
  input::-webkit-contacts-auto-fill-button {
    display: none!important;
  }
`;

function stylingForValidations({
  theme,
  hasError,
  hasWarning,
  hasInfo
}) {
  let validationColor;

  if (hasError) {
    validationColor = theme.colors.error;
  } else if (hasWarning) {
    validationColor = theme.colors.warning;
  } else if (hasInfo) {
    validationColor = theme.colors.info;
  } else {
    return '';
  }

  return `
    border-color: ${validationColor} !important;
    box-shadow: inset 1px 1px 0 ${validationColor},
                inset -1px -1px 0 ${validationColor};
  `;
}

InputPresentationStyle.safeProps = [
  'disabled',
  'hasFocus',
  'inputWidth',
  'readOnly',
  'size',
  'hasError',
  'hasWarning',
  'hasInfo'
];

InputPresentationStyle.defaultProps = {
  inputWidth: 100,
  size: 'medium',
  theme: baseTheme
};

InputPresentationStyle.propTypes = {
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  inputWidth: PropTypes.number,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  hasInfo: PropTypes.bool
};

export default InputPresentationStyle;
