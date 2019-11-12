import React from 'react';
import PropTypes from 'prop-types';
import StyledColorSampleBox from './color-sample-box.style';
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

export const colorSampleBoxCheck = (props, propName, component) => {
  const color = props[propName], hexRegex = /\b[0-9A-Fa-f]{6}\b/g;
  if (!color.match(hexRegex)) {
    return new Error(`Provide color in a six-digit hex format in ${component}.`);
  }
  return null;
};

ColorSampleBox.propTypes = {
  checked: PropTypes.bool,
  color: colorSampleBoxCheck
};

export default ColorSampleBox;
