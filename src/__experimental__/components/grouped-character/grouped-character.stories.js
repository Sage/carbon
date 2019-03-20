import React from 'react';
import { storiesOf } from '@storybook/react';
import { Store, State } from '@sambego/storybook-state';
import { text } from '@storybook/addon-knobs';
import GroupedCharacter from '.';

const groupedCharacterStore = new Store({
  value: ''
});

storiesOf('Experimental/GroupedCharacter', module)
  .add('Basic', () => {
    return (
      <State store={ groupedCharacterStore }>
        <GroupedCharacter
          groups={[2,2,4]}
          inputWidth={'10px'}
          separator={text('separator', '-')}
          value={groupedCharacterStore.get('value')}
          onChange={(ev) => { groupedCharacterStore.set({ value: ev.target.value }); }}
        />
      </State>
    );
  })