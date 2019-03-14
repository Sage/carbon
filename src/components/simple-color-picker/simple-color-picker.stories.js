import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, array
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import SimpleColorPicker from './simple-color-picker';
import notes from './notes.md';

const store = new Store({
  selectedColor: '#00DC00'
});

const onChange = (e) => {
  store.set({
    selectedColor: e.target.value
  });
  action('select')();
};


storiesOf('SimpleColorPicker', module)
  .add('default', () => {
    const name = text('name', '');
    const availableColors = array('availableColors', ['#00DC00', '#255BC7', '#ED1C5F']);

    return (
      <State store={ store }>
        <SimpleColorPicker
          availableColors={ availableColors }
          name={ name }
          onChange={ onChange }

        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
