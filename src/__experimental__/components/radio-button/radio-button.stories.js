import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { RadioButton, RadioButtonGroup } from '.';
import { info, notes } from './documentation';

storiesOf('Experimental/RadioButton', module)
  .add('default', () => {
    return (
      <RadioButtonGroup
        groupName='frequenct'
        label={ text('groupLabel', 'Please select a frequency from the options below') }
      >
        <RadioButton
          id={ text('radioOneId', 'input-1') }
          label={ text('radioOneLabel', 'Example Weekly Radio Button') }
          value={ text('radioOneValue', 'weekly') }
          { ...defaultKnobs() }
        />
        <RadioButton
          id={ text('radioTwoId', 'input-2') }
          label={ text('radioTwoLabel', 'Example Monthly Radio Button') }
          value={ text('radioTwoValue', 'monthly') }
          { ...defaultKnobs() }
        />
        <RadioButton
          id={ text('radioThreeId', 'input-3') }
          label={ text('radioThreeLabel', 'Example Annual Radio Button') }
          value={ text('radioThreeValue', 'annually') }
          { ...defaultKnobs() }
        />
      </RadioButtonGroup>
    );
  }, {
    info: {
      text: info,
      excludedPropTypes: ['children']
    },
    notes: { markdown: notes }
  });

function defaultKnobs() {
  return ({
    disabled: boolean('disabled', false),
    error: boolean('error', false),
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    reverse: boolean('reverse', false),
    labelHelp: text('labelHelp', 'This text provides more information for the label.'),
    inputWidth: number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }),
    labelWidth: number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }),
    labelAlign: select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ),
    size: select('size', OptionsHelper.sizesBinary, 'small')
  });
}
