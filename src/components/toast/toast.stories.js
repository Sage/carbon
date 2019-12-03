import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import Toast from '.';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { notes, info } from './documentation';
import classic from '../../style/themes/classic';
import getDocGenInfo from '../../utils/helpers/docgen-info';

// This is for storybook example only
const StyledToastStory = styled(Toast)`
  margin-top: 50px;
`;

StyledToastStory.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /toast\.component(?!spec)/
);

storiesOf('Toast', module)
  .addParameters({
    knobs: { escapeHTML: false },
    notes: { markdown: notes },
    info: {
      text: info,
      propTables: [StyledToastStory],
      propTablesExclude: [ThemeProvider, StyledToastStory]
    }
  })
  .add('classic', () => {
    const variant = select('as', OptionsHelper.colors, OptionsHelper.colors[2]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const id = text('id', 'classic-toast');
    const open = boolean('open', true);
    const onDismiss = boolean('onDismiss', true);

    const handleChange = () => {
      action('clicked')();
    };

    return (
      <ThemeProvider theme={ classic }>
        <StyledToastStory
          variant={ variant }
          id={ id }
          open={ open }
          onDismiss={ onDismiss ? handleChange : undefined }
        >
          {children}
        </StyledToastStory>
      </ThemeProvider>
    );
  }, {
    themeSelector: classicThemeSelector
  }).add('default', () => {
    const variant = select('variant', OptionsHelper.toast, OptionsHelper.toast[0]);
    const children = text('children', 'Talkie\'s the name, toasting\'s the game. Anyone like any toast?');
    const open = boolean('open', true);
    const id = text('id', 'default-toast');
    const onDismiss = boolean('onDismiss', true);
    const onDismissClick = onDismiss ? (evt) => { action('click')(evt); } : undefined;

    return (
      <StyledToastStory
        variant={ variant }
        id={ id }
        open={ open }
        onDismiss={ onDismissClick }
      >
        {children}
      </StyledToastStory>

    );
  }, {
    themeSelector: dlsThemeSelector
  });
