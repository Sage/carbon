import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { THEMES } from '../../../style/themes';
import Icon from '../../../components/icon';
import StyledSwitchSlider from './switch-slider.style';
import SwitchSliderPanel from './switch-slider-panel.style';
import SwitchSpinner from './switch-spinner.component';

const SwitchSlider = ({ loading, theme, ...props }) => {
  const on = theme.name === THEMES.classic ? <Icon type='tick' /> : 'ON';
  const off = theme.name === THEMES.classic ? <Icon type='cross' /> : 'OFF';

  return (
    <StyledSwitchSlider { ...props }>
      <SwitchSliderPanel type='on' { ...props }>
        {loading ? <SwitchSpinner { ...props } /> : on}
      </SwitchSliderPanel>
      <SwitchSliderPanel type='off' { ...props }>
        {loading ? <SwitchSpinner { ...props } /> : off}
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
