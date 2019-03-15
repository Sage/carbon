import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import SettingsRow from './settings-row';
import { notes, info } from './documentation';

storiesOf('SettingsRow', module)
  .add('default', () => {
    const description = text('description', 'Simple description');
    const divider = boolean('divider', true);
    const title = text('title', 'This is the title');

    return (
      <SettingsRow
        description={ description }
        divider={ divider }
        title={ title }
      />
    );
  }, {
    notes: { markdown: notes },
    info: { text: info }
  });
