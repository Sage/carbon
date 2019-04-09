import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import getTextboxStoryProps from '../textbox/textbox.stories';
import Textarea from '.';
// import { notes, info } from './documentation';

const store = new Store({
  value: ''
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

const rangeOptions = {
  range: true,
  min: 0,
  max: 300,
  step: 1
};

storiesOf('Experimental/Textarea', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add(
    'default',
    () => {
      const warnOverLimit = boolean('warnOverLimit', Textarea.defaultProps.warnOverLimit);
      const expandable = boolean('expandable', Textarea.defaultProps.expandable);
      const characterLimit = text('characterLimit', '10');
      const enforceCharacterLimit = characterLimit ? boolean(
        'enforceCharacterLimit',
        Textarea.defaultProps.enforceCharacterLimit
      ) : undefined;
      const cols = number('cols', 0, rangeOptions);
      const rows = number('rows', 0, rangeOptions);

      return (
        <State store={ store }>
          <Textarea
            warnOverLimit={ warnOverLimit }
            onChange={ handleChange }
            characterLimit={ characterLimit }
            enforceCharacterLimit={ enforceCharacterLimit }
            expandable={ expandable }
          />
        </State>
      );
    },
    // {
    //   info: { text: info },
    //   notes: { markdown: notes }
    // },
  );
