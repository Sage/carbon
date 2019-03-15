import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './documentation/notes.md';
import Fieldset from './fieldset';
import Textbox from '../textbox';

storiesOf('Fieldset', module)
  .addParameters({
    info: {
      propTablesExclude: [Fieldset, Textbox]
    }
  })
  .add('default', () => {
    const legend = text('legend', '');

    return (
      <Fieldset
        legend={ legend }
      >
        <Textbox
          label='First Name'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Last Name'
          labelInline
          labelAlign='right'
        />
      </Fieldset>
    );
  }, {
    info: {
      propTables: [Fieldset]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
