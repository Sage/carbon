import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Tab, Tabs } from './tabs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';

storiesOf('Tabs', module).add(
  'default',
  () => {
    const selectOption = ['top', 'left'];
    const align = select('align', OptionsHelper.alignBinary, Tabs.defaultProps.align);
    const position = select('position', selectOption, Tabs.defaultProps.position);

    return (
      <Tabs align={ align } position={ position }>
        <Tab tabId='tab-1' title='Tab 1'>
          Content for tab 1
        </Tab>
        <Tab tabId='tab-2' title='Tab 2'>
          Content for tab 2
        </Tab>
      </Tabs>
    );
  },
  { notes: { markdown: notes } }
);
