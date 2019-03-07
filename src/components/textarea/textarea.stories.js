import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import Textarea from './textarea';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';

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
  setp: 1
};

storiesOf('Textarea', module).add(
  'default',
  () => {
    const warnOverLimit = boolean('warnOverLimit', false);
    const labelInline = boolean('labelInline', false);
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const expandable = boolean('expandable', false);
    const enforceCharacterLimit = boolean('enforceCharacterLimit require characterLimit', true);
    const characterLimit = number('characterLimit', 0, rangeOptions);
    const inputWidth = number('inputWidth', 0, rangeOptions);
    const labelWidth = number('labelWidth (require labelInline={true})', 0, rangeOptions);
    const cols = number('cols', 0, rangeOptions);
    const rows = number('rows', 0, rangeOptions);
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
        <Textarea
          warnOverLimit={ warnOverLimit }
          labelInline={ labelInline }
          labelAlign={ labelAlign }
          enforceCharacterLimit={ enforceCharacterLimit }
          characterLimit={ characterLimit }
          labelWidth={ labelWidth }
          cols={ cols }
          fieldHelpInline={ fieldHelpInline }
          expandable={ expandable }
          label={ label }
          labelHelp={ labelHelp }
          rows={ rows }
          fieldHelp={ fieldHelp }
          inputWidth={ inputWidth }
          onChange={ handleChange }
        />
      </State>
    );
  },
  { notes: { markdown: notes } }
);
