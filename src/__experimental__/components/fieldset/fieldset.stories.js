import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import notes from './documentation';
import Fieldset from './fieldset.component';
import Textbox from '../textbox';

import getDocGenInfo from '../../../utils/helpers/docgen-info';

Fieldset.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /fieldset\.component(?!spec)/
);

function makeStory(name, themeSelector) {
  const component = () => {
    const legend = text('legend', '');

    return (
      <Fieldset
        legend={ legend }
      >
        <Textbox
          label='First Name'
          labelInline
          labelAlign='right'
          inputWidth={ 70 }
        />
        <Textbox
          label='Last Name'
          labelInline
          labelAlign='right'
          inputWidth={ 70 }
        />
        <Textbox
          label='Address'
          labelInline
          labelAlign='right'
          inputWidth={ 70 }
        />
        <Textbox
          label='City'
          labelInline
          labelAlign='right'
          inputWidth={ 70 }
        />
        <Textbox
          label='Country'
          labelInline
          labelAlign='right'
          inputWidth={ 70 }
        />
        <Textbox
          label='Telephone'
          labelInline
          labelAlign='right'
          inputWidth={ 70 }
        />
      </Fieldset>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Fieldset', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
