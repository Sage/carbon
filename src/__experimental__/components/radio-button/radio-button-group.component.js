import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import RadioButtonFieldsetStyle from './radio-button-fieldset.style';
import withValidation from '../../../components/validations/with-validation.hoc';

const RadioButtonGroup = (props) => {
  const {
    children,
    name,
    legend,
    hasError,
    hasWarning,
    hasInfo,
    onBlur,
    onChange,
    value,
    tooltipMessage
  } = props;
  const groupLabelId = `${name}-label`;

  const anyChecked = useMemo(() => {
    let result = false;
    React.Children.map(children, (child) => {
      if (Object.prototype.hasOwnProperty.call(child.props, 'checked')) {
        result = true;
      }
    });
    return result;
  }, [children]);

  const isControlled = value !== undefined;

  const [checkedValue, setCheckedValue] = useState(false);
  const onChangeProp = useCallback((e) => {
    onChange(e);
    if (!isControlled) {
      setCheckedValue(e.target.value);
    }
  }, [onChange, setCheckedValue, isControlled]);

  const buttons = React.Children.map(children, (child) => {
    let checked;
    if (isControlled) {
      // The user is controlling the input via the value prop
      checked = value === child.props.value;
    } else if (!checkedValue && anyChecked) {
      // Uncontrolled and the user has not made a selection, but at least one has a checked prop
      checked = child.props.checked || false;
    } else {
      // Uncontrolled, existing selection or none marked as checked
      checked = checkedValue === child.props.value;
    }

    return React.cloneElement(child, {
      checked,
      name,
      onBlur,
      onChange: onChangeProp
    });
  });

  return (
    <RadioButtonFieldsetStyle
      aria-labelledby={ groupLabelId }
      role='radiogroup'
      legend={ legend }
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      tooltipMessage={ tooltipMessage }
      { ...tagComponent('radiogroup', props) }
    >
      {buttons}
    </RadioButtonFieldsetStyle>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired,
  /** Help text */
  labelHelp: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  /** Callback fired when the user selects a RadioButton */
  onChange: PropTypes.func,
  /** value of the selected RadioButton */
  value: PropTypes.string,
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage: PropTypes.string
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(RadioButtonGroup, { unblockValidation: true });
