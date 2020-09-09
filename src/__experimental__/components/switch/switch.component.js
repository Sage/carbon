import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import SwitchStyle from './switch.style';
import CheckableInput from '../checkable-input';
import SwitchSlider from './switch-slider.component';

const Switch = ({
  id,
  label,
  onChange,
  onBlur,
  value,
  checked,
  defaultChecked,
  disabled,
  loading,
  reverse,
  validationOnLabel,
  labelInline,
  ...props
}) => {
  const isControlled = checked !== undefined;

  const [checkedInternal, setCheckedInternal] = useState(defaultChecked || false);

  const onChangeInternal = useCallback(
    (e) => {
      setCheckedInternal(e.target.checked);
      onChange(e);
    },
    [setCheckedInternal, onChange]
  );

  const switchProps = {
    ...props,
    labelInline,
    disabled: disabled || loading,
    checked: isControlled ? checked : checkedInternal,
    reverse: !reverse // switched to preserve backward compatibility
  };

  const inputProps = {
    ...switchProps,
    onBlur,
    onChange: isControlled ? onChange : onChangeInternal,
    inputId: id,
    inputLabel: label,
    inputValue: value,
    inputType: 'checkbox',
    reverse: !reverse // switched to preserve backward compatibility
  };

  const shouldValidationBeOnLabel = labelInline && !reverse ? true : validationOnLabel;

  return (
    <SwitchStyle
      { ...tagComponent('Switch', props) }
      { ...switchProps }
    >
      <CheckableInput useValidationIcon={ shouldValidationBeOnLabel } { ...inputProps }>
        <SwitchSlider
          useValidationIcon={ !shouldValidationBeOnLabel }
          { ...switchProps }
          loading={ loading }
        />
      </CheckableInput>
    </SwitchStyle>
  );
};

Switch.propTypes = {
  /** Set the value of the Switch if component is meant to be used as controlled */
  checked: PropTypes.bool,
  /** Set the default value of the Switch if component is meant to be used as uncontrolled */
  defaultChecked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Displays additional information below the input to provide help to the user. */
  fieldHelp: PropTypes.string,
  /** Displays fieldHelp inline with the checkbox */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The content of the label for the input */
  label: PropTypes.string,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Help text */
  labelHelp: PropTypes.string,
  /** Displays label inline with the Switch */
  labelInline: PropTypes.bool,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icon will be placed on label instead of being placed by the input */
  validationOnLabel: PropTypes.bool,
  /** Override tab index on the validation and help icon */
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Triggers loading animation */
  loading: PropTypes.bool,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and Switch display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the Switch to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.string,
  /** the value of the checkbox, passed on form submit */
  value: PropTypes.string
};

Switch.defaultProps = {
  labelInline: false,
  reverse: true,
  validationOnLabel: false
};

export { Switch as BaseSwitch };
export default Switch;
