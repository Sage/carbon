import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Toast from '.';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { notes, info } from './documentation';
import classic from '../../style/themes/classic';

// This is for storybook example only
const StyledToastStory = styled(Toast)`
  margin-top: 50px;
`;

storiesOf('Toast', module)
  .addParameters({
    knobs: { escapeHTML: false },
    notes: { markdown: notes },
    info: {
      text: info,
      propTablesExclude: [ThemeProvider]
    }
  })
  .add('Classic', () => {
    const variant = select('as', OptionsHelper.colors, OptionsHelper.colors[2]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const open = boolean('open', true);
    const onDismiss = boolean('onDismiss', true);

    const handleChange = () => {
      action('clicked')();
    };

    return (
      <ThemeProvider theme={ classic }>
        <StyledToastStory
          variant={ variant }
          open={ open } onDismiss={ onDismiss ? handleChange : undefined }
        >
          {children}
        </StyledToastStory>
      </ThemeProvider>
    );
  }).add('Default', () => {
    const variant = select('variant', OptionsHelper.toast, OptionsHelper.toast[0]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const open = boolean('open', true);
    const onDismiss = boolean('onDismiss', true);
    const onDismissClick = onDismiss ? (evt) => { action('click')(evt); } : undefined;

    return (
      <StyledToastStory
        variant={ variant }
        open={ open } onDismiss={ onDismissClick }
      >
        {children}
      </StyledToastStory>
    );
  });
