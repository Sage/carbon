import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import { generateGroups, toSum, toIndexSteps } from './grouped-character.utils';
import Events from '../../../utils/helpers/events/events';

const GroupedCharacter = (props) => {
  const [pressedKey, updatePressedKey] = useState(null);

  const { separator, groups, value } = props;
  const stepIndices = groups.reduce(toIndexSteps, []);

  const handleChange = (ev) => {
    const i = ev.target;
    const { selectionEnd } = ev.target;
    let modifier = 0;

    if (stepIndices.includes(selectionEnd - 1)) modifier = 1;
    if (stepIndices.includes(selectionEnd - 1) && Events.isBackspaceKey({ which: pressedKey })) modifier = -1;

    props.onChange({ target: { value: ev.target.value.split(separator).join('') } });
    setTimeout(() => i.setSelectionRange(selectionEnd + modifier, selectionEnd + modifier));
  };

  return (
    <Textbox
      value={ generateGroups(groups, value).join(separator) }
      onChange={ handleChange }
      onKeyDown={ ({ which }) => updatePressedKey(which) }
      onKeyPress={ (ev) => {
        if (groups.reduce(toSum) === value.length) {
          ev.preventDefault();
        }
      } }
    />
  );
};

GroupedCharacter.propTypes = {
  /** character to be used as separator */
  separator: PropTypes.string,
  /** pattern by which input value should be grouped */
  groups: PropTypes.array,
  /** input value */
  value: PropTypes.string,
  /** on change handler which will receive the input value without separators */
  onChange: PropTypes.func
};

export default GroupedCharacter;
