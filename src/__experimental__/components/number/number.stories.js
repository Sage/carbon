import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import {
  boolean,
  number
} from '@storybook/addon-knobs';
import Number from './number.component';
import Textbox from '../textbox';
import getTextboxStoryProps from '../textbox/textbox.stories';
import notes from './documentation/notes.md';
import info from './documentation/info';

const store = new Store(
  {
    value: ''
  }
);

const setValue = (ev) => {
  action('onChange')(ev);
  store.set({ value: ev.target.value });
};

storiesOf('Experimental/Number Input', module)
  .addDecorator(StateDecorator(store))
  .add('default', () => {
    const onChangeDeferredEnabled = boolean('Enable "onChangeDeferred" Action', false);
    const onKeyDownEnabled = boolean('Enable "onKeyDown" Action', false);
    const deferTimeout = onChangeDeferredEnabled ? number('deferTimeout') : undefined;

    return (
      <Number
        { ...getTextboxStoryProps() }
        value={ store.get('value') }
        onChange={ setValue }
        onKeyDown={ onKeyDownEnabled ? action('onKeyDown') : undefined }
        onChangeDeferred={ onChangeDeferredEnabled ? action('onChangeDeferred') : undefined }
        deferTimeout={ deferTimeout }
      />
    );
  }, {
    info: {
      text: info,
      propTables: [Textbox],
      propTablesExclude: [Number, State],
      excludedPropTypes: ['children', 'leftChildren', 'inputIcon']
    },
    notes: { markdown: notes }
  });
