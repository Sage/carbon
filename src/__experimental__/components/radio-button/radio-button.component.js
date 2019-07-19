import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { RadioButtonStyle } from './radio-button.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import RadioButtonSvg from './radio-button-svg.component';

const RadioButton = ({ id, ...props }) => {
  const inputProps = {
    ...props,
    reverse: !props.reverse
  };

  const { onChange, ...rest } = inputProps;

  return (
    <RadioButtonStyle
      { ...tagComponent('radio-button', props) }
      { ...props }
    >
      <CheckableInput
        type='radio'
        { ...rest }
        inputId={ id }
        onChange={ onChange }
        tabindex={ rest.checked ? 0 : -1 }
      >
        <RadioButtonSvg />
      </CheckableInput>
    </RadioButtonStyle>
  );
};

RadioButton.propTypes = {
  /** Set the value of the checkbox */
  checked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Toggles error styles */
  error: PropTypes.bool,
  /** Displays fieldHelp inline with the checkbox */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.number,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.number,
  /**
   * The name of the group containing the RadioButton (can also be set via
   * the 'groupName' prop of the RadioButtonGroup component)
   */
  name: PropTypes.string,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Reverses label and checkbox display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the checkbox to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.string,
  /** the value of the Radio Button, passed on form submit */
  value: PropTypes.string.isRequired
};

RadioButton.defaultProps = {
  reverse: false
};

export default RadioButton;
