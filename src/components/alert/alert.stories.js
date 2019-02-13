import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button/button';
import Alert from './alert';
import notes from './notes.md';

const store = new Store({
  open: false
});
const cancelAction = action('cancel');
const openAction = action('open');
const handleCancel = () => {
  store.set({ open: false });
  cancelAction();
};
const handleOpen = () => {
  store.set({ open: true });
  openAction();
};

storiesOf('Alert', module)
  .addParameters({
    info: {
      inline: true,
      header: false,
      propTablesExclude: [React.Fragment, Button, State],
      propTables: [Alert],
      source: false
    }
  })
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

    return (
      <>
        <Button onClick={ handleOpen }>Open Preview</Button>

        <State store={ store }>
          { state => (
            <Alert
              onCancel={ handleCancel } title={ title }
              open={ boolean('open', state.open) }
              enableBackgroundUI={ enableBackgroundUI }
              disableEscKey={ disableEscKey }
              ariaRole={ ariaRole }
              height={ height }
              showCloseIcon={ showCloseIcon }
              size={ size }
              stickyFormFooter={ stickyFormFooter }
              subtitle={ subtitle }
            >
              {children}
            </Alert>
          )}
        </State>
      </>
    );
  }, {
    notes: { markdown: notes }
  });
