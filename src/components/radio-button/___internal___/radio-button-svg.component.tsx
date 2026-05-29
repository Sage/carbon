import React from "react";

const RadioButtonSvg = () => {
  return (
    <div data-role="checkable-input-svg-wrapper">
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
    </div>
  );
};

export default React.memo(RadioButtonSvg, () => true);
