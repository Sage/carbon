import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import SwitchStyle from './switch.style';
import CheckableInput from '../checkable-input';
import SwitchSlider from './switch-slider.component';
import { isClassic } from '../../../utils/helpers/style-helper';

const Switch = (props) => {
  const classicDisabled = props.theme && isClassic(props.theme) && props.loading;

  const switchProps = {
    disabled: props.disabled || classicDisabled,
    ...props
  };

  return (
    <SwitchStyle
      { ...tagComponent('Switch', switchProps) }
      { ...switchProps }
    >
      <CheckableInput
        type='checkbox'
        { ...switchProps }
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
  /** Sets percentage-based input width */
  inputWidth: PropTypes.number,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** Displays label inline with the Switch */
  labelInline: PropTypes.bool,
  /** Sets percentage-based label width */
  labelWidth: PropTypes.number,
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
  theme: PropTypes.object
};

Switch.defaultProps = {
  labelInline: false,
  reverse: false
};

export default Switch;
