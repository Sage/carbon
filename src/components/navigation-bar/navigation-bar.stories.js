import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import NavigationBar from './navigation-bar';
import notes from './notes.md';
import './navigation-bar.stories.scss';
import getDocGenInfo from '../../utils/helpers/docgen-info';

NavigationBar.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /navigation-bar\.js(?!spec)/
);

storiesOf('Navigation Bar', module)
  .add('default', () => {
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
  }, {
    info: { text: <p>Renders a full width application bar.</p> },
    notes: { markdown: notes }
  });
