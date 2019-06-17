import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import InlineInputs from './inline-inputs.component';
import Textbox from '../../__experimental__/components/textbox';
import Decimal from '../../__experimental__/components/decimal';

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
        <Decimal />
      </InlineInputs>
    );
  }, {
    knobs: { escapeHTML: false }
  });
