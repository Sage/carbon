import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number
} from '@storybook/addon-knobs';
import RadioButton from './radio-button';
import notes from './notes.md';

storiesOf('Radio Button', module).add(
  'default',
  () => {
    const fieldHelp = text('fieldHelp', 'Additional information below the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const inputWidth = number('inputWidth', 0);
    const label = text('label', 'Example RadioButton');
    const labelAlign = text('labelAlign', 'left');
    const labelHelp = text('labelHelp', 'Example label help text');
    const labelInline = boolean('labelInline', false);
    const labelWidth = number('labelWidth', 0);
    const className = text('className', '');

    return (
      [
        <RadioButton
          className={ className }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          inputWidth={ inputWidth }
          label={ label }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          name='radio-buttons-name'
        />,
        <RadioButton
          className={ className }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          inputWidth={ inputWidth }
          label={ label }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          name='radio-buttons-name'
        />
      ]
    );
  }, {
    notes: { markdown: notes }
  }
);
