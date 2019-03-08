import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Sidebar, SidebarHeader } from './sidebar';
import Button from '../button';
import notes from './notes.md';

const store = new Store({
  open: false
});

const onCancel = () => {
  store.set({ open: false });
  action('cancel')();
};

const openSidebar = () => {
  store.set({ open: true });
  action('open')();
};


storiesOf('Sidebar', module)
  .add('default', () => {
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const position = select('position', OptionsHelper.alignBinary[0]);
    const size = select('size', OptionsHelper.sizesFull[3]);
    const className = text('className', '');

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
          <SidebarHeader className={ className }>
            Header Content
          </SidebarHeader>
        Main Content
        </Sidebar>
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
