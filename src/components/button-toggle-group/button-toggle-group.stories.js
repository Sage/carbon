import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, number, boolean, select, percentageRange
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import ButtonToggle from '../button-toggle/button-toggle.component';
import ButtonToggleGroup from './button-toggle-group.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

ButtonToggleGroup.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /button-toggle-group\.component(?!spec)/
);

const handleGroupChangeFactory = store => (event) => {
  const { value } = event.target;

  store.set({ value });

  action('onChange')(value);
};
const radioToggleGroupStore = new Store({ value: 'Bar' });

function makeStory(storyName, themeSelector) {
  const component = () => {
    const label = text('label', 'Example ButtonToggleGroup');
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const inputWidth = labelInline ? number('inputWidth', 70, percentageRange) : undefined;
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);

    function renderButtons() {
      const buttonNames = ['Foo', 'Bar', 'Baz'];

      return buttonNames.map((name) => {
        return (
          <ButtonToggle
            name='button-toggle-group'
            id={ name.toLowerCase() }
            key={ name }
            value={ name }
          >
            { name }
          </ButtonToggle>
        );
      });
    }

    return (
      <State store={ radioToggleGroupStore }>
        <ButtonToggleGroup
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          name='button-toggle-group'
          onChange={ handleGroupChangeFactory(radioToggleGroupStore) }
        >
          { renderButtons() }
        </ButtonToggleGroup>
      </State>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes }
  };

  return [storyName, component, metadata];
}

storiesOf('Button Toggle Group', module)
  .addParameters({
    info: {
      propTablesExclude: [ButtonToggle],
      propTables: [ButtonToggleGroup]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
