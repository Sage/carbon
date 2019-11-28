import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import CheckboxStyle from './checkbox.style';
import CheckableInput from '../checkable-input/checkable-input.component';
import CheckboxSvg from './checkbox-svg.component';
import withValidation from '../../../components/validations/with-validation.hoc';

const Checkbox = ({
  id, name, label, value, onChange, defaultChecked, checked, ...props
}) => {
  const checkedValue = checked === undefined ? false : checked;
  const checkedStatus = (checked === undefined && defaultChecked !== undefined) ? defaultChecked : checkedValue;

  const [isChecked, setIsChecked] = useState(checkedStatus);

  useEffect(() => {
    setIsChecked(checkedStatus);
  }, [checkedStatus]);

  const handleOnChange = (ev) => {
    ev.stopPropagation();
    setIsChecked(!isChecked);
    onChange(ev);
  };

  const inputProps = {
    ...props,
    inputId: id,
    name,
    inputLabel: label,
    inputValue: value,
    inputType: 'checkbox',
    reverse: !props.reverse,
    onChange: handleOnChange,
    checked: isChecked
  };

  return (
    <CheckboxStyle
      { ...tagComponent('checkbox', props) }
      checked={ isChecked }
      { ...props }
    >
      <CheckableInput
        { ...inputProps }
      >
        <CheckboxSvg />
      </CheckableInput>
    </CheckboxStyle>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  /** Set the value of the checkbox */
  checked: PropTypes.bool,
  /** Set the default value of the checkbox */
  defaultChecked: PropTypes.bool,
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

export default withValidation(Checkbox, { unblockValidation: true });
