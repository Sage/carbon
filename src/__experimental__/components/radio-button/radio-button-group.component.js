import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledRadioButtonGroup } from './radio-button.style';
import withValidation from '../../../components/validations/with-validation.hoc';
import FormField from '../form-field';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const RadioButtonGroup = (props) => {
  const {
    children,
    groupName,
    hasError,
    hasWarning,
    hasInfo,
    onChange,
    value
  } = props;
  const groupLabelId = `${groupName}-label`;

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
    setCheckedValue(e.target.value);
  }, [onChange, setCheckedValue]);

  const buttons = React.Children.map(children, (child, index) => {
    let tabindex;
    let checked;
    if (isControled) {
      // The user is controlling the input via the value prop
      checked = value === child.props.value;
      tabindex = checkedTabIndex(checked);
    } else if (!checkedValue && anyChecked) {
      // Uncontrolled and the user has not made a selection, but at least one has a checked prop
      checked = child.props.checked || false;
      tabindex = checkedTabIndex(checked);
    } else {
      // Uncontrolled, existing selection or none marked as checked
      checked = checkedValue === child.props.value;
      tabindex = initialTabIndex(index);
    }

    return React.cloneElement(child, {
      checked,
      tabindex,
      inputName: groupName,
      onChange: onChangeProp
    });
  });

  return (
    <StyledRadioButtonGroup
      aria-labelledby={ groupLabelId }
      role='radiogroup'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      { ...tagComponent('radiogroup', props) }
    >
      <FormField { ...props } labelId={ groupLabelId }>
        {buttons}
      </FormField>
    </StyledRadioButtonGroup>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** The content for the RadioGroup Label */
  label: PropTypes.string.isRequired,
  /** Help text */
  labelHelp: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(RadioButtonGroup, { unblockValidation: true });
