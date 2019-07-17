import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Switch from '.';
import { info, legacyInfo, notes } from './documentation';
import classic from '../../../style/themes/classic';

const formStore = new Store({
  checked: false
});

const SwitchWrapper = (props) => {
  return (
    <State store={ formStore }>
      <Switch
        onChange={ handleChange }
        { ...props }
      />
    </State>
  );
};

storiesOf('Experimental/Switch', module)
  .add('classic', () => (
    <SwitchWrapper
      { ...commonKnobs() }
      theme={ classic }
    />
  ), {
    info: {
      text: legacyInfo,
      propTables: [Switch],
      propTablesExclude: [State, SwitchWrapper],
      excludedPropTypes: ['children', 'disabled', 'size', 'theme']
    },
    notes: { markdown: notes }
  })
  .add('default', () => (
    <SwitchWrapper
      { ...commonKnobs() }
      { ...dlsKnobs() }
    />
  ), {
    info: {
      text: info,
      propTables: [Switch],
      propTablesExclude: [State, SwitchWrapper],
      excludedPropTypes: ['children', 'theme']
    },
    notes: { markdown: notes }
  });

function handleChange(ev) {
  formStore.set({ checked: ev.target.checked });
  action('checked')(ev.target.checked);
}

function commonKnobs() {
  return ({
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    label: text('label', 'Switch on this component?'),
    labelHelp: text('labelHelp', 'Switch off and on this component.'),
    labelInline: boolean('labelInline', Switch.defaultProps.labelInline),
    loading: boolean('loading', false),
    inputWidth: number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }),
    labelWidth: number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }),
    labelAlign: select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ),
    reverse: boolean('reverse', Switch.defaultProps.reverse)
  });
}

function dlsKnobs() {
  return {
    disabled: boolean('disabled', false),
    size: select('size', OptionsHelper.sizesBinary, 'small')
  };
}
