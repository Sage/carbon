import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import Message from './message';

storiesOf('Message', module)
  .add('default', () => {
    const as = select('as', OptionsHelper.colors, Message.defaultProps.as);
    const border = boolean('border', Message.defaultProps.border);
    const open = boolean('open', Message.defaultProps.open);
    const roundedCorners = boolean('roundedCorners', Message.defaultProps.roundedCorners);
    const title = text('title', '');
    const transparent = boolean('transparent', Message.defaultProps.transparent);
    const children = text('children', 'This is some information from the Message Component.');

    // Allows onDismiss knob to be a boolean, but pass a function to component
    const onDismiss = boolean('onDismiss', true);
    const testOnDismiss = onDismiss ? (evt) => { action('click')(evt); } : undefined;

    return (
      <Message
        as={ as }
        border={ border }
        open={ open }
        roundedCorners={ roundedCorners }
        title={ title }
        transparent={ transparent }
        onDismiss={ testOnDismiss }
      >
        { children }
      </Message>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
