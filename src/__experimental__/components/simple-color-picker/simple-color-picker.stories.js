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
          name={ name }
          legend={ legend }
          onChange={ onChange }
        >
          {availableColors.map(color => (
            <SimpleColor
              color={ color }
              key={ color }
              aria-label={ color }
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
    notes: { markdown: notes }
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
