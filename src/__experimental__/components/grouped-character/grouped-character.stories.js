import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';
import { text, object } from '@storybook/addon-knobs';
import GroupedCharacter from './grouped-character.component';
import getCommonTextboxStoryProps from '../textbox/textbox.stories';
import { OriginalTextbox } from '../textbox';

const groupedCharacterStore = new Store({
  value: ''
});

const onChange = (ev) => { groupedCharacterStore.set({ value: ev.target.value }); };

storiesOf('Experimental/GroupedCharacter', module)
  .addParameters({
    info: { propTables: [OriginalTextbox], propTablesExclude: [State] }
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
