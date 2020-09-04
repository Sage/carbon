import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import SettingsRow from './settings-row';
import { notes, info } from './documentation';
import getDocGenInfo from '../../utils/helpers/docgen-info';

SettingsRow.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /settings-row\.js(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
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
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: { text: info },
    chromatic: {
      disable: disableChromatic
    },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('SettingsRow', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
