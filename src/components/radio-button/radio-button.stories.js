import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text
} from '@storybook/addon-knobs';
import RadioButton from './radio-button';
import { notes, info } from './documentation';

storiesOf('Radio Button', module)
  .addParameters({
    info: {
      propTables: [RadioButton]
    }
  }).add(
    'default',
    () => {
      const fieldHelp = text('fieldHelp', 'Additional information below the input.');
      const fieldHelpInline = boolean('fieldHelpInline', RadioButton.defaultProps.fieldHelpInline);
      const label = text('label', 'Example RadioButton');
      const labelInline = boolean('labelInline', false);
      const labelWidth = labelInline ? text('labelWidth', '') : undefined;
      const labelAlign = labelInline ? text('labelAlign', '') : undefined;
      const labelHelp = text('labelHelp', 'Example label help text');
      const inputWidth = text('inputWidth', '');

      return ([
        <RadioButton
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          inputWidth={ inputWidth }
          label={ label }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          name='radio-buttons-example'
        />,
        <RadioButton
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          inputWidth={ inputWidth }
          label={ label }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          name='radio-buttons-example'
        />
      ]);
    }, {
      notes: { markdown: notes },
      info: { text: info }
    }
  );
