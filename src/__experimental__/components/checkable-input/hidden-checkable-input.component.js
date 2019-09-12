import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';

const HiddenCheckableInput = ({
  helpId, labelId, inputName, inputType, inputValue, role, tabindex, ...props
}) => {
  return (
    <HiddenCheckableInputStyle
      aria-checked={ props.checked }
      aria-labelledby={ labelId }
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
  labelId: PropTypes.string,
  helpId: PropTypes.string,
  inputName: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  role: PropTypes.string,
  tabindex: PropTypes.number
};

export default HiddenCheckableInput;
