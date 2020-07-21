import React from 'react';
import {
  select,
  withKnobs
} from '@storybook/addon-knobs';
import { Tabs, Tab } from './tabs.component';

export default {
  title: 'Design System/Tabs/Test',
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true
    }
  }
};

export const Basic = () => {
  return (
    <Tabs
      align={ select('align', ['left', 'right'], 'left') }
      position={ select('position', ['top', 'left'], 'top') }
    >
      <Tab
        tabId='tab-1' title='Tab 1'
        key='tab-1'
      >
        Content for tab 1
      </Tab>
      <Tab
        tabId='tab-2' title='Tab 2'
        key='tab-2'
      >
        Content for tab 2
      </Tab>
      <Tab
        tabId='tab-3' title='Tab 3'
        key='tab-3'
      >
        Content for tab 3
      </Tab>
      <Tab
        tabId='tab-4' title='Tab 4'
        key='tab-4'
      >
        Content for tab 4
      </Tab>
      <Tab
        tabId='tab-5' title='Tab 5'
        key='tab-5'
      >
        Content for tab 5
      </Tab>
    </Tabs>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: false
    }
  }
};
