import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  select, number, text, boolean
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Decimal from './decimal.js';

storiesOf('Decimal', module)
  .add('default', () => {
    const align = select('align', OptionsHelper.alignBinary, Decimal.defaultProps.align);
    const precision = number('precision', Decimal.defaultProps.precision);
    const timeToDisappear = number('timeToDisappear', 0);
    const label = text('label', 'Example Decimal');
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const inputWidth = number('inputWidth', 0);
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const labelInline = boolean('labelInline', false);
    const labelWidth = number('labelWidth', 0);
    const labelAlign = select('labelAlign', OptionsHelper.alignBinary, OptionsHelper.alignBinary[0]);

    return (
      <Decimal
        align={ align }
        precision={ precision }
        timeToDisappear={ timeToDisappear }
        label={ label }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
      />
    );
  }, {
    notes: { markdown: notes }
  });
