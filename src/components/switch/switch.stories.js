import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import {
  text, boolean, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Switch from './switch';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

const store = new Store({
  value: false
});

const handleChange = () => {
  store.set({ value: !store.get('value') });
  action('click')();
};

storiesOf('Switch', module).add(
  'default',
  () => {
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const label = text('label', 'Example Switch');
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const labelInline = label ? boolean('labelInline', false) : null;
    const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : null;
    const labelWidth = labelInline ? number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 150,
      step: 1
    }) : null;
    const reverse = boolean('reverse', true);
    const loading = boolean('loading', false);

    return (
      <State store={ store }>
        <Switch
          onChange={ handleChange }
          fieldHelp={ fieldHelp }
          label={ label }
          labelHelp={ labelHelp }
          reverse={ reverse }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          fieldHelpInline={ fieldHelpInline }
          loading={ loading }
        />
      </State>
    );
  },
  { notes: { markdown: notes } }
);
