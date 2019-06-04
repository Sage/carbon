import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { Tab, Tabs } from './tabs.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';

const store = new Store({
  selectedTabId: 'tab-1'
});

const checkIfSelected = (tabId) => {
  if (tabId === store.get('selectedTabId')) {
    return true;
  }

  return false;
};

storiesOf('Tabs', module)
  .addParameters({
    info: {
      propTablesExclude: []
    }
  })
  .add(
    'default',
    () => {
      const selectOption = ['top', 'left'];
      const align = select('align', OptionsHelper.alignBinary, Tabs.defaultProps.align);
      const position = select('position', selectOption, Tabs.defaultProps.position);

      return (
        <State store={ store }>
          <Tabs align={ align } position={ position }>
            <Tab
              tabId='tab-1' title='Tab 1'
              key='tab-1' isTabSelected={ checkIfSelected('tab-1') }
            >
              Content for tab 1
            </Tab>
            <Tab
              tabId='tab-2' title='Tab 2'
              key='tab-2' isTabSelected={ checkIfSelected('tab-2') }
            >
              Content for tab 2
            </Tab>
            <Tab
              tabId='tab-3' title='Tab 3'
              key='tab-3' isTabSelected={ checkIfSelected('tab-3') }
            >
              Content for tab 3
            </Tab>
            <Tab
              tabId='tab-4' title='Tab 4'
              key='tab-4' isTabSelected={ checkIfSelected('tab-4') }
            >
              Content for tab 4
            </Tab>
            <Tab
              tabId='tab-5' title='Tab 5'
              key='tab-5' isTabSelected={ checkIfSelected('tab-5') }
            >
              Content for tab 5
            </Tab>
          </Tabs>
        </State>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    }
  );
