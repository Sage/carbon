import styled, { css } from 'styled-components';
import CheckboxStyle from '../checkbox/checkbox.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';

const RadioButtonStyle = styled(CheckboxStyle)`
  ${({ checked }) => css`
    ${StyledCheckableInputSvgWrapper}, svg {
      border-radius: 50%;
      padding: 0 !important;
    }

    ${checked && css`
      .radio-button-check { fill: #003349; }
    `}
  `}
`;

const StyledRadioButtonGroup = styled.div``;

export { RadioButtonStyle, StyledRadioButtonGroup };
