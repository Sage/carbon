import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import OptionsHelper from '../../utils/helpers/options-helper';
import Filter from './filter';
import Textbox from '../../__deprecated__/components/textbox';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Filter.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /filter(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const align = select('labelAlign', OptionsHelper.alignBinary);

    return (
      <Filter
        align={ align }
      >
        <Textbox
          label='First Name'
        />
        <Textbox
          label='Last Name'
        />
      </Filter>
    );
  };

  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Filter Component', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
