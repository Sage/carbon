import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { RadioFieldsetStyle } from './radio-button.style';

function initialTabIndex(childIndex) {
  return (childIndex > 0) ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const RadioButtonGroup = (props) => {
  const { children, name, legend } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const buttons = React.Children.map(children, (child, index) => {
    const isDefaultChecked = child.props.checked && !selectedValue;
    const checked = isDefaultChecked || selectedValue === child.props.value;
    const tabindex = selectedValue ? checkedTabIndex(checked) : initialTabIndex(index);

    const handleChange = (ev) => {
      child.props.onChange(ev);
      setSelectedValue(ev.target.value);
    };

    return React.cloneElement(
      child,
      {
        checked,
        name,
        onChange: handleChange,
        tabindex
      }
    );
  });

  return (
    <RadioFieldsetStyle legend={ legend } { ...tagComponent('radiogroup', props) }>
      {buttons}
    </RadioFieldsetStyle>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired
};

export default RadioButtonGroup;
