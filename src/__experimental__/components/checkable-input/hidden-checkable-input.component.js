import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';

const HiddenCheckableInput = ({
  role, type, ...props
}) => {
  return (
    <HiddenCheckableInputStyle
      aria-checked={ props.checked }
      role={ role || type }
      type={ type }
      { ...props }
    />
  );
};

HiddenCheckableInput.propTypes = {
  checked: PropTypes.bool,
  role: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default HiddenCheckableInput;
