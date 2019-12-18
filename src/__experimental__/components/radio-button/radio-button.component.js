import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import RadioButtonStyle from './radio-button.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import RadioButtonSvg from './radio-button-svg.component';
import OptionsHelper from '../../../utils/helpers/options-helper';

const RadioButton = ({
  id, label, onChange, onBlur, value, ...props
}) => {
  const handleChange = useCallback((ev) => {
    onChange(ev);
    // specifically trigger focus, as Safari doesn't focus radioButtons on click by default
    ev.target.focus();
  }, [onChange]);

  const inputProps = {
    ...props,
    onChange: handleChange,
    onBlur,
    helpTabIndex: 0,
    helpTag: 'span',
    inputId: id,
    inputLabel: label,
    inputValue: value,
    inputType: 'radio',
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
      { ...props }
    >
      <CheckableInput { ...inputProps }>
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
  /** Displays fieldHelp inline with the radio button */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The content of the label for the input */
  label: PropTypes.string,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.oneOf(OptionsHelper.alignBinary),
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The name of the the RadioButton (can also be set via the 'name' prop of the RadioButtonGroup component) */
  name: PropTypes.string,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and radio button display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the radio button to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.oneOf(OptionsHelper.sizesBinary),
  /** the value of the Radio Button, passed on form submit */
  value: PropTypes.string.isRequired,
  children: (props, propName, componentName) => {
    if (props[propName]) {
      return new Error(
        `Forbidden prop \`${propName}\` supplied to \`${componentName}\`. `
          + 'This component is meant to be used as a self-closing tag. '
          + 'You should probably use the label prop instead.'
      );
    }
    return null;
  }
};

RadioButton.defaultProps = {
  reverse: false
};

export { RadioButton as PrivateRadioButton };
export default React.memo(RadioButton);
