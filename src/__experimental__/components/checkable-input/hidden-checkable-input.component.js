import React from 'react';
import PropTypes from 'prop-types';
import HiddenCheckableInputStyle from './hidden-checkable-input.style';

const HiddenCheckableInput = ({
  helpId, labelId, name, inputType, inputValue, role, tabindex, checked, ...props
}) => {
  const value = (inputValue !== undefined) ? inputValue : undefined;

  return (
    <HiddenCheckableInputStyle
      aria-checked={ checked }
      aria-labelledby={ labelId }
      aria-describedby={ helpId }
      name={ name }
      role={ role || inputType }
      tabIndex={ tabindex }
      type={ inputType }
      checked={ checked }
      { ...(value && { value }) }
      { ...props }
    />
  );
};

HiddenCheckableInput.propTypes = {
  checked: PropTypes.bool,
  labelId: PropTypes.string,
  helpId: PropTypes.string,
  name: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  role: PropTypes.string,
  tabindex: PropTypes.number
};

export default React.memo(HiddenCheckableInput);
