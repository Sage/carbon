import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Checkbox from './checkbox.js';

storiesOf('Checkbox', module)
  .add('default', () => {
    const checked = boolean('checked', false);
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const reverse = boolean('reverse', Checkbox.defaultProps.reverse);
    const timeToDisappear = number('timeToDisappear', 0);
    const label = text('label', 'Example Checkbox');
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? number('labelWidth', 0) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const inputWidth = number('fieldHelpInline', 0);
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');

    return (
      <Checkbox
        checked={ checked }
        fieldHelpInline={ fieldHelpInline }
        reverse={ reverse }
        timeToDisappear={ timeToDisappear }
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
    notes: { markdown: notes }
  });
