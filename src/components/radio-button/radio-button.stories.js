import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import RadioButton from './radio-button';
import { notes, info } from './documentation';

storiesOf('Radio Button', module).add(
  'default',
  () => {
    const fieldHelp = text('fieldHelp', 'Additional information below the input.');
    const fieldHelpInline = boolean('fieldHelpInline', RadioButton.defaultProps.fieldHelpInline);
    const label = text('label', 'Example RadioButton');
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? text('labelWidth', '') : undefined;
    const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary, 'left') : undefined;
    const labelHelp = text('labelHelp', 'Example label help text');
    const inputWidth = text('inputWidth', '');

    return [
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
    ];
  },
  {
    notes: { markdown: notes },
    info: { text: info }
  }
);
