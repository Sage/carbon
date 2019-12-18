import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';
import { text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import GroupedCharacter from './grouped-character.component';
import getCommonTextboxStoryProps from '../textbox/textbox.stories';
import { OriginalTextbox } from '../textbox';
import { info } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

GroupedCharacter.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /grouped-character\.component(?!spec)/
);

const groupedCharacterStore = new Store({
  value: ''
});

const onChange = (ev) => {
  groupedCharacterStore.set({ value: ev.target.value.rawValue });
  action('change')(ev);
};

function makeStory(name, themeSelector) {
  const component = () => {
    const groups = object('groups', [2, 2, 4]);
    const separator = text('separator', '-');

    return (
      <State store={ groupedCharacterStore }>
        <GroupedCharacter
          { ...getCommonTextboxStoryProps() }
          groups={ groups }
          separator={ separator }
          value={ groupedCharacterStore.get('value') }
          onChange={ onChange }
        />
      </State>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Experimental/GroupedCharacter', module)
  .addParameters({
    info: { text: info, propTables: [OriginalTextbox], propTablesExclude: [State] },
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
