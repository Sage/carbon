import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { THEMES } from '../../../style/themes';
import baseTheme from '../../../style/themes/base';
import Icon from '../../../components/icon';
import StyledSwitchSlider from './switch-slider.style';
import SwitchSliderPanel from './switch-slider-panel.style';
import SwitchSpinner from './switch-spinner.component';

const SwitchSlider = (props) => {
  const { theme, checked, loading } = props;

  const on = theme.name === THEMES.classic ? <Icon type='tick' /> : 'ON';
  const off = theme.name === THEMES.classic ? <Icon type='cross' /> : 'OFF';
  const panelContent = checked ? on : off;

  const sliderContent = (
    <SwitchSliderPanel type={ checked ? 'on' : 'off' } { ...props }>
      {loading ? <SwitchSpinner { ...props } /> : panelContent}
    </SwitchSliderPanel>
  );

  return (
    <StyledSwitchSlider { ...props }>
      {sliderContent}
    </StyledSwitchSlider>
  );
};

SwitchSlider.propTypes = {
  checked: PropTypes.bool,
  loading: PropTypes.bool,
  theme: PropTypes.object
};

SwitchSlider.defaultProps = {
  theme: baseTheme
};

export default withTheme(SwitchSlider);
