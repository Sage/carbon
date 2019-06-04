import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  number,
  select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { ThemeProvider } from 'styled-components';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation/notes.md';
import Info from './documentation/Info';
import Flash from './flash.component';
import Button from '../button';
import classicTheme from '../../style/themes/classic';

const store = new Store({
  open: false
});

const handleClick = () => {
  store.set({ open: false });
  action('cancel')();
};

const openHandler = () => {
  store.set({ open: true });
  action('open')();
};

const message = text('message', 'This is a flash message');
const timeout = number('timeout', 0);
const dismissClick = timeout > 0 ? false : handleClick;
const { colors, toast } = OptionsHelper;
const as = isClassic => (isClassic ? select('as', colors, colors[0]) : select('as', toast, toast[0]));

storiesOf('Flash', module)
  .addParameters({
    info: {
      propTablesExclude: [Button, State]
    }
  }).add('classic', () => {
    return (
      <ThemeProvider theme={ classicTheme }>
        <>
          <Button onClick={ openHandler }>Open Flash</Button>
          <State store={ store }>
            <Flash
              open={ store.get('open') }
              as={ as() }
              message={ message }
              timeout={ timeout >= 0 ? timeout : undefined }
              onDismiss={ dismissClick }
            />
          </State>
        </>
      </ThemeProvider>
    );
  })
  .add('default', () => {
    return (
      <div>
        <Button onClick={ openHandler }>Open Flash</Button>
        <State store={ store }>
          <Flash
            open={ store.get('open') }
            as={ as(false) }
            message={ message }
            timeout={ timeout >= 0 ? timeout : undefined }
            onDismiss={ dismissClick }
          />
        </State>
      </div>
    );
  }, {
    info: { text: Info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
