import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import NavigationBar from './navigation-bar';
import notes from './notes.md';
import './navigation-bar.stories.scss';
import getDocGenInfo from '../../utils/helpers/docgen-info';

NavigationBar.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /navigation-bar\.js(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const children = text('children', '');
    const as = select(
      'as',
      ['primary', 'secondary', 'transparent'],
      NavigationBar.defaultProps.as
    );

    return (
      <NavigationBar
        as={ as }
      >
        { children }
      </NavigationBar>
    );
  };

  const metadata = {
    themeSelector,
    info: { text: <p>Renders a full width application bar.</p> },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

storiesOf('Navigation Bar', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
