import React from 'react';
import { StyledSwitchSpinner, SwitchSpinnerDot } from './switch-spinner.style';

const SwitchSpinner = (props) => {
  return (
    <StyledSwitchSpinner { ...props }>
      <SwitchSpinnerDot />
      <SwitchSpinnerDot />
      <SwitchSpinnerDot />
    </StyledSwitchSpinner>
  );
};

export default SwitchSpinner;
