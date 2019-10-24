import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import SwitchStyle from './switch.style';
import CheckableInput from '../checkable-input';
import SwitchSlider from './switch-slider.component';
import withValidation from '../../../components/validations/with-validation.hoc';

const Switch = ({
  id,
  label,
  onChange,
  value,
  checked,
  hasError,
  hasWarning,
  hasInfo,
  defaultChecked,
  disabled,
  loading,
  theme,
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
    disabled: disabled || loading,
    hasError,
    hasWarning,
    hasInfo,
    checked: isControlled ? checked : checkedInternal,
    loading,
    theme,
    ...props
  };

  const inputProps = {
    ...switchProps,
    onChange: isControlled ? onChange : onChangeInternal,
    inputId: id,
    inputLabel: label,
    inputValue: value,
    inputType: 'checkbox',
    hasError,
    hasWarning,
    hasInfo
  };

  return (
    <SwitchStyle
      { ...tagComponent('Switch', props) }
      { ...switchProps }
    >
      <CheckableInput { ...inputProps }>
        <SwitchSlider { ...switchProps } />
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
  /** Help text */
  labelHelp: PropTypes.string,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Displays label inline with the Switch */
  labelInline: PropTypes.bool,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Override tab index on the validation and help icon */
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Triggers loading animation */
  loading: PropTypes.bool,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Reverses label and Switch display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the Switch to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.string,
  theme: PropTypes.object,
  /** the value of the checkbox, passed on form submit */
  value: PropTypes.string.isRequired,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool
};

Switch.defaultProps = {
  labelInline: false,
  reverse: false,
  hasError: false,
  hasWarning: false,
  hasInfo: false,
  helpTabIndex: 0
};

export default withValidation(Switch);
