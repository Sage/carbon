import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Portrait from './portrait.component';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Portrait.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /portrait\.component(?!spec)/
);

function commonKnobs() {
  const source = select('source', ['src', 'gravatar'], 'src');

  return ({
    alt: text('alt', Portrait.defaultProps.alt),
    darkBackground: boolean('darkBackground', Portrait.defaultProps.darkBackground),
    gravatar: source === 'gravatar' ? text('gravatar') : undefined,
    src: source === 'src' ? text('src') : undefined,
    initials: text('initials', 'AZ')
  });
}


function dlsKnobs() {
  return {
    size: select('size', OptionsHelper.sizesPortrait, 'M'),
    shape: select('shape', OptionsHelper.shapesPortrait, 'square')
  };
}

storiesOf('Portrait', module)
  .add('default', () => (
    <Portrait
      { ...commonKnobs() }
      { ...dlsKnobs() }
    />
  ),
  {
    themeSelector: dlsThemeSelector,
    info: { text: info, propTablesExclude: [ThemeProvider] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
