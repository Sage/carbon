import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import notes from './notes.md';
import { State, Store } from '@sambego/storybook-state';
import Dialog from './dialog-full-screen';
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
  .add('default', () => {
    const open = boolean('open', store.open);
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');

    return (
      <Dialog 
        open={open}
        onCancel={ handleCancel }
        title={title}
        subtitle={subtitle}
        children={children}
        enableBackgroundUI={enableBackgroundUI}
        disableEscKey={disableEscKey}
        ariaRole={ariaRole}
        onClick={ action('click') }
      />
    );
  }, {
    notes: { markdown: notes }
  })
  .add('withButton', () => {
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const children = text('children', 'Text Content');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');

    return (
      <State store={ store }>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <Dialog 
          open={ store.get('open') }
          onCancel={ handleCancel }
          title={title}
          subtitle={subtitle}
          children={children}
          enableBackgroundUI={enableBackgroundUI}
          disableEscKey={disableEscKey}
          ariaRole={ariaRole}
          onClick={ action('click') }
        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
