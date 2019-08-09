import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './notes.md';
import AppWrapper from './app-wrapper';
import getDocGenInfo from '../../utils/helpers/docgen-info';

AppWrapper.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /app-wrapper(?!spec)/
);

storiesOf('App Wrapper', module)
  .add('default', () => {
    const children = text(
      'children',
      'This component will wrap its children within the width constraints of your application.'
    );

    return (
      <AppWrapper>
        {children}
      </AppWrapper>
    );
  }, {
    notes: { markdown: notes }
  });
