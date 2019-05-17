import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Toast from '.';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { notes, info } from './documentation';
import classic from '../../style/themes/classic';

storiesOf('Toast', module)
  .addParameters({
    knobs: { escapeHTML: false },
    notes: { markdown: notes },
    info: { text: info }
  })
  .add('Classic', () => {
    const variant = select('as', OptionsHelper.colors, OptionsHelper.colors[2]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const open = boolean('open', true);
    const onDismiss = boolean('onDismiss', false);

    const handleChange = () => {
      action('clicked')();
    };

    return (
      <ThemeProvider theme={ classic }>
        <Toast
          variant={ variant }
          open={ open } onDismiss={ onDismiss ? handleChange : undefined }
        >
          {children}
        </Toast>
      </ThemeProvider>
    );
  }).add('Default', () => {
    const variant = select('variant', OptionsHelper.toast, OptionsHelper.toast[0]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const open = boolean('open', true);
    const onDismiss = boolean('onDismiss', false);

    const handleChange = () => {
      action('clicked')();
    };

    return (
      <Toast
        variant={ variant }
        open={ open } onDismiss={ onDismiss ? handleChange : undefined }
      >
        {children}
      </Toast>
    );
  });
