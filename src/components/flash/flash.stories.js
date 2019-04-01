import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  number,
  select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Flash from './flash';
import Button from '../button';

const store = new Store({
  open: false
});

const dismissHandler = () => {
  store.set({ open: false });
  action('cancel')();
};

const openHandler = () => {
  store.set({ open: true });
  action('open')();
};

storiesOf('Flash', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State]
    }
  })
  .add('default', () => {
    const as = select('as', OptionsHelper.colors);
    const message = text('message', 'This is a flash message');
    const timeout = number('timeout', 0);

    return (
      <div>
        <Button onClick={ openHandler }>Open Flash</Button>
        <State store={ store }>
          <Flash
            open={ store.get('open') }
            as={ as }
            message={ message }
            timeout={ timeout >= 0 ? timeout : undefined }
            onDismiss={ dismissHandler }
          />
        </State>
      </div>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
