import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import FormField from '../form-field';

const CheckboxGroup = (props) => {
  const {
    children,
    id,
    value,
    defaultValue
  } = props;
  const defaultCheckedValue = (defaultValue !== undefined) ? defaultValue : [];
  const checkboxGroupValue = (value !== undefined) ? value : defaultCheckedValue;
  const groupLabelId = `${id}-label`;

  const buttons = React.Children.map(children, (child) => {
    let checked = false;
    let defaultChecked = false;

    if (checkboxGroupValue.length > 0) {
      checked = (checkboxGroupValue.indexOf(child.props.value) !== -1);
    }

    if (defaultCheckedValue.length > 0) {
      defaultChecked = (defaultCheckedValue.indexOf(child.props.value) !== -1);
    }

    const handleChange = (ev) => {
      child.props.onChange(ev);
    };

    const childProps = {
      inputName: id,
      onChange: handleChange,
      ...(checked && { checked }),
      ...(defaultChecked && { defaultChecked })
    };

    return React.cloneElement(child, childProps);
  });

  return (
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
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
  id: PropTypes.string.isRequired,
  value: PropTypes.array,
  defaultValue: PropTypes.array
};

export default CheckboxGroup;
