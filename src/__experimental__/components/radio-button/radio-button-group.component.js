import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import Label from '../label';
import { StyledRadioButtonGroup } from './radio-button.style';

function initialTabIndex(index) {
  return index ? -1 : 0;
}

function checkedTabIndex(checked) {
  return checked ? 0 : -1;
}

const RadioButtonGroup = (props) => {
  const { children, groupName, label } = props;
  const [selected, setSelected] = useState(undefined);

  const buttons = React.Children.map(children, (child, index) => {
    const key = child.props.value;
    const checked = selected === key;
    const tabindex = selected ? checkedTabIndex(checked) : initialTabIndex(index);

    return React.cloneElement(
      child,
      {
        checked: selected === key,
        key,
        name: groupName,
        onChange: ev => setSelected(ev.target.value),
        tabindex
      }
    );
  });

  const labelId = `${groupName}-label`;

  return (
    <StyledRadioButtonGroup
      aria-labelledby={ labelId }
      role='radiogroup'
      { ...tagComponent('radiogroup', props) }
    >
      <Label id={ labelId }>
        {label}
      </Label>
      {buttons}
    </StyledRadioButtonGroup>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** The content for the RadioGroup Label */
  label: PropTypes.string.isRequired
};

export default RadioButtonGroup;
