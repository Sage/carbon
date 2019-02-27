import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './notes.md';
import Fieldset from './fieldset';
import Textbox from '../textbox';

storiesOf('Fieldset', module)
  .add('default', () => {
    const legend = text('legend', '');

    return (
      <Fieldset
        legend={ legend }
      >
        <Textbox
          value=''
          label='First Name'
          labelInline
          labelAlign='right'
        />
        <Textbox
          value=''
          label='Last Name'
          labelInline
          labelAlign='right'
        />
      </Fieldset>
    );
  }, {
    notes: { markdown: notes }
  });
