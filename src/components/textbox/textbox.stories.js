import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Textbox from './textbox';
import notes from './notes.md';

const store = new Store({
  value: ''
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

storiesOf('Textbox', module).add(
  'default',
  () => {
    const rangeOptions = {
      range: true,
      min: 0,
      max: 300,
      setp: 1
    };

    const fieldHelpInline = boolean('fieldHelpInline', false);
    const labelInline = boolean('labelInline', false);
    const inputWidth = number('inputWidth', 0, rangeOptions);
    const labelWidth = number('labelWidth (require labelInline={true})', 0, rangeOptions);
    const label = text('label', 'Example Textarea');
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const labelAlign = select(
      'labelAlign (require labelInline={true})',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    );

    return (
      <State store={ store }>
        <Textbox
          labelInline={ labelInline }
          labelAlign={ labelAlign }
          labelWidth={ labelWidth }
          fieldHelpInline={ fieldHelpInline }
          label={ label }
          labelHelp={ labelHelp }
          fieldHelp={ fieldHelp }
          inputWidth={ inputWidth }
          onChange={ handleChange }
        />
      </State>
    );
  },
  { notes: { markdown: notes } }
);
