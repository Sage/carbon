import React from 'react';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';

const RadioButtonSvg = () => {
  return (
    <StyledCheckableInputSvgWrapper>
      <svg
        width='15' height='15'
        viewBox='0 0 15 15'
      >
        <g
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g transform='translate(-69.000000, -293.000000)'>
            <g transform='translate(69.000000, 268.000000)'>
              <g transform='translate(0.000000, 25.000000)'>
                <circle
                  className='radio-button-check'
                  fill='#FFFFFF'
                  cx='7.5'
                  cy='7.5'
                  r='3.5'
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledCheckableInputSvgWrapper>
  );
};

export default RadioButtonSvg;
