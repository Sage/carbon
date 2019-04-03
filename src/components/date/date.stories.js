import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';
import DateInput from '.';

storiesOf('Date Input', module)
  .add('default', () => {
    const autoFocus = boolean('autoFocus', true);
    const disabled = boolean('disabled', false);
    const minDate = text('minDate', '');
    const maxDate = text('maxDate', '');
    const readOnly = boolean('readOnly', false);
    const label = text('label', 'Example DateInput');
    const labelWidth = number('labelWidth', 0);
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const value = text('value', DateInput.defaultProps.value);
    const labelInline = boolean('labelInline', false);
    const inputWidth = labelInline ? number('inputWidth', 0, {
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
      <DateInput
        autoFocus={ autoFocus }
        disabled={ disabled }
        minDate={ minDate }
        maxDate={ maxDate }
        readOnly={ readOnly }
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        value={ value }
      />
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  });
