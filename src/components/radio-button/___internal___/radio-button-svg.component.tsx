import React from "react";
import StyledCheckableInputSvgWrapper from "../../../__internal__/checkable-input/checkable-input-svg-wrapper.style";

const RadioButtonSvg = () => {
  return (
    <StyledCheckableInputSvgWrapper>
      <svg data-role="radio-svg" focusable="false" viewBox="0 0 15 15">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle
            className="radio-button-check"
            fill="#FFFFFF"
            cx="7.5"
            cy="7.5"
            r="4"
          />
        </g>
      </svg>
    </StyledCheckableInputSvgWrapper>
  );
};

export default React.memo(RadioButtonSvg, () => true);
