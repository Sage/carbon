import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import {
  boolean,
  number,
  text
} from '@storybook/addon-knobs';
import DateInput from './date.component';
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

storiesOf('Experimental/Date Input', module)
  .addDecorator(StateDecorator(store))
  .add('default', () => {
    const autoFocus = boolean('autoFocus', true);
    const minDate = text('minDate', '');
    const maxDate = text('maxDate', '');
    const onChangeDeferredEnabled = boolean('Enable "onChangeDeferred" Action', false);
    const onKeyDownEnabled = boolean('Enable "onKeyDown" Action', false);
    const deferTimeout = onChangeDeferredEnabled ? number('deferTimeout') : undefined;

    return (
      <DateInput
        { ...getFilteredTextboxStoryProps() }
        autoFocus={ autoFocus }
        minDate={ minDate }
        maxDate={ maxDate }
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
      excludedPropTypes: ['children', 'leftChildren', 'inputIcon', 'placeholder', 'inputWidth']
    },
    notes: { markdown: notes }
  });

function getFilteredTextboxStoryProps() {
  const textboxProps = getTextboxStoryProps();
  const { inputWidth, placeholder, ...filteredTextboxProps } = textboxProps;

  return filteredTextboxProps;
}
