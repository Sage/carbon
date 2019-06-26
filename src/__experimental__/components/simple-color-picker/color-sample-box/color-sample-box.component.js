import React from 'react';
import PropTypes from 'prop-types';
import StyledColorSampleBox from './style/color-sample-box.style';
import StyledTickIcon from '../tick-icon/tick-icon.style';

const ColorSampleBox = ({ color, checked }) => {
  return (
    <StyledColorSampleBox color={ color }>
      {checked && (
        <StyledTickIcon
          color={ color }
          checked
          type='tick'
        />
      )}
    </StyledColorSampleBox>
  );
};

ColorSampleBox.propTypes = {
  color: PropTypes.string,
  checked: PropTypes.bool
};

export default ColorSampleBox;
