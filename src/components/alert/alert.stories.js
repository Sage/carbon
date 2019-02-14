import React from 'react';
import { storiesOf } from '@storybook/react';
import { assign } from 'lodash';
import { boolean, text, select } from '@storybook/addon-knobs';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button/button';
import AlertBase from './alert';
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

const Alert = ({
  onCancel,
  title,
  enableBackgroundUI,
  disableEscKey,
  ariaRole,
  height,
  showCloseIcon,
  size,
  stickyFormFooter,
  subtitle,
  open,
  children
}) => {
  const knobsOpen = boolean('open', store.get('open'));

  if (knobsOpen !== open) {
    store.set({ open: knobsOpen });
  }

  return (
  <>
    <Button onClick={ handleOpen }>Open Preview</Button>
    <AlertBase
      onCancel={ onCancel }
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
    </AlertBase>
  </>
  );
};

Alert.propTypes = assign({}, AlertBase.propTypes);

storiesOf('Alert', module)
  .addDecorator(StateDecorator(store))
  .addParameters({
    info: {
      propTablesExclude: [State],
      propTables: [Alert]
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
      <Alert
        onCancel={ handleCancel } title={ title }
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
    );
  }, {
    notes: { markdown: notes }
  });
