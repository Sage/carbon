import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import Checkbox from './checkbox.js';
import { notes, info } from './documentation';

storiesOf('Checkbox', module)
  .add('default', () => {
    const reverse = boolean('reverse', Checkbox.defaultProps.reverse);
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const label = text('label', 'Example Checkbox');
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const inputWidth = number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 50,
      step: 1
    });
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 50,
      step: 1
    }) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;

    return (
      <Checkbox
        fieldHelpInline={ fieldHelpInline }
        reverse={ reverse }
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
      />
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  });
