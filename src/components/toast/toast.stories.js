import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Toast from '.';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import notes from './documentation';

storiesOf('Toast', module)
  .addParameters({
    knobs: { escapeHTML: false },
    notes: { markdown: notes }
  })
  .add('Classic', () => {
    const as = select('as', OptionsHelper.colors, OptionsHelper.colors[2]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const open = boolean('open', true);
    const onDismiss = boolean('onDismiss', false);

    const handleChange = () => {
      action('clicked')();
    };

    return (
      <Toast
        as={ as }
        open={ open } onDismiss={ onDismiss ? handleChange : undefined }
      >
        {children}
      </Toast>
    );
  });
