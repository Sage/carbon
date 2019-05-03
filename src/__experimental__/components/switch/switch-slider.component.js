import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { THEMES } from '../../../style/themes';
import Icon from '../../../components/icon';
import StyledSwitchSlider from './switch-slider.style';
import SwitchSliderPanel from './switch-slider-panel.style';
import SwitchSpinner from './switch-spinner.component';

function contentOrSpinner(content, props) {
  if (props.loading) { return <SwitchSpinner { ...props } />; }
  return content;
}

const SwitchSlider = (props) => {
  const contentForOn = () => {
    if (props.theme.name === THEMES.classic) return <Icon type='tick' />;
    return 'ON';
  };

  const contentForOff = () => {
    if (props.theme.name === THEMES.classic) return <Icon type='cross' />;
    return 'OFF';
  };

  return (
    <StyledSwitchSlider { ...props }>
      <SwitchSliderPanel type='on' { ...props }>
        {contentOrSpinner(contentForOn(), props)}
      </SwitchSliderPanel>
      <SwitchSliderPanel type='off' { ...props }>
        {contentOrSpinner(contentForOff(), props)}
      </SwitchSliderPanel>
    </StyledSwitchSlider>
  );
};

SwitchSlider.propTypes = {
  checked: PropTypes.bool,
  loading: PropTypes.bool,
  theme: PropTypes.object
};

export default withTheme(SwitchSlider);
