import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './notes.md';
import AppWrapper from './app-wrapper';
import getDocGenInfo from '../../utils/helpers/docgen-info';

AppWrapper.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /app-wrapper(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text(
      'children',
      'This component will wrap its children within the width constraints of your application.'
    );

    return (
      <AppWrapper>
        {children}
      </AppWrapper>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('App Wrapper', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
