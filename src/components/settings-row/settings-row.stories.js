import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import SettingsRow from './settings-row';
import notes from './notes.md';

storiesOf('SettingsRow', module)
  .add('default', () => {
    const className = text('className', '');
    const description = text('description', 'Simple description.');
    const divider = boolean('divider', true);
    const title = text('title', 'This is the title.');

    return (
      <SettingsRow
        className={ className }
        description={ description }
        divider={ divider }
        title={ title }
      />
    );
  }, {
    notes: { markdown: notes }
  });
