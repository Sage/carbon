import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text, boolean, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Confirm from './confirm.js';

storiesOf('Confirm', module)
  .add('default', () => {
    const children = text('children', 'This is an example of a confirm.');
    const title = text('title', 'Are you sure?');
    const open = boolean('open', true);
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', 'dialog');
    const height = text('height', '');
    const subtitle = text('subtitle', '');
    const size = select('size', OptionsHelper.sizesFull);
    const showCloseIcon = boolean('showCloseIcon', false);
    const autoFocus = boolean('autoFocus', true);
    const stickyFormFooter = boolean('stickyFormFooter', false);
    const confirmLabel = text('confirmLabel', '');
    const cancelLabel = text('cancelLabel', '');

    return (
      <Confirm
        title={ title }
        open={ open }
        enableBackgroundUI={ enableBackgroundUI }
        disableEscKey={ disableEscKey }
        ariaRole={ ariaRole }
        height={ height }
        subtitle={ subtitle }
        size={ size }
        showCloseIcon={ showCloseIcon }
        autoFocus={ autoFocus }
        stickyFormFooter={ stickyFormFooter }
        confirmLabel={ confirmLabel }
        cancelLabel={ cancelLabel }
        onConfirm={ action('confirm') }
        onCancel={ action('cancel') }
      >
        { children }
      </Confirm>
    );
  }, {
    notes: { markdown: notes }
  });
