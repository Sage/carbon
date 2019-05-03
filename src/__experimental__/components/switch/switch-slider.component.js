import React from 'react';
import PropTypes from 'prop-types';
import StyledSwitchSlider from './switch-slider.style';
import SwitchSliderPanel from './switch-slider-panel.style';
import SwitchSpinner from './switch-spinner.component';

function textOrSpinner(text, props) {
  if (props.loading) { return <SwitchSpinner { ...props } />; }
  return text;
}

const SwitchSlider = (props) => {
  return (
    <StyledSwitchSlider { ...props }>
      <SwitchSliderPanel type='on'>
        {textOrSpinner('ON', props)}
      </SwitchSliderPanel>
      <SwitchSliderPanel type='off'>
        {textOrSpinner('OFF', props)}
      </SwitchSliderPanel>
    </StyledSwitchSlider>
  );
};

SwitchSlider.propTypes = {
  checked: PropTypes.bool,
  loading: PropTypes.bool
};

export default SwitchSlider;
