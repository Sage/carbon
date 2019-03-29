import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import InlineInputs from './inline-inputs';
import Textbox from '../textbox';

storiesOf('InlineInputs', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
    }
  })
  .add('default', () => {
    const label = text('label', 'Inline Inputs');

    return (
      <InlineInputs
        label={ label }
      >
        <Textbox />
        <Textbox />
      </InlineInputs>
    );
  }, {
    knobs: { escapeHTML: false }
  });
