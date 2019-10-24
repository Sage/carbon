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

  const isControled = value !== undefined;

  const [checkedValue, setCheckedValue] = useState(false);
  const onChangeProp = useCallback((e) => {
    onChange(e);
    if (!isControled) {
      setCheckedValue(e.target.value);
    }
  }, [onChange, setCheckedValue, isControled]);

  const buttons = React.Children.map(children, (child) => {
    let checked;
    if (isControled) {
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
  onChange: PropTypes.func,
  value: PropTypes.string,
  tooltipMessage: PropTypes.string
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(RadioButtonGroup, { unblockValidation: true });
