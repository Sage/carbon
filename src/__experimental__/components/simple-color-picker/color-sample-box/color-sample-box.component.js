import React from 'react';
import PropTypes from 'prop-types';
import StyledColorSampleBox from './style/color-sample-box.style';
import StyledTickIcon from '../tick-icon/tick-icon.style';
import calculateBrightness from '../../../../style/utils/calculate-brightness';

const ColorSampleBox = ({ color, checked }) => {
  const iconColor = calculateBrightness(color);
  const tickIcon = checked ? (
    <StyledTickIcon
      iconColor={ iconColor } checked
      type='tick'
    />
  ) : null;

  return <StyledColorSampleBox color={ color }>{tickIcon}</StyledColorSampleBox>;
};

ColorSampleBox.propTypes = {
  color: PropTypes.string,
  checked: PropTypes.bool
};

export default ColorSampleBox;
