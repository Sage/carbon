import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './notes.md';
import AppWrapper from './app-wrapper';

storiesOf('App Wrapper', module)
  .addParameters({
    info: {
      inline: true,
      header: false,
      propTablesExclude: [],
      propTables: [AppWrapper],
      source: false
    }
  })
  .add('default', () => {
    const children = text('children', `This component will wrap its
    children within the width constraints of your application.`);

    return (
      <AppWrapper>
        {children}
      </AppWrapper>
    );
  }, {
    notes: { markdown: notes }
  });
