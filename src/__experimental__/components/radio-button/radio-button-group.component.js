import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledRadioButtonGroup } from './radio-button.style';

const RadioButtonGroup = (props) => {
  const { children, groupName } = props;
  const [selected, setSelected] = useState(null);

  function handleChange(ev) {
    setSelected(ev.target.value);
  }

  const buttons = () => React.Children.map(children, (child) => {
    const key = child.props.value;

    return React.cloneElement(
      child,
      {
        checked: selected === key,
        key,
        name: groupName,
        onChange: handleChange
      }
    );
  });

  return (
    <StyledRadioButtonGroup
      role='radiogroup'
      { ...tagComponent('radiogroup', props) }
    >
      {buttons()}
    </StyledRadioButtonGroup>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** The RadioButtonGroup name (applied to each child button as 'name' for grouping / accessibility) */
  groupName: PropTypes.string.isRequired
};

export default RadioButtonGroup;
