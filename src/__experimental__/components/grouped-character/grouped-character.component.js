import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import { generateGroups, toSum, toIndexSteps } from './grouped-character.utils';
import Events from '../../../utils/helpers/events/events';

const GroupedCharacter = (props) => {
  const [pressedKey, updatePressedKey] = useState(null);

  const { separator, groups, value } = props;
  const stepIndices = groups.reduce(toIndexSteps, []);

  const handleChange = (e) => {
    const i = e.target;
    const { selectionEnd } = e.target;
    let modifier = 0;

    if (stepIndices.includes(selectionEnd - 1)) modifier = 1;
    if (stepIndices.includes(selectionEnd - 1) && Events.isBackspaceKey({ which: pressedKey })) modifier = -1;

    props.onChange({ target: { value: e.target.value.split(separator).join('') } });
    setTimeout(() => i.setSelectionRange(selectionEnd + modifier, selectionEnd + modifier));
  };

  return (
    <Textbox
      value={ generateGroups(groups, value).join(separator) }
      onChange={ handleChange }
      onKeyDown={ ({ which }) => updatePressedKey(which) }
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
