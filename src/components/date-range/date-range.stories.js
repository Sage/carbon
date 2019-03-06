import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import notes from './notes.md';
import DateRange from './date-range.js';

const store = new Store({
  value: ['2016-10-01', '2016-10-30']
});
const handleChange = (newDate) => {
  store.set({ value: newDate });
  action('changed')(newDate);
};

storiesOf('DateRange', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const endLabel = text('endLabel', '');
    const startLabel = text('startLabel', '');
    const startMessage = text('startMessage', 'Start date must not be later than the end date');
    const endMessage = text('endMessage', 'End date cannot be earlier than the start date');
    const labelsInline = boolean('labelsInline', false);

    return (
      <State store={ store }>
        <DateRange
          onChange={ handleChange }
          endLabel={ endLabel }
          value={ store.get('value') }
          startLabel={ startLabel }
          startMessage={ startMessage }
          endMessage={ endMessage }
          labelsInline={ labelsInline }
        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
