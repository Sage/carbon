import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './documentation';
import Fieldset from './fieldset.component';
import Textbox from '../textbox';

storiesOf('Experimental/Fieldset', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
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
        <Textbox
          label='Address'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='City'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Country'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Telephone'
          labelInline
          labelAlign='right'
        />
      </Fieldset>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
