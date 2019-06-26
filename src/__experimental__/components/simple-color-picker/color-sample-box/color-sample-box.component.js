import React from 'react';
import PropTypes from 'prop-types';
import StyledColorSampleBox from './style/color-sample-box.style';
import StyledTickIcon from '../tick-icon/tick-icon.style';

const ColorSampleBox = ({ color, checked }) => {
  return (
    <StyledColorSampleBox color={ color }>
      {checked && (
        <StyledTickIcon
          color={ color } checked
          type='tick'
        />
      )}
    </StyledColorSampleBox>
  );
};

ColorSampleBox.propTypes = {
  checked: PropTypes.bool,
  color: (props, propName) => {
    props[propName].match(/\b[0-9A-Fa-f]{6}\b/g);
  }
};

export default ColorSampleBox;
