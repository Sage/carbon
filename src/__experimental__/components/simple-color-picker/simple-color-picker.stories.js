import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import { SimpleColorPicker, SimpleColor } from '.';
import { notes, info } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

SimpleColorPicker.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /simple-color-picker\.component(?!spec)/
);

const store = new Store({
  selectedColor: null
});

const onChange = (e) => {
  const { value } = e.target;
  store.set({
    selectedColor: value
  });
  action(`Selected - ${value}`)(e);
};

function makeStory(storyName, themeSelector) {
  const component = () => {
    const name = text('name', 'basicPicker');
    const legend = text('legend', 'Pick a colour');
    const demoColors = [
      { color: '#00A376', label: 'green' },
      { color: '#0073C1', label: 'blue' },
      { color: '#582C83', label: 'purple' },
      { color: '#E96400', label: 'orange' },
      { color: '#99ADB6', label: 'gray' },
      { color: '#C7384F', label: 'flush mahogany' },
      { color: '#004500', label: 'dark green' },
      { color: '#FFB500', label: 'yellow' },
      { color: '#335C6D', label: 'dark blue' },
      { color: '#00DC00', label: 'light blue' }
    ];
    const availableColors = array('availableColors', demoColors, '/');

    return (
      <State store={ store }>
        <SimpleColorPicker
          name={ name }
          legend={ legend }
          onChange={ onChange }
          onBlur={ ev => action('Blur')(ev) }
        >
          {availableColors.map(({ color, label }) => (
            <SimpleColor
              value={ color }
              key={ color }
              aria-label={ label }
              id={ color }
              defaultChecked={ color === '#582C83' }
            />
          ))}
        </SimpleColorPicker>
      </State>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [storyName, component, metadata];
}

storiesOf('Experimental/Simple Color Picker', module)
  .addParameters({
    info: {
      propTablesExclude: [State],
      text: info
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
