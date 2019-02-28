import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import notes from './notes.md';
import DialogFullScreen from './dialog-full-screen';
import Button from '../button';

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
            onClick={ action('click') }
          >
            { children }
          </DialogFullScreen>
        </State>
      </div>
    );
  }, {
    notes: { markdown: notes }
  });
