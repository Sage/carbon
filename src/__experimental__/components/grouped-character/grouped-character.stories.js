import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';
import { text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GroupedCharacter from './grouped-character.component';
import getCommonTextboxStoryProps from '../textbox/textbox.stories';
import { OriginalTextbox } from '../textbox';
import { info } from './documentation';

const groupedCharacterStore = new Store({
  value: ''
});

const onChange = (ev) => {
  groupedCharacterStore.set({ value: ev.target.value });
  action('change')(ev);
};

storiesOf('Experimental/GroupedCharacter', module)
  .addParameters({
    info: { text: info, propTables: [OriginalTextbox], propTablesExclude: [State] },
    knobs: { escapeHTML: false }
  })
  .add('default',
    () => {
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
    });
