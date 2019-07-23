import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';

const HiddenCheckableInput = ({
  role, tabindex, type, ...props
}) => {
  return (
    <HiddenCheckableInputStyle
      aria-checked={ props.checked }
      role={ role || type }
      tabIndex={ tabindex }
      type={ type }
      { ...props }
    />
  );
};

HiddenCheckableInput.propTypes = {
  checked: PropTypes.bool,
  role: PropTypes.string,
  tabindex: PropTypes.number,
  type: PropTypes.string.isRequired
};

export default HiddenCheckableInput;
