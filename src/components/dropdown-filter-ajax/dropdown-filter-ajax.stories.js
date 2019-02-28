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
import notes from './notes.md';
import DropdownFilterAjax from './dropdown-filter-ajax';

const store = new Store({
  value: ''
});

const onChange = (evt) => {
  store.set({ value: evt.target.value });
  action('change')();
};

storiesOf('DropdownFilterAjax', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const autoFocus = boolean('autoFocus', false);
    const cacheVisibleValue = boolean('cacheVisibleValue', true);
    const disabled = boolean('disabled', false);
    const name = text('name', 'Name');
    const readOnly = boolean('readOnly', false);
    const timeToDisappear = number('timeToDisappear', 0);
    const label = text('label', 'Dropdown Label');
    const labelInline = boolean('labelInline', true);
    const labelWidth = labelInline ? text('labelWidth', '') : null;
    const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : null;
    const labelHelp = text('labelHelp', 'This is help text');
    const inputWidth = text('inputWidth', '');
    const fieldHelp = text('fieldHelp', 'This is field help text');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    // TODO: Storybook needs a boolean, but the value is actually a function
    // const create = boolean('create', false);
    const createText = text('createText', '');
    const createIconType = text('createIconType', '');
    const suggest = boolean('suggest', false);
    const freetext = boolean('freetext', false);
    const path = text('path', '/');
    const acceptHeader = text('acceptHeader', 'application/json');
    const rowsPerRequest = text('rowsPerRequest', '25');
    const dataRequestTimeout = number('dataRequestTimeout', 500);
    const withCredentials = boolean('withCredentials', false);
    const options = ImmutableHelper.parseJSON([
      {
        id: 1, name: 'Orange'
      }, {
        id: 2, name: 'Blue'
      }
    ]);

    return (
      <State store={ store }>
        <DropdownFilterAjax
          autoFocus={ autoFocus }
          cacheVisibleValue={ cacheVisibleValue }
          disabled={ disabled }
          name={ name }
          readOnly={ readOnly }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          createText={ createText }
          createIconType={ createIconType }
          suggest={ suggest }
          freetext={ freetext }
          // create={ create }
          path={ path }
          acceptHeader={ acceptHeader }
          rowsPerRequest={ rowsPerRequest }
          getCustomHeaders={ () => true }
          dataRequestTimeout={ dataRequestTimeout }
          withCredentials={ withCredentials }
          options={ options }
          onChange={ onChange }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
