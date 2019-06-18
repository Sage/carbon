import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import StyledColorSampleBox from './style/color-sample-box.style';
import baseTheme from '../../../../style/themes/base';
import StyledTickIcon from '../tick-icon/tick-icon.style';
import { THEMES } from '../../../../style/themes';

const ColorSampleBox = ({ theme, color, checked }) => {
  const tickIcon = checked && theme.name === THEMES.classic ? <StyledTickIcon checked type='tick' /> : null;
  return <StyledColorSampleBox color={ color }>{tickIcon}</StyledColorSampleBox>;
};

ColorSampleBox.defaultProps = {
  theme: baseTheme
};

ColorSampleBox.propTypes = {
  theme: PropTypes.object,
  color: PropTypes.string,
  checked: PropTypes.bool
};

export default withTheme(ColorSampleBox);
export { ColorSampleBox };
