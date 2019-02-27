import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Dialog from './dialog';
import Button from '../button/button';

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

storiesOf('Dialog', module)
  .add('default', () => {
    const open = boolean('open', store.get('open'));
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);
    const showCloseIcon = boolean('showCloseIcon', Dialog.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Dialog.defaultProps.autoFocus);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Dialog.defaultProps.ariaRole);

    return (
      <Dialog
        open={ open }
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
        onClick={ action('click') }
      />
    );
  }, {
    notes: { markdown: notes }
  })
  .add('withButton', () => {
    const open = boolean('open', store.get('open'));
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);
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
            open={ open }
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
            onClick={ action('click') }
          />
        </State>
      </div>
    );
  }, {
    notes: { markdown: notes }
  });
