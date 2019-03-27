import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Dialog from './dialog';
import Button from '../button/button';
import DialogStyledComponents from './dialog.component';

const store = new Store({
  open: false
});

const handleCancel = (evt) => {
  store.set({ open: false });
  action('cancel')(evt);
};

const handleOpen = (evt) => {
  store.set({ open: true });
  action('open')(evt);
};

const handleClick = (evt) => {
  action('click')(evt);
};

storiesOf('Dialog', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State]
    }
  })
  .add('styled component', () => {
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesRestricted, Dialog.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Dialog.defaultProps.autoFocus);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Dialog.defaultProps.ariaRole);

    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <State store={ store }>
          <DialogStyledComponents
            open={ store.get('open') }
            onCancel={ handleCancel }
            height={ height }
            title={ title }
            subtitle={ subtitle }
            size={ size }
            showCloseIcon={ showCloseIcon }
            autoFocus={ autoFocus }
            stickyFormFooter={ stickyFormFooter }
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
          />
        </State>
      </div>
    );
  })
  .add('default', () => {
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesRestricted, Dialog.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Dialog.defaultProps.autoFocus);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Dialog.defaultProps.ariaRole);

    return (
      <div>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <State store={ store }>
          <Dialog
            open={ store.get('open') }
            onCancel={ handleCancel }
            height={ height }
            title={ title }
            subtitle={ subtitle }
            size={ size }
            showCloseIcon={ showCloseIcon }
            autoFocus={ autoFocus }
            stickyFormFooter={ stickyFormFooter }
            enableBackgroundUI={ enableBackgroundUI }
            disableEscKey={ disableEscKey }
            ariaRole={ ariaRole }
            onClick={ handleClick }
          />
        </State>
      </div>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
