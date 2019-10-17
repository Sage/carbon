import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { RadioButton, RadioButtonGroup } from '.';
import { info, notes } from './documentation';

function makeStory(name, themeSelector) {
  const component = () => {
    const knobs = defaultKnobs();

    return (
      <RadioButtonGroup
        groupName='frequency'
        legend={ text('legend', 'Please select a frequency from the options below') }
      >
        <RadioButton
          id='input-1'
          checked
          label={ text('radioOneLabel', 'Example Weekly Radio Button') }
          value={ text('radioOneValue', 'weekly') }
          { ...knobs }
        />
        <RadioButton
          id='input-2'
          label={ text('radioTwoLabel', 'Example Monthly Radio Button') }
          value={ text('radioTwoValue', 'monthly') }
          { ...knobs }
        />
        <RadioButton
          // id prop intentionally left off here, to demonstrate automatic GUID generation
          label={ text('radioThreeLabel', 'Example Annual Radio Button') }
          value={ text('radioThreeValue', 'annually') }
          { ...knobs }
        />
      </RadioButtonGroup>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      text: info,
      excludedPropTypes: ['children']
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/RadioButton', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));

function handleChange(event) {
  const { value } = event.target;
  action(`Selected - ${value}`)(event);
}

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
    size: select('size', OptionsHelper.sizesBinary, 'small'),
    onChange: handleChange
  });
}
