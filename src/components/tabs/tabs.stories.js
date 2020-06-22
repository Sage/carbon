import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { Tab, Tabs } from './tabs.component';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';

Tabs.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /tabs\.component(?!spec)/
);

Tab.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /tab\.component(?!spec)/
);

const store = new Store({
  selectedTabId: 'tab-1'
});

const checkIfSelected = (tabId) => {
  if (tabId === store.get('selectedTabId')) {
    return true;
  }

  return false;
};

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
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
  };

  const metadata = {
    themeSelector,
    info: { text: info },
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Tabs', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
