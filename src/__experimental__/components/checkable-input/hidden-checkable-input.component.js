import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';

const HiddenCheckableInput = ({
  helpId, inputName, inputType, inputValue, role, tabindex, ...props
}) => {
  return (
    <HiddenCheckableInputStyle
      aria-checked={ props.checked }
      aria-describedby={ helpId }
      name={ inputName }
      role={ role || inputType }
      tabIndex={ tabindex }
      type={ inputType }
      value={ inputValue }
      { ...props }
    />
  );
};

HiddenCheckableInput.propTypes = {
  checked: PropTypes.bool,
  helpId: PropTypes.string,
  inputName: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  role: PropTypes.string,
  tabindex: PropTypes.number
};

export default HiddenCheckableInput;
