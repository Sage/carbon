import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import ImmutableHelper from '../../utils/helpers/immutable';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import DropdownFilter from './dropdown-filter';

const store = new Store({
  value: ''
});

const create = (_evt, component) => component.state.filter;

// Shared Props
const onChange = (evt) => {
  store.set({ value: evt.target.value });
  action('change')(evt);
};

const defaultKnobs = () => {
  const labelInline = boolean('labelInline', true);

  return {
    autoFocus: boolean('autoFocus'),
    cacheVisibleValue: boolean('cacheVisibleValue', true),
    disabled: boolean('disabled'),
    name: text('name', 'Name'),
    readOnly: boolean('readOnly'),
    timeToDisappear: number('timeToDisappear'),
    label: text('label', 'Dropdown Label'),
    labelInline,
    labelWidth: labelInline ? text('labelWidth') : undefined,
    labelAlign: labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined,
    labelHelp: text('labelHelp', 'This is help text'),
    inputWidth: text('inputWidth'),
    fieldHelp: text('fieldHelp', 'This is field help text'),
    fieldHelpInline: boolean('fieldHelpInline'),
    createText: text('createText'),
    createIconType: text('createIconType'),
    suggest: boolean('suggest'),
    freetext: boolean('freetext'),
    options: ImmutableHelper.parseJSON([
      {
        id: 1, name: 'Orange'
      }, {
        id: 2, name: 'Blue'
      }
    ])
  };
};

storiesOf('Dropdown Filter', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const props = defaultKnobs();

    return (
      <State store={ store }>
        <DropdownFilter
          { ...props }
          onChange={ onChange }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes }
  })
  .add('with Create', () => {
    const props = defaultKnobs();

    return (
      <State store={ store }>
        <DropdownFilter
          { ...props }
          create={ create }
          onChange={ onChange }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
