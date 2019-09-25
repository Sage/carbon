import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { RadioButton, RadioButtonGroup } from '.';
import { info, notes } from './documentation';

const trueBool = true;
const radioToggleGroupStore = new Store({ value: '' });

function makeStory(name, themeSelector, component) {
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

const radioComponent = () => {
  const knobs = defaultKnobs();

  return (
    <RadioButtonGroup
      groupName='frequency'
      label={ text('groupLabel', 'Please select a frequency from the options below') }
      initialValue='weekly'
      name='radio-button-group'
    >
      <RadioButton
        id='input-1'
        name='input-1'
        label={ text('radioOneLabel', 'Example Weekly Radio Button') }
        value={ text('radioOneValue', 'weekly') }
        { ...knobs }
      />
      <RadioButton
        id='input-2'
        name='input-2'
        label={ text('radioTwoLabel', 'Example Monthly Radio Button') }
        value={ text('radioTwoValue', 'monthly') }
        { ...knobs }
      />
      <RadioButton
        // id prop intentionally left off here, to demonstrate automatic GUID generation
        name='input-2'
        label={ text('radioThreeLabel', 'Example Annual Radio Button') }
        value={ text('radioThreeValue', 'annually') }
        { ...knobs }
      />
    </RadioButtonGroup>
  );
};

const radioComponentWithValidation = () => {
  const validationTypes = ['error', 'warning', 'info'];
  const labelHelp = text('labelHelp', 'Group label helper');

  function testValidation(type) {
    return (value) => {
      return new Promise((resolve, reject) => {
        if (type === 'valid' && value === 'error') {
          reject(new Error('Some error occurred?'));
        }

        if (type === 'warn' && value === 'warning') {
          reject(new Error('Watch out!'));
        }

        if (type === 'info' && value === 'info') {
          reject(new Error('Let me tell you this...'));
        }

        resolve();
      });
    };
  }

  return (
    <State store={ radioToggleGroupStore }>
      <RadioButtonGroup
        groupName='my-event'
        label='Are you coming to the event?'
        labelHelp={ labelHelp }
        validations={ testValidation('valid') }
        warnings={ testValidation('warn') }
        info={ testValidation('info') }
        name='radio-button-group'
        useValidationIcon={ trueBool }
      >
        {validationTypes.map(vType => (
          <RadioButton
            { ...defaultKnobs() }
            key={ `key-${vType}` }
            id={ `id-${vType}` }
            name={ vType }
            label={ `Example Radion Button (${vType})` }
            value={ vType }
            onChange={ handleGroupChange }
            labelHelp=''
          />
        ))}
      </RadioButtonGroup>
    </State>
  );
};

storiesOf('Experimental/RadioButton', module)
  .add(...makeStory('default', dlsThemeSelector, radioComponent))
  .add(...makeStory('classic', classicThemeSelector, radioComponent))
  .add(...makeStory('validations', dlsThemeSelector, radioComponentWithValidation))
  .add(...makeStory('validations classic', classicThemeSelector, radioComponentWithValidation));

function handleChange(event) {
  const { value } = event.target;
  action('Selected')(value);
}

function handleGroupChange(event) {
  const { value } = event.target;

  radioToggleGroupStore.set({ value });

  action('Selected')(value);
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
