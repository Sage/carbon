import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import CheckboxStyle from './checkbox.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import CheckboxSvg from './checkbox-svg.component';
import withValidations from '../../../components/validations/with-validation.hoc';

const Checkbox = ({
  id, label, onChange, onBlur, value, ...props
}) => {
  const inputProps = {
    ...props,
    onChange,
    onBlur,
    labelInline: true,
    inputId: id,
    inputLabel: label,
    inputValue: value,
    inputType: 'checkbox',
    reverse: !props.reverse
  };

  return (
    <CheckboxStyle
      { ...tagComponent('checkbox', props) }
      { ...props }
    >
      <CheckableInput { ...inputProps }>
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
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and checkbox display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the checkbox to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.string,
  /** the value of the checkbox, passed on form submit */
  value: PropTypes.string
};

Checkbox.defaultProps = {
  reverse: false
};

export default withValidations(Checkbox);
