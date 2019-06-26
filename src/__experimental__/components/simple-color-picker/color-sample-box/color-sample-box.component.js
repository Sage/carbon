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

const sampleBoxColorCheck = (props, propName) => {
  const color = props[propName];
  if (!color.match(/\b[0-9A-Fa-f]{6}\b/g)) {
    return new Error('Provide color in a hex format.');
  }
  return null;
};

ColorSampleBox.propTypes = {
  checked: PropTypes.bool,
  color: sampleBoxColorCheck
};

export default ColorSampleBox;
