import React from "react";
import StyledCheckableInputSvgWrapper from "../../../__internal__/checkable-input/checkable-input-svg-wrapper.style";

type CheckboxSvgProps = {
  indeterminate?: boolean;
};

const CheckboxSvg = ({ indeterminate }: CheckboxSvgProps) => (
  <StyledCheckableInputSvgWrapper data-role="checkable-wrapper">
    {indeterminate ? (
      <svg
        data-role="indeterminate-svg"
        focusable="false"
        viewBox="0 0 20 20"
        fill="none"
      >
        <rect y="8" width="20" height="4" rx="2" fill="transparent" />
      </svg>
    ) : (
      <svg focusable="false" viewBox="0 0 16 12" fill="none">
        <path
          d="M15.3254 0.231177C15.0768 0.0725131 14.7858 -0.0078498 14.4904 0.000604729C14.1106 0.0116071 13.7498 0.168628 13.4841 0.43853L5.39406 8.47955L2.522 5.62489C2.38757 5.48677 2.22699 5.37639 2.04948 5.30014C1.87029 5.22317 1.67746 5.1825 1.48226 5.18053C1.28706 5.17856 1.09344 5.21532 0.912713 5.28865C0.731991 5.36199 0.567806 5.47043 0.429775 5.60762C0.291743 5.74482 0.182642 5.90801 0.108858 6.08764C0.035074 6.26727 -0.00190855 6.45972 7.58261e-05 6.65373C0.0020602 6.84775 0.0429724 7.03941 0.120415 7.21751C0.197135 7.39395 0.308179 7.55356 0.447147 7.68717L4.35671 11.573C4.63187 11.8464 5.005 12 5.39406 12C5.78312 12 6.15633 11.8464 6.43149 11.573L15.559 2.50077C15.7693 2.29623 15.9128 2.03357 15.971 1.74686C16.0294 1.45899 15.9991 1.16029 15.8839 0.889848C15.7687 0.619408 15.574 0.389838 15.3254 0.231177Z"
          fill="transparent"
        />
      </svg>
    )}
  </StyledCheckableInputSvgWrapper>
);

export default CheckboxSvg;
