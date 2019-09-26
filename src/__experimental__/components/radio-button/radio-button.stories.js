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

const groupedKnobs = (type, themeName) => {
  return {
    key: type,
    label: text(`${type} label`, `Example ${type} radio button`, type),
    labelHelp: text(`${type} labelHelp`, 'This text provides more information for the label.', type),
    value: text(`${type} value`, type, type),
    disabled: boolean(`${type} disabled`, false, type),
    reverse: boolean(`${type} reverse`, false, type),
    size: themeName !== 'classic' ? select('size', OptionsHelper.sizesBinary, 'small', type) : undefined
  };
};

const radioComponent = themeName => () => {
  const knobs = defaultKnobs(themeName);
  const labelHelp = text('labelHelp', 'Group label helper');

  return (
    <RadioButtonGroup
      labelHelp={ labelHelp }
      groupName='frequency'
      label={ text('groupLabel', 'Please select a frequency from the options below') }
      name='radio-button-group'
    >
      <RadioButton
        id='input-1'
        name='input-1'
        checked
        { ...knobs }
        { ...groupedKnobs('weekly', themeName) }
      />
      <RadioButton
        id='input-2'
        name='input-2'
        { ...knobs }
        { ...groupedKnobs('monthly', themeName) }
      />
      <RadioButton
        // id prop intentionally left off here, to demonstrate automatic GUID generation
        name='input-2'
        key='Radio Three'
        { ...knobs }
        { ...groupedKnobs('yearly', themeName) }
      />
    </RadioButtonGroup>
  );
};

const radioComponentWithValidation = themeName => () => {
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
            { ...groupedKnobs(vType, themeName) }
            { ...defaultKnobs(themeName) }
            id={ `id-${vType}` }
            name={ vType }
            label={ `Example Radion Button (${vType})` }
            onChange={ handleGroupChange }
            labelHelp=''
          />
        ))}
      </RadioButtonGroup>
    </State>
  );
};

storiesOf('Experimental/RadioButton', module)
  .add(...makeStory('default', dlsThemeSelector, radioComponent()))
  .add(...makeStory('classic', classicThemeSelector, radioComponent('classic')))
  .add(...makeStory('validations', dlsThemeSelector, radioComponentWithValidation()))
  .add(...makeStory('validations classic', classicThemeSelector, radioComponentWithValidation('classic')));

function handleChange(event) {
  const { value } = event.target;
  action('Selected')(value);
}

function handleGroupChange(event) {
  const { value } = event.target;

  radioToggleGroupStore.set({ value });

  action('Selected')(value);
}

function defaultKnobs(themeName) {
  return ({
    error: themeName === 'classic' ? boolean('error', false) : undefined,
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
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
    onChange: handleChange
  });
}
