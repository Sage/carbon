import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button';
import Alert from './alert';
import notes from './notes.md';

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

storiesOf('Alert', module)
  .add('default', () => {
    const title = text('title', 'Attention');
    const subtitle = text('subtitle', '');
    const children = text('children', 'This is an example of a alert.');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');
    const height = text('height', '');
    const showCloseIcon = boolean('showCloseIcon', true);
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[0]);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const open = boolean('open', false);

    return (
      <Alert
        onCancel={ handleCancel }
        title={ title }
        enableBackgroundUI={ enableBackgroundUI }
        disableEscKey={ disableEscKey }
        ariaRole={ ariaRole }
        height={ height }
        showCloseIcon={ showCloseIcon }
        size={ size }
        stickyFormFooter={ stickyFormFooter }
        subtitle={ subtitle }
        open={ open }
      >
        {children}
      </Alert>
    );
  }, {
    notes: { markdown: notes }
  })
  .add('with button', () => {
    const title = text('title', 'Attention');
    const subtitle = text('subtitle', '');
    const children = text('children', 'This is an example of a alert.');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');
    const height = text('height', '');
    const showCloseIcon = boolean('showCloseIcon', true);
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[0]);
    const stickyFormFooter = boolean('stickyFormFooter', false);

    return (
      <State store={ store }>
        <Button key='button' onClick={ handleOpen }>Open Preview</Button>
        <Alert
          key='alert'
          onCancel={ handleCancel }
          title={ title }
          enableBackgroundUI={ enableBackgroundUI }
          disableEscKey={ disableEscKey }
          ariaRole={ ariaRole }
          height={ height }
          showCloseIcon={ showCloseIcon }
          size={ size }
          stickyFormFooter={ stickyFormFooter }
          subtitle={ subtitle }
          open={ store.get('open') }
        >
          {children}
        </Alert>
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
