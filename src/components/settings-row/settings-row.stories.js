import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import SettingsRow from './settings-row';
import { notes, info } from './documentation';

storiesOf('SettingsRow', module).add(
  'default',
  () => {
    const children = text('children', 'Content for settings');
    const description = text(
      'description',
      'This provides more information about what this group of settings are for.'
    );
    const divider = boolean('divider', SettingsRow.defaultProps.divider);
    const title = text('title', 'A GROUP OF SETTINGS');

    return (
      <SettingsRow
        description={ description } divider={ divider }
        title={ title }
      >
        {children}
      </SettingsRow>
    );
  },
  {
    notes: { markdown: notes },
    info: { text: info }
  }
);
