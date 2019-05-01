import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';

const HiddenCheckableInput = ({ checked, type, ...props }) => {
  return (
    <HiddenCheckableInputStyle
      aria-checked={ checked }
      role={ type }
      type={ type }
      { ...props }
    />
  );
};

HiddenCheckableInput.propTypes = {
  checked: PropTypes.bool,
  type: PropTypes.string
};

export default HiddenCheckableInput;
