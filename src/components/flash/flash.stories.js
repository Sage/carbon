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
import notes from './notes.md';
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
            timeout={ timeout }
            onDismiss={ dismissHandler }
          />
        </State>
      </div>
    );
  }, {
    info: `
      A Flash widget.

      The flash is rendered in two sections: a ventral message 'flash', and a dorsal coloured, expanding 'slider'.

      ## How to use an Flash in a component:

      In your file

      ~~~js
      import Flash from 'carbon-react/lib/components/flash';
      ~~~

      To render a Flash, setup open and cancel handlers in your view to trigger
      the message on and off:

      ~~~js
      <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' />
      ~~~

      By default, the flash renders with a clickable close icon that hooks up with the onDismiss unction.

      To instead have the flash disappear after a given time period, pass a prop of timeout in illiseconds.

      ~~~js
      <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' timeout={ 2000 }/>
      ~~~

      The flash message can be formatted in the following ways:

      - A string: "Alert"
      - An array: ["Message One", "Message Two"]
      - An object with description: { description: "My description" }
      - An object of key/value pairs: { first_name: "is required", last_name: "is required" }
      - An object with description with nested key/value pairs: { description: { first_name: "is required", last_name: "is required" } }

      If a message is too long, it can be proxied to a dialog by adding "more" in your description.

      ~~~js
      let message = "This is too long ::more:: This sentence is proxied to a dialog."
      ~~~
    `
  }, {
    notes: { markdown: notes }
  });
