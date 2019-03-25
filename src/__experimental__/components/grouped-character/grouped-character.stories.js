import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';
import { text, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import GroupedCharacter from './grouped-character.component';

const groupedCharacterStore = new Store({
  value: ''
});

storiesOf('Experimental/GroupedCharacter', module)
  .addParameters({
    info: { propTablesExclude: [State] }
  })
  .add('Basic',
    () => {
      return (
        <State store={ groupedCharacterStore }>
          <GroupedCharacter
            groups={ object('groups', [2, 2, 4]) }
            separator={ text('separator', '-') }
            value={ groupedCharacterStore.get('value') }
            onChange={ (ev) => { groupedCharacterStore.set({ value: ev.target.value }); } }
          />
        </State>
      );
    });
