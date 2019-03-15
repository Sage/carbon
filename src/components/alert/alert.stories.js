import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, select, button
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import Modal from '../modal';
import Alert from './alert';
import { info, notes } from './documentation';

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
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    button('open', handleOpen);
    const title = text('title', 'Attention');
    const subtitle = text('subtitle', '');
    const children = text('children', 'This is an example of an alert.');
    const autoFocus = boolean('autoFocus', Alert.defaultProps.autoFocus);
    const enableBackgroundUI = boolean('enableBackgroundUI', Modal.defaultProps.enableBackgroundUI);
    const disableEscKey = boolean('disableEscKey', Modal.defaultProps.disableEscKey);
    const ariaRole = text('ariaRole', Alert.defaultProps.role);
    const height = text('height', '');
    const showCloseIcon = boolean('showCloseIcon', Alert.defaultProps.showCloseIcon);
    const size = select('size', OptionsHelper.sizesFull, Alert.defaultProps.size);

    return (
      <State store={ store }>
        <Alert
          onCancel={ handleCancel }
          autoFocus={ autoFocus }
          title={ title }
          enableBackgroundUI={ enableBackgroundUI }
          disableEscKey={ disableEscKey }
          ariaRole={ ariaRole }
          height={ height }
          showCloseIcon={ showCloseIcon }
          size={ size }
          subtitle={ subtitle }
          open={ store.get('open') }
        >
          {children}
        </Alert>
      </State>
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  });
