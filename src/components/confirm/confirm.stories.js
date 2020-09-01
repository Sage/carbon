import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';
import Button from '../button';
import Confirm from './confirm.component.js';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Confirm.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /confirm\.component(?!spec)/
);

const store = new Store({
  open: false
});
const handleCancel = () => {
  action('cancel')();
  store.set({ open: false });
};
const handleOpen = () => {
  action('open')();
  store.set({ open: true });
};
const handleConfirm = () => {
  action('confirm')();
  store.set({ open: false });
};

function makeStory(name, themeSelector, disableChromatic = true) {
  const component = () => {
    const children = text('children', 'This is an example of a confirm.');
    const title = text('title', 'Are you sure?');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Confirm.defaultProps.ariaRole);
    const height = text('height', '');
    const subtitle = text('subtitle', '');
    const size = select('size', OptionsHelper.sizesFull, Confirm.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Confirm.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Confirm.defaultProps.autoFocus);
    const confirmLabel = text('confirmLabel', '');
    const cancelLabel = text('cancelLabel', '');
    const open = boolean('open', false);
    const destructive = boolean('destructive', false);
    const iconType = select('iconType', ['error', 'warning', null], null);

    return (
      <Confirm
        title={ title }
        enableBackgroundUI={ enableBackgroundUI }
        disableEscKey={ disableEscKey }
        ariaRole={ ariaRole }
        height={ height }
        subtitle={ subtitle }
        size={ size }
        showCloseIcon={ showCloseIcon }
        autoFocus={ autoFocus }
        confirmLabel={ confirmLabel }
        cancelLabel={ cancelLabel }
        onConfirm={ handleConfirm }
        onCancel={ handleCancel }
        open={ open }
        destructive={ destructive }
        iconType={ iconType }
      >
        { children }
      </Confirm>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

function makeButtonStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text('children', 'This is an example of a confirm.');
    const title = text('title', 'Are you sure?');
    const enableBackgroundUI = boolean('enableBackgroundUI', false);
    const disableEscKey = boolean('disableEscKey', false);
    const ariaRole = text('ariaRole', Confirm.defaultProps.ariaRole);
    const height = text('height', '');
    const subtitle = text('subtitle', '');
    const size = select('size', OptionsHelper.sizesFull, Confirm.defaultProps.size);
    const showCloseIcon = boolean('showCloseIcon', Confirm.defaultProps.showCloseIcon);
    const autoFocus = boolean('autoFocus', Confirm.defaultProps.autoFocus);
    const confirmLabel = text('confirmLabel', '');
    const cancelLabel = text('cancelLabel', '');
    const destructive = boolean('destructive', false);
    const iconType = select('iconType', ['error', 'warning', null], null);

    return (
      <State store={ store }>
        <Button key='button' onClick={ handleOpen }>Open Preview</Button>
        <Confirm
          key='confirm'
          title={ title }
          open={ store.get('open') }
          enableBackgroundUI={ enableBackgroundUI }
          disableEscKey={ disableEscKey }
          ariaRole={ ariaRole }
          height={ height }
          subtitle={ subtitle }
          size={ size }
          showCloseIcon={ showCloseIcon }
          autoFocus={ autoFocus }
          confirmLabel={ confirmLabel }
          cancelLabel={ cancelLabel }
          onConfirm={ handleConfirm }
          onCancel={ handleCancel }
          destructive={ destructive }
          iconType={ iconType }
        >
          { children }
        </Confirm>
      </State>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Confirm', module)
  .addParameters({
    info: {
      propTablesExclude: [State, Button],
      text: info
    },
    notes: { markdown: notes }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector))
  .add(...makeButtonStory('with button', dlsThemeSelector));
