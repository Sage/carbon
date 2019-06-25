import React from 'react';
import PropTypes from 'prop-types';
import StyledColorSampleBox from './style/color-sample-box.style';
import StyledTickIcon from '../tick-icon/tick-icon.style';

const ColorSampleBox = ({ color, checked }) => {
  const tickIcon = checked ? (
    <StyledTickIcon
      bgColor={ color } checked
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
