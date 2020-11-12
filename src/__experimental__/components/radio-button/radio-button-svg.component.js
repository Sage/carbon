import React from "react";
import StyledCheckableInputSvgWrapper from "../checkable-input/checkable-input-svg-wrapper.style";

const RadioButtonSvg = () => {
  return (
    <StyledCheckableInputSvgWrapper>
      <svg focusable="false" viewBox="0 0 15 15">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle
            className="radio-button-check"
            fill="#FFFFFF"
            cx="7.5"
            cy="7.5"
            r="5"
          />
        </g>
      </svg>
    </StyledCheckableInputSvgWrapper>
  );
};

export default React.memo(RadioButtonSvg, () => true);
