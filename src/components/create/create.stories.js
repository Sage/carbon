import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './documentation';
import Create from './create.component';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Create.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /create\.component(?!spec)/
);

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const children = text('children', 'Resource Name');
    const className = text('className', '');

    return (
      <Create
        className={ className }
      >
        {children}
      </Create>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    chromatic: {
      disable: disableChromatic
    }
  };

  return [name, component, metadata];
}

storiesOf('Create', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector, true));
