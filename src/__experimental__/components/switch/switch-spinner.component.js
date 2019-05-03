import React from 'react';
import PropTypes from 'prop-types';
import StyledSwitchSpinner from './switch-spinner.style';
import SwitchSpinnerDot from './switch-spinner-dot.style';

const SwitchSpinner = ({ checked }) => {
  return (
    <StyledSwitchSpinner>
      <SwitchSpinnerDot checked={ checked } />
      <SwitchSpinnerDot checked={ checked } />
      <SwitchSpinnerDot checked={ checked } />
    </StyledSwitchSpinner>
  );
};

SwitchSpinner.propTypes = {
  checked: PropTypes.bool
};

export default SwitchSpinner;
