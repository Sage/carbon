import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import OptionsHelper from '../../utils/helpers/options-helper';
import Portrait from './portrait.component';
import { notes, info } from './documentation';
import classic from '../../style/themes/classic';

function commonKnobs() {
  const source = select('source', ['src', 'gravatar'], 'src');

  return ({
    alt: text('alt', Portrait.defaultProps.alt),
    darkBackground: boolean('darkBackground', Portrait.defaultProps.darkBackground),
    gravatar: source === 'gravatar' ? text('gravatar') : undefined,
    src: source === 'src' ? text('src') : undefined,
    initials: text('initials', 'AZ'),
    size: select('size', OptionsHelper.sizesFull, Portrait.defaultProps.size)
  });
}

function classicKnobs() {
  return {
    shape: select('shape', OptionsHelper.shapesVaried, 'standard')
  };
}

function dlsKnobs() {
  return {
    shape: select('shape', OptionsHelper.shapesPortrait, 'square')
  };
}

storiesOf('Portrait', module)
  .add('classic', () => (
    <ThemeProvider theme={ classic }>
      <Portrait
        { ...commonKnobs() }
        { ...classicKnobs() }
      />
    </ThemeProvider>
  ),
  {
    info: { text: info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add('default', () => (
    <Portrait
      { ...commonKnobs() }
      { ...dlsKnobs() }
    />
  ),
  {
    info: { text: info },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
