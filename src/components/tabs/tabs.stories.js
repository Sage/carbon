import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Tab, Tabs } from './tabs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../.storybook/style/storybook-info.styles';

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
    {
      info: {
        text: (
          <div>
            <p>Tabs component</p>

            <StoryHeader> Implementation</StoryHeader>

            <p>Import the component:</p>
            <StoryCode padded>{'import { Tabs, Tab } from "carbon-react/lib/components/tabs"'}</StoryCode>

            <p>To render Tabs component: </p>
            <StoryCodeBlock>
              {'<Tabs>'}
              {'  <Tab title="Title 1" tabId="uniqueId1">'}

              {'    <Textbox />'}
              {'    <Textbox />'}

              {'  </Tab>'}

              {'  <Tab title="Title 2" tabId="uniqueId2">'}

              {'    <Date />'}
              {'  <Textbox />'}

              {'  </Tab>'}
              {'</Tabs>'}
            </StoryCodeBlock>

            <p>
            Optionally, you can pass
              <StoryCode padded>renderHiddenTabs</StoryCode>
            prop to the Tabs.
            </p>
            <p>
            By default this is set to
              <StoryCode padded>true</StoryCode>
            and therefore all tabs will be rendered.
            </p>
            <p>
            The selected tab will have a class of
              <StoryCode padded>selected</StoryCode>
            and all other tabs will have a class of
              <StoryCode padded>hidden</StoryCode>
            which sets their display to
              <StoryCode padded>none</StoryCode>.
            </p>

            <p>
            Setting
              <StoryCode padded>renderHiddenTabs</StoryCode> to false will add a small performance improvement as all
            previously hidden tabs will not be rendered to the page.
            </p>
            <p>
            If you are using the tab component within a form all tabs should be rendered so that form validation can
            work correctly.
            </p>
            <p>
            The tabs widget also allows you to select a tab on page load. By default this is set to the first tab. To
            set a different tab on page load pass a tabId to the selectedTabId prop as shown in the example below.
            </p>
            <p>
          To render a Tabs Widget with Options:
            </p>
            <StoryCodeBlock>
              {'<Tabs renderHiddenTabs={ false } selectedTabId="uniqueId2" >'}
              {'  <Tab title="Title 1" tabId="uniqueId1">'}

              {'    <Textbox />'}
              {'    <Textbox />'}

              {'  </Tab>'}

              {'  <Tab title="Title 2" tabId="uniqueId2">'}

              {'    <Date />'}
              {'    <Textbox />'}

              {'  </Tab>'}
              {'</Tabs>'}
            </StoryCodeBlock>
          </div>
        )
      }
    },
    { notes: { markdown: notes } }
  );
