import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import DialogFullScreen from '.';
import Button from '../button';
import Form from '../form';

const store = new Store({
  open: false
});

const handleCancel = () => {
  store.set({ open: false });
  action('cancel')();
};

const handleOpen = () => {
  store.set({ open: true });
  action('open')();
};

const handleClick = (evt) => {
  action('click')(evt);
};

const storyParameters = {
  info: { text: Info },
  notes: { markdown: notes },
  knobs: { escapeHTML: false }
};

storiesOf('Dialog Full Screen', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State]
    }
  })
  .add('default', () => {
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');

    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <State store={ store }>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
            title={ title }
            subtitle={ subtitle }
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
          >
            { children }
          </DialogFullScreen>
        </State>
      </div>
    );
  }, storyParameters)
  .add('with sticky footer', () => {
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');
    const stickyFooter = boolean('stickyFooter', true);
    const formHeight = text('form height', '2000px');

    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <State store={ store }>
          <DialogFullScreen
            open={ store.get('open') }
            onCancel={ handleCancel }
            title={ title }
            subtitle={ subtitle }
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
          >
            <Form stickyFooter={ stickyFooter }>
              { children }
              <div style={ { height: formHeight } } />
            </Form>
          </DialogFullScreen>
        </State>
      </div>
    );
  }, storyParameters);
