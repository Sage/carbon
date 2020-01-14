import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import {
  boolean,
  number
} from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import Number from './number.component';
import Textbox, { OriginalTextbox } from '../textbox';
import getCommonTextboxStoryProps from '../textbox/textbox.stories';
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

const defaultComponent = () => {
  const onChangeDeferredEnabled = boolean('Enable "onChangeDeferred" Action', false);
  const onKeyDownEnabled = boolean('Enable "onKeyDown" Action', false);
  const deferTimeout = onChangeDeferredEnabled ? number('deferTimeout') : undefined;

  return (
    <Number
      { ...getCommonTextboxStoryProps() }
      value={ store.get('value') }
      onChange={ setValue }
      onKeyDown={ onKeyDownEnabled ? action('onKeyDown') : undefined }
      onChangeDeferred={ onChangeDeferredEnabled ? action('onChangeDeferred') : undefined }
      deferTimeout={ deferTimeout }
    />
  );
};

const autoFocusComponent = () => {
  boolean('autoFocus', true);
  return defaultComponent();
};

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextbox],
      propTablesExclude: [Number, State, Textbox],
      excludedPropTypes: ['children', 'leftChildren', 'inputIcon']
    },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Number Input', module)
  .addDecorator(StateDecorator(store))
  .add(...makeStory('default', dlsThemeSelector, defaultComponent))
  .add(...makeStory('classic', classicThemeSelector, defaultComponent))
  .add(...makeStory('autoFocus', dlsThemeSelector, autoFocusComponent));
