import React from 'react';
import PropTypes from 'prop-types';

import tagComponent from '../../../utils/helpers/tags/tags';
import SimpleColor from './simple-color';
import RadioButtonMapper from '../radio-button/radio-button-mapper.component';
import { SimpleColorFieldset, StyledColorOptions } from './simple-color-picker.style';

const SimpleColorPicker = (props) => {
  const {
    children, name, legend, onChange, onBlur, value
  } = props;

  return (
    <SimpleColorFieldset
      role='radiogroup'
      legend={ legend }
      { ...tagComponent('simple-color-picker', props) }
    >
      <StyledColorOptions>
        <RadioButtonMapper
          name={ name }
          onBlur={ onBlur }
          onChange={ onChange }
          value={ value }
        >
          {children}
        </RadioButtonMapper>
      </StyledColorOptions>
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
  onChange: PropTypes.func,
  /** A callback triggered when a color is selected. */
  onBlur: PropTypes.func
};

export default SimpleColorPicker;
