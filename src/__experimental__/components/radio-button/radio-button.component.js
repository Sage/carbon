import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { RadioButtonStyle } from './radio-button.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import RadioButtonSvg from './radio-button-svg.component';
import OptionsHelper from '../../../utils/helpers/options-helper';

function setTabIndex({ tabindex, checked }) {
  let tabindexOverride;

  if (tabindex !== undefined) {
    tabindexOverride = tabindex;
  } else {
    tabindexOverride = checked ? 0 : -1;
  }

  return tabindexOverride;
}

const RadioButton = ({ id, ...props }) => {
  const { onChange, ...rest } = props;

  const inputProps = {
    ...rest,
    /**
     * Invert the reverse prop, to ensure the FormField component renders the components
     * in the desired order (other elements which use FormField render their sub-components the
     * opposite way around by default)
    */
    reverse: !props.reverse
  };

  return (
    <RadioButtonStyle
      { ...tagComponent('radio-button', props) }
      { ...rest }
    >
      <CheckableInput
        type='radio'
        { ...inputProps }
        inputId={ id }
        onChange={ onChange }
        tabindex={ setTabIndex(inputProps) }
      >
        <RadioButtonSvg />
      </CheckableInput>
    </RadioButtonStyle>
  );
};

RadioButton.propTypes = {
  /** Set the value of the radio button */
  checked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Toggles error styles */
  error: PropTypes.bool,
  /** Displays fieldHelp inline with the radio button */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The name of the group containing the RadioButton (can also be set via
   * the 'groupName' prop of the RadioButtonGroup component)
   */
  name: PropTypes.string,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Reverses label and radio button display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the radio button to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  /** the value of the Radio Button, passed on form submit */
  value: PropTypes.string.isRequired
};

RadioButton.defaultProps = {
  onChange: () => { },
  reverse: false
};

export default RadioButton;
