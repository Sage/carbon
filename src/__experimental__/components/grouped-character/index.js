import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import { generateGroups, toSum, toIndexSteps } from './grouped-character.utils';
import Events from '../../../utils/helpers/events';

const GroupedCharacter = (props) => {
  const [node, setRef] = useState(null),
      [cursorPos, updateCursorPos] = useState(0),
      [pressedKey, updatePressedKey] = useState(null);

  useEffect(
    () => { if (node) { node.current.setSelectionRange(cursorPos, cursorPos); } }
  );

  const { separator, groups, value } = props;
  const stepIndices = groups.reduce(toIndexSteps, []);

  const handleChange = (e) => {
    const { selectionEnd } = e.target;
    let modifier = 0;

    if (stepIndices.includes(selectionEnd - 1)) modifier = 1;
    if (stepIndices.includes(selectionEnd - 1) && Events.isBackspaceKey(pressedKey)) modifier = -1;

    props.onChange({ target: { value: e.target.value.split(separator).join('') } });
    updateCursorPos(selectionEnd + modifier);
  };

  return (
    <Textbox
      value={ generateGroups(groups, value).join(separator) }
      inputRef={ input => setRef(input) }
      onChange={ handleChange }
      onKeyDown={ e => updatePressedKey({ which: e.which }) }
      onKeyPress={ (e) => {
        if (groups.reduce(toSum) === value.length) {
          e.preventDefault();
        }
      } }
    />
  );
};

GroupedCharacter.propTypes = {
  separator: PropTypes.string,
  groups: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default GroupedCharacter;
