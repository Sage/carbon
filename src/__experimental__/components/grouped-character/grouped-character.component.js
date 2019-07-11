import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import { generateGroups, toSum, toIndexSteps } from './grouped-character.utils';
import Events from '../../../utils/helpers/events';

const GroupedCharacter = (props) => {
  const [pressedKey, updatePressedKey] = useState(null);

  const { groups, value } = props;
  const stepIndices = groups.reduce(toIndexSteps, []);
  const separator = props.separator.substring(0, 1); // Ensure max length is 1
  stepIndices.pop();

  const handleChange = (ev) => {
    const eventRef = ev.target;
    const { selectionEnd } = ev.target;
    let newCursorPos = selectionEnd;
    const isAtOneBeyondSeparator = stepIndices.includes(selectionEnd - 1),
        backspacePressed = Events.isBackspaceKey({ which: pressedKey });

    if (isAtOneBeyondSeparator && backspacePressed) {
      newCursorPos -= 1;
    } else if (isAtOneBeyondSeparator) {
      newCursorPos += 1;
    }

    const reProcessedInputValue = ev.target.value.split(separator).join('');

    props.onChange({ target: { value: reProcessedInputValue } });
    setTimeout(() => eventRef.setSelectionRange(newCursorPos, newCursorPos));
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
      { ...props }
      formattedValue={ generateGroups(groups, value).join(separator) }
      onChange={ handleChange }
      onKeyDown={ ({ which }) => updatePressedKey(which) }
      onKeyPress={ handleKeyPress }
    />
  );
};


GroupedCharacter.propTypes = {
  /** character to be used as separator */
  separator: ((props, propName, componentName) => {
    if (typeof props[propName] !== 'string' || props[propName].length > 1) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Must be string of length 1.`);
    }
    return null;
  }),
  /** pattern by which input value should be grouped */
  groups: PropTypes.array,
  /** input value */
  value: PropTypes.string,
  /** on change handler which will receive the input value without separators */
  onChange: PropTypes.func
};

export default GroupedCharacter;
