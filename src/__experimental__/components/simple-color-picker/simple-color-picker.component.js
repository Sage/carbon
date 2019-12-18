import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import tagComponent from '../../../utils/helpers/tags/tags';
import SimpleColor from './simple-color';
import RadioButtonMapper from '../radio-button/radio-button-mapper.component';
import { SimpleColorFieldset, StyledColorOptions } from './simple-color-picker.style';

const SimpleColorPicker = (props) => {
  const {
    children, name, legend, onChange, onBlur, value, isBlurBlocked = false
  } = props;

  const myRef = useRef(null);
  const [blurBlocked, setIsBlurBlocked] = useState(isBlurBlocked);
  const [focusedElement, setFocusedElement] = useState(null);

  const handleClickOutside = (ev) => {
    if (myRef.current && ev.target && !myRef.current.contains(ev.target)) {
      setIsBlurBlocked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  });

  const handleOnBlur = (ev) => {
    ev.preventDefault();

    if (!blurBlocked) {
      onBlur(ev);
    }
  };

  const handleOnMouseDown = (ev) => {
    setIsBlurBlocked(true);

    // If the mousedown event occurred on the currently-focused <SimpleColor>
    if (focusedElement !== null && focusedElement === ev.target) {
      ev.preventDefault();

    // If a different <SimpleColor> is currently focused
    } else if (focusedElement !== null) {
      ev.preventDefault();
      setIsBlurBlocked(false);
      setFocusedElement(ev.target);

    // If no <SimpleColor> is currently focused
    } else {
      setIsBlurBlocked(true);
      setFocusedElement(ev.target);
    }
  };

  return (
    <SimpleColorFieldset
      role='radiogroup'
      legend={ legend }
      isBlurBlocked={ blurBlocked }
      { ...tagComponent('simple-color-picker', props) }
    >
      <StyledColorOptions ref={ myRef }>
        <RadioButtonMapper
          name={ name }
          value={ value }
          onChange={ onChange }
          onMouseDown={ handleOnMouseDown }
          onBlur={ handleOnBlur }
        >
          { children }
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
  /** Should the onBlur callback prop be initially blocked? */
  isBlurBlocked: PropTypes.bool,
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
