import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import { State, Store } from '@sambego/storybook-state';
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
    const open = boolean('open', false);
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);
    const showCloseIcon = boolean('showCloseIcon', false);
    const autoFocus = boolean('autoFocus', false);
    const stickyFormFooter = boolean('stickyFormFooter', false);

    return (
      <Dialog 
        open={open}
        onCancel={ handleCancel }
        height={height}
        title={title}
        subtitle={subtitle}
        size={size}
        showCloseIcon={showCloseIcon}
        autoFocus={autoFocus}
        stickyFormFooter={stickyFormFooter}
        onClick={ action('click') }
      />
    );
  }, {
    notes: { markdown: notes }
  })
  .add('withButton', () => {
    const height = text('height', '400');
    const title = text('title', 'Example Dialog');
    const subtitle = text('subtitle', 'Example Subtitle');
    const size = select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]);
    const showCloseIcon = boolean('showCloseIcon', false);
    const autoFocus = boolean('autoFocus', false);
    const stickyFormFooter = boolean('stickyFormFooter', false);

    return (
      <State store={ store }>
        <Button onClick={ handleOpen }>Open Preview</Button>
        <Dialog 
          open={ store.get('open') }
          onCancel={ handleCancel }
          height={height}
          title={title}
          subtitle={subtitle}
          size={size}
          showCloseIcon={showCloseIcon}
          autoFocus={autoFocus}
          stickyFormFooter={stickyFormFooter}
          onClick={ action('click') }
        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  });
