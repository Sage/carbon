import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import SimpleColorPicker from '.';
import { notes, info } from './documentation';

const store = new Store({
  selectedColor: null
});

const onChange = (e) => {
  store.set({
    selectedColor: e.target.value
  });
  action('select')();
};

storiesOf('Experimental/Simple Color Picker', module)
  .addParameters({
    info: {
      propTablesExclude: [State],
      text: info
    }
  })

  .add(
    'default',
    () => {
      const name = text('name', 'basicPicker');
      const demoColors = [
        '#00A376',
        '#0073C1',
        '#582C83',
        '#E96400',
        '#99ADB6',
        '#C7384F',
        '#004500',
        '#FFB500',
        '#335C6D',
        '#00DC00'
      ];
      const availableColors = array('availableColors', demoColors, '/');

      return (
        <State store={ store }>
          <SimpleColorPicker
            availableColors={ availableColors }
            name={ name }
            onChange={ onChange }
          />
        </State>
      );
    },
    {
      notes: { markdown: notes }
    }
  );
