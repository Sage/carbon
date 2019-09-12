import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import notes from './documentation/notes.md';
import Fieldset from './fieldset';
import Textbox from '../textbox';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Fieldset.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /fieldset(?!spec)/
);

storiesOf('__deprecated__/Fieldset', module)
  .addParameters({
    info: {
      propTablesExclude: [Textbox]
    }
  })
  .add('classic', () => {
    const legend = text('legend', '');

    return (
      <Fieldset
        legend={ legend }
      >
        <Textbox
          label='First Name'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Last Name'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Address'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='City'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Country'
          labelInline
          labelAlign='right'
        />
        <Textbox
          label='Telephone'
          labelInline
          labelAlign='right'
        />
      </Fieldset>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    themeSelector: classicThemeSelector
  });
