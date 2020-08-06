import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  StyledButtonToggleInput
} from './button-toggle.style';

import { InputGroupContext } from '../../__internal__/input-behaviour';

function ButtonToggleInput(props) {
  const { onFocus, onBlur } = useContext(InputGroupContext);

  const handleBlur = (ev) => {
    if (props.onBlur) { props.onBlur(ev); }
    if (onBlur) onBlur(ev);
  };

  return (
    <StyledButtonToggleInput
      type='radio'
      name={ props.name }
      id={ props.guid }
      disabled={ props.disabled }
      checked={ props.checked }
      onChange={ props.onChange }
      onBlur={ handleBlur }
      onFocus={ onFocus }
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
