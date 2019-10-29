import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags/tags';

import SimpleColor from './simple-color';
import { SimpleColorFieldset, StyledColorOptions } from './simple-color-picker.style';

const SimpleColorPicker = (props) => {
  const {
    children, name, legend, onChange, value
  } = props;

  const isControlled = value !== undefined;

  const [checkedValue, setCheckedValue] = useState(false);
  const onChangeProp = useCallback(
    (e) => {
      onChange(e);
      if (!isControlled) {
        setCheckedValue(e.target.value);
      }
    },
    [onChange, setCheckedValue, isControlled]
  );

  const colors = React.Children.map(children, (child) => {
    let checked;
    if (isControlled) {
      // The user is controlling the input via the value prop
      checked = value === child.props.color;
    } else if (!checkedValue) {
      // Uncontrolled and the user has not made a selection, check if any is default
      checked = child.props.defaultChecked;
    } else {
      // Uncontrolled, existing selection or none marked as checked
      checked = checkedValue === child.props.color;
    }

    return React.cloneElement(child, {
      defaultChecked: undefined,
      checked,
      name,
      onChange: onChangeProp
    });
  });

  return (
    <SimpleColorFieldset
      role='radiogroup'
      legend={ legend }
      { ...tagComponent('simple-color-picker', props) }
    >
      <StyledColorOptions>{colors}</StyledColorOptions>
    </SimpleColorFieldset>
  );
};

SimpleColorPicker.propTypes = {
  /** The SimpleColor components to be rendered in the group */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (SimpleColor.displayName !== child.type.displayName) {
        error = new Error(`\`${componentName}\` only accepts children of type \`${SimpleColor.displayName}\`.`);
      }
    });

    return error;
  },
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired,
  /** The currently selected color. */
  value: PropTypes.string,
  /** The name to apply to the input. */
  name: PropTypes.string,
  /** A callback triggered when a color is selected. */
  onChange: PropTypes.func
};

export default SimpleColorPicker;
