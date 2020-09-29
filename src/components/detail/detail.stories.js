import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import Detail from './detail.js';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Detail.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /detail\.js(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const icon = select('icon', [null, ...OptionsHelper.icons], null);
    const footnote = text('footnote', 'This detail may require a footnote.');
    const children = text('children', 'An example of a detail.');

    return (
      <Detail
        icon={ icon }
        footnote={ footnote }
      >
        {children}
      </Detail>
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

storiesOf('Detail', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
