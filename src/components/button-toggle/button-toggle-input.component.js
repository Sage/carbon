import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledButtonToggleInput
} from './button-toggle.style';

function ButtonToggleInput(props) {
  return (
    <StyledButtonToggleInput
      type='radio'
      name={ props.name }
      id={ props.guid }
      disabled={ props.disabled }
      checked={ props.checked }
      onChange={ props.onChange }
      onBlur={ props.onBlur }
      value={ props.value }
    />
  );
}

ButtonToggleInput.propTypes = {
  /** Set the checked value of the radio button */
  checked: PropTypes.bool,
  /** Name used on the hidden radio button. */
  name: PropTypes.string,
  /** Disable all user interaction. */
  disabled: PropTypes.bool,
  /** Unique ID attribute for input */
  guid: PropTypes.string,
  /** Value for the input */
  value: PropTypes.string,
  /** Callback triggered by change event on the input. */
  onChange: PropTypes.func,
  /** Callback triggered by blur event on the input. */
  onBlur: PropTypes.func
};

export default ButtonToggleInput;
