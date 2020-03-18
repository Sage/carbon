import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Sidebar, SidebarHeader } from '.';
import Button from '../button';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';
import docgenInfo from './docgenInfo.json';

Sidebar.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /sidebar\.component(?!spec)/
);

SidebarHeader.__docgenInfo = getDocGenInfo(
  docgenInfo,
  /sidebar-header\.component(?!spec)/
);

const store = new Store({
  open: false
});

const onCancel = () => {
  store.set({ open: false });
  action('cancel')();
};

const openSidebar = () => {
  store.set({ open: true });
};

function makeStory(name, themeSelector) {
  const component = () => {
    const enableBackgroundUI = boolean('enableBackgroundUI', Sidebar.defaultProps.enableBackgroundUI);
    const position = select('position', OptionsHelper.alignBinary, Sidebar.defaultProps.position);
    const size = select('size', OptionsHelper.sizesFull, Sidebar.defaultProps.size);
    const open = boolean('open', Sidebar.defaultProps.open);

    return (
      <Sidebar
        enableBackgroundUI={ enableBackgroundUI } open={ open }
        position={ position } size={ size }
        onCancel={ onCancel }
      >
        <SidebarHeader>Header Content</SidebarHeader>
        Main Content
      </Sidebar>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

function makeButtonStory(name, themeSelector) {
  const component = () => {
    const enableBackgroundUI = boolean('enableBackgroundUI', Sidebar.defaultProps.enableBackgroundUI);
    const position = select('position', OptionsHelper.alignBinary, Sidebar.defaultProps.position);
    const size = select('size', OptionsHelper.sizesFull, Sidebar.defaultProps.size);

    return (
      <State store={ store }>
        <Button onClick={ openSidebar }>Open sidebar</Button>
        <Sidebar
          enableBackgroundUI={ enableBackgroundUI }
          open={ store.get('open') }
          position={ position }
          size={ size }
          onCancel={ onCancel }
        >
          <SidebarHeader>Header Content</SidebarHeader>
          <div>
            <Button as='primary'>Test</Button>
            <Button as='secondary'>Last</Button>
          </div>
          Main Content

        </Sidebar>
      </State>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Sidebar', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State],
      text: info
    },
    notes: {
      markdown: notes
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector))
  .add(...makeButtonStory('with button', dlsThemeSelector))
  .add(...makeButtonStory('with button classic', classicThemeSelector));
