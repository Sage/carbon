import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyledButtonToggleInput } from "./button-toggle.style";

import { InputGroupContext } from "../../__internal__/input-behaviour";

const ButtonToggleInput = React.forwardRef((props, forwardRef) => {
  const { onFocus, onBlur } = useContext(InputGroupContext);

  const handleBlur = (ev) => {
    if (props.onBlur) {
      props.onBlur(ev);
    }
    if (onBlur) onBlur(ev);
  };

  const handleFocus = (ev) => {
    if (props.onFocus) {
      props.onFocus(ev);
    }
    if (onFocus) onFocus(ev);
  };

  return (
    <StyledButtonToggleInput
      type="radio"
      name={props.name}
      id={props.guid}
      disabled={props.disabled}
      checked={props.checked}
      onChange={props.onChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={props.value}
      ref={forwardRef}
    />
  );
});

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
  onBlur: PropTypes.func,
  /** Callback triggered by focus event on the input. */
  onFocus: PropTypes.func,
};

export default ButtonToggleInput;
