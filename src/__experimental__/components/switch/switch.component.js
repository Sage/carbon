import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import SwitchStyle from './switch.style';
import CheckableInput from '../checkable-input';
import SwitchSlider from './switch-slider.component';
import { isClassic } from '../../../utils/helpers/style-helper';
import withValidation from '../../../components/validations/with-validation.hoc';

const Switch = ({
  id, label, onChange, value, hasError, hasWarning, hasInfo, ...props
}) => {
  const classicDisabled = props.theme && isClassic(props.theme) && props.loading;

  const switchProps = {
    disabled: props.disabled || classicDisabled,
    hasError,
    hasWarning,
    hasInfo,
    ...props
  };

  const inputProps = {
    ...switchProps,
    disabled: props.disabled || classicDisabled,
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
      <CheckableInput
        { ...inputProps }
        onChange={ onChange }
      >
        <SwitchSlider { ...switchProps } />
      </CheckableInput>
    </SwitchStyle>
  );
};

Switch.propTypes = {
  /** Set the value of the Switch */
  checked: PropTypes.bool,
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
  helpTabIndex: PropTypes.number,
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
