import React from 'react';
import { storiesOf } from '@storybook/react';
import { array, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import notes from './notes.md';
import DateRange from './date-range.js';

storiesOf('DateRange', module)
  .add('default', () => {
    const endLabel = text('endLabel', '');
    const value = array('value', ['2016-10-01', '2016-10-30']);
    const startLabel = text('startLabel', '');
    const startMessage = text('startMessage', '');
    const endMessage = text('endMessage', '');
    const labelsInline = boolean('labelsInline', false);

    return (
      <DateRange
        onChange={ action('changed') }
        endLabel={ endLabel }
        value={ value }
        startLabel={ startLabel }
        startMessage={ startMessage }
        endMessage={ endMessage }
        labelsInline={ labelsInline }
      />
    );
  }, {
    notes: { markdown: notes }
  });
