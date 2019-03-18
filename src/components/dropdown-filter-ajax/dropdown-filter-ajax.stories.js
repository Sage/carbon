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
import DropdownFilterAjax from './dropdown-filter-ajax';
import { enableMock } from '../../../demo/xhr-mock';

const store = new Store({
  value: '',
  visibleValue: ''
});

enableMock();
const create = (evt, component) => component.state.filter;

// Shared Props
const onChange = (evt) => {
  store.set({
    visibleValue: evt.target.visibleValue,
    value: evt.target.visibleValue
  });
  action('change')(evt);
};

const defaultKnobs = () => {
  const labelInline = boolean('labelInline', true);

  return {
    autoFocus: boolean('autoFocus', false),
    cacheVisibleValue: boolean('cacheVisibleValue', false),
    disabled: boolean('disabled', false),
    name: text('name', 'Name'),
    readOnly: boolean('readOnly', false),
    timeToDisappear: number('timeToDisappear', 0),
    label: text('label', 'Dropdown Label'),
    labelInline,
    labelWidth: labelInline ? text('labelWidth', '') : null,
    labelAlign: labelInline ? select('labelAlign', OptionsHelper.alignBinary) : null,
    labelHelp: text('labelHelp', 'This is help text'),
    inputWidth: text('inputWidth', ''),
    fieldHelp: text('fieldHelp', 'This is field help text'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    createText: text('createText', ''),
    createIconType: text('createIconType', ''),
    suggest: boolean('suggest', false),
    freetext: boolean('freetext', false),
    path: text('path', '/countries'),
    acceptHeader: text('acceptHeader', DropdownFilterAjax.defaultProps.acceptHeader),
    rowsPerRequest: number('rowsPerRequest', DropdownFilterAjax.defaultProps.rowsPerRequest),
    dataRequestTimeout: number(
      'dataRequestTimeout',
      DropdownFilterAjax.defaultProps.dataRequestTimeout
    ),
    withCredentials: boolean('withCredentials', false),
    options: ImmutableHelper.parseJSON([
      {
        id: 1, name: 'Orange'
      }, {
        id: 2, name: 'Blue'
      }
    ])
  }
};

storiesOf('DropdownFilterAjax', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const props = defaultKnobs();

    return (
      <State store={ store }>
        <DropdownFilterAjax
          { ...props }
          getCustomHeaders={ () => ({}) }
          onChange={ onChange }
        />
      </State>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes }
  })
  .add('withCreate', () => {
    const props = defaultKnobs();

    return (
      <State store={ store }>
        <DropdownFilterAjax
          { ...props }
          create={ create }
          getCustomHeaders={ () => ({}) }
          onChange={ onChange }
        />
      </State>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
