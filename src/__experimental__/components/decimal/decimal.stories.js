import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number, select } from '@storybook/addon-knobs';
import { Decimal } from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

storiesOf('Experimental/Decimal', module)
  .add('default', () => {
    const align = select(
      'align',
      OptionsHelper.alignBinary,
      Decimal.defaultProps.align
    );
    const precision = number('precision', Decimal.defaultProps.precision);
    const inputWidth = number('inputWidth', Decimal.defaultProps.inputWidth);
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const label = text('label', 'Example Decimal');
    const labelInline = label ? boolean('labelInline', false) : undefined;
    const labelWidth = labelInline ? number('labelWidth', 30) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const labelHelp = label ?
      text('labelHelp', 'This text provides help for the label.') : undefined;

    return (
      <Decimal
        align={ align }
        precision={ precision }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
      />
    );
  });
