import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { StateDecorator, Store, State } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import Button from '../button/button';
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

const Wrapper = ({
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
    <Alert
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
    </Alert>
  </>
  );
};

Wrapper.propTypes = { ...Alert.propTypes };
Wrapper.displayName = 'Alert';

storiesOf('Alert', module)
  .addDecorator(StateDecorator(store))
  .addParameters({
    info: {
      propTablesExclude: [State, Wrapper],
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
      <Wrapper
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
      </Wrapper>
    );
  }, {
    notes: { markdown: notes }
  });
