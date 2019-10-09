import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import { withValidation } from '../../../components/validations';
import FormField from '../form-field';

const CheckboxGroup = (props) => {
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
  const isControled = value !== undefined;
  const [checkedValues, setCheckedValues] = useState([]);

  const onChangeProp = useCallback((e) => {
    onChange(e);
    if (!isControled) {
      if (checkedValues.length) {
        if (checkedValues.includes(e.target.value)) {
          checkedValues.splice(checkedValues.indexOf(e.target.value), 1);
          setCheckedValues([...checkedValues]);
        } else {
          setCheckedValues([...checkedValues, e.target.value]);
        }
      } else {
        setCheckedValues([e.target.value]);
      }
    }
  }, [onChange, checkedValues, setCheckedValues, isControled]);

  const buttons = React.Children.map(children, (child) => {
    let checked;
    if (isControled) {
      // The user is controlling the input via the value prop
      checked = value === child.props.value;
    } else if (checkedValues.length && checkedValues.includes(child.props.value)) {
      // Uncontrolled and the user has not made a selection, but at least one has a checked prop
      // checked = child.props.checked || false;
      checked = true;
    } else {
      // Uncontrolled, existing selection or none marked as checked
      checked = checkedValues === child.props.value;
    }

    let childProps = {
      checked,
      inputName: groupName,
      onChange: onChangeProp
    };

    if (!checked) {
      childProps = {
        ...childProps,
        hasError,
        hasWarning,
        hasInfo
      };
    }

    return React.cloneElement(child, childProps);
  });

  return (
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      checkedValues={ checkedValues }
      { ...tagComponent('checkboxgroup', props) }
    >
      <FormField { ...props }>
        {buttons}
      </FormField>
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string
};

CheckboxGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false
};

export default withValidation(CheckboxGroup);
