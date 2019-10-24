import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import { generateGroups, toSum, toIndexSteps } from './grouped-character.utils';
import Events from '../../../utils/helpers/events';

const GroupedCharacter = ({
  defaultValue,
  groups,
  onBlur,
  onChange,
  separator: rawSeparator,
  value: externalValue,
  ...rest
}) => {
  const [pressedKey, updatePressedKey] = useState(null);

  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = externalValue !== undefined;

  const stepIndices = groups.reduce(toIndexSteps, []);
  stepIndices.pop();
  const separator = rawSeparator.substring(0, 1); // Ensure max length is 1

  const formatValue = val => generateGroups(groups, val).join(separator);
  const sanitizeValue = val => val.split(separator).join('');

  const value = isControlled ? externalValue : internalValue;

  const buildCustomTarget = ({ target }) => {
    const { name, id } = target;
    const rawValue = sanitizeValue(target.value);
    const formattedValue = formatValue(rawValue);

    return {
      ...(name && { name }),
      ...(id && { id }),
      value: {
        rawValue,
        formattedValue
      }
    };
  };

  const handleChange = (ev) => {
    const { target } = ev;
    const { selectionEnd } = target;
    let newCursorPos = selectionEnd;
    const isAtOneBeyondSeparator = stepIndices.includes(selectionEnd - 1);
    const backspacePressed = Events.isBackspaceKey({ which: pressedKey });

    if (isAtOneBeyondSeparator && backspacePressed) {
      newCursorPos -= 1;
    } else if (isAtOneBeyondSeparator) {
      newCursorPos += 1;
    }

    const rawValue = sanitizeValue(target.value);

    ev.target = buildCustomTarget(ev);

    onChange(ev);
    if (!isControlled) {
      setInternalValue(rawValue);
    }
    setTimeout(() => target.setSelectionRange(newCursorPos, newCursorPos));
  };

  const handleBlur = (ev) => {
    if (onBlur) {
      ev.target = buildCustomTarget(ev);
      onBlur(ev);
    }
  };

  const handleKeyPress = (ev) => {
    const { selectionStart, selectionEnd } = ev.target;
    const expectedLength = groups.reduce(toSum);
    const hasSelection = selectionEnd - selectionStart > 0;

    if (expectedLength === value.length && !hasSelection) {
      ev.preventDefault();
    }
  };

  return (
    <Textbox
      { ...rest }
      formattedValue={ formatValue(value) }
      onChange={ handleChange }
      onBlur={ handleBlur }
      onKeyDown={ ({ which }) => updatePressedKey(which) }
      onKeyPress={ handleKeyPress }
    />
  );
};

GroupedCharacter.propTypes = {
  /** character to be used as separator */
  separator: (props, propName, componentName) => {
    if (typeof props[propName] !== 'string' || props[propName].length > 1) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Must be string of length 1.`);
    }
    return null;
  },
  /** pattern by which input value should be grouped */
  groups: PropTypes.array,
  /** Input value if component is meant to be used as a controlled component */
  value: PropTypes.string,
  /** Default input value if component is meant to be used as an uncontrolled component */
  defaultValue: PropTypes.string,
  /** on change handler which receives the event with object as a value containing rawValue and formattedValue */
  onChange: PropTypes.func,
  /** on blur handler which receives the event with object as a value containing rawValue and formattedValue */
  onBlur: PropTypes.func
};

export default GroupedCharacter;
