import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import CheckboxStyle from './checkbox.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import CheckboxSvg from './checkbox-svg.component';

const Checkbox = (props) => {
  return (
    <CheckboxStyle
      { ...tagComponent('checkbox', props) }
      { ...props }
    >
      <CheckableInput
        type='checkbox'
        { ...props }
      >
        <CheckboxSvg />
      </CheckableInput>
    </CheckboxStyle>
  );
};

Checkbox.propTypes = {
  /** Set the value of the checkbox */
  checked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Toggles error styles */
  error: PropTypes.bool,
  /** Displays fieldHelp inline with the checkbox */
  fieldHelpInline: PropTypes.bool,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.number,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.number,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Reverses label and checkbox display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the checkbox to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.string
};

Checkbox.defaultProps = {
  reverse: false
};

export default Checkbox;
