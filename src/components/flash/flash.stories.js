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
import Flash, { FlashWithoutHOC } from './flash.component';
import Button, { OriginalButton } from '../button/button.component';
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

storiesOf('Flash', module)
  .addParameters({
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    info: {
      text: Info,
      propTables: [FlashWithoutHOC],
      propTablesExclude: [OriginalButton, State]
    }
  }).add('classic', () => {
    const message = text('message', 'This is a flash message');
    const timeout = number('timeout', 0);
    const as = select('as', OptionsHelper.colors, OptionsHelper.colors[0]);

    return (
      <ThemeProvider theme={ classicTheme }>
        <>
          <Button onClick={ openHandler }>Open Flash</Button>
          <State store={ store }>
            <Flash
              open={ store.get('open') }
              as={ as }
              message={ message }
              timeout={ timeout >= 0 ? timeout : undefined }
              onDismiss={ handleClick }
            />
          </State>
        </>
      </ThemeProvider>
    );
  })
  .add('default', () => {
    const message = text('message', 'This is a flash message');
    const timeout = number('timeout', 0);
    const as = select('as', OptionsHelper.toast, OptionsHelper.toast[0]);

    return (
      <div>
        <Button onClick={ openHandler }>Open Flash</Button>
        <State store={ store }>
          <Flash
            open={ store.get('open') }
            as={ as }
            message={ message }
            timeout={ timeout >= 0 ? timeout : undefined }
            onDismiss={ handleClick }
          />
        </State>
      </div>
    );
  });
