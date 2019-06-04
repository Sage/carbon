import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import Message from './message.component';

storiesOf('Message', module).add(
  'default',
  () => {
    const variant = select('type', OptionsHelper.messages, Message.defaultProps.variant);
    const open = boolean('open', Message.defaultProps.open);
    const title = text('title');
    const transparent = boolean('transparent', Message.defaultProps.transparent);
    const children = text('children', 'This is some information from the Message Component.');

    // Allows onDismiss knob to be a boolean, but pass a function to component
    const onDismiss = boolean('onDismiss', true);
    const testOnDismiss = onDismiss ? (evt) => { action('click')(evt); } : undefined;

    return (
      <Message
        variant={ variant } open={ open }
        title={ title } transparent={ transparent }
        onDismiss={ testOnDismiss }
      >
        {children}
      </Message>
    );
  },
  {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  }
);
