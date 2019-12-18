
import styled, { css } from 'styled-components';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import Fieldset from '../fieldset';
import { LegendContainerStyle } from '../fieldset/fieldset.style';
import baseTheme from '../../../style/themes/base';

const RadioButtonFieldsetStyle = styled(Fieldset)`
${({
    theme,
    disabled,
    hasError,
    hasWarning,
    hasInfo
  }) => css`
    ${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} svg {
      ${!disabled && css`
        ${hasInfo && `border-color: ${theme.colors.info};`}
        ${hasWarning && `border-color: ${theme.colors.warning};`}
        ${hasError && `border-color: ${theme.colors.error};`}
      `}
    }
  `}

  ${LegendContainerStyle} {
    margin-bottom: 16px;
    height: 26px;

    legend {
      font-size: 14px;
      margin-left: -2px;
    }
  }
`;

RadioButtonFieldsetStyle.defaultProps = {
  theme: baseTheme
};

export default RadioButtonFieldsetStyle;
