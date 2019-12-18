import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { RadioButton, RadioButtonGroup, PrivateRadioButton } from '.';
import { info, infoValidations, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

RadioButtonGroup.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /radio-button-group\.component(?!spec)/
);

PrivateRadioButton.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /radio-button\.component.(?!spec)/
);

const radioToggleGroupStore = new Store({ value: null });
const validationRadioToggleGroupStore = new Store({ value: null });
const handleGroupChangeFactory = store => (event) => {
  const { value } = event.target;

  store.set({ value });

  action('onChange')(value);
};

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    info: {
      text: name.search('validations') !== -1 ? infoValidations : info,
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
    size: themeName === 'classic' ? undefined : select(`${type} size`, OptionsHelper.sizesBinary, 'small', type),
    fieldHelp: text(`${type} fieldHelp`, 'This text provides help for the input.', type),
    fieldHelpInline: boolean(`${type} fieldHelpInline`, false, type),
    inputWidth: number(`${type} inputWidth`, 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, type),
    labelWidth: number(`${type} labelWidth`, 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, type),
    labelAlign: select(
      `${type} labelAlign`,
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0],
      type
    )
  };
};

const radioComponent = themeName => () => {
  const labelHelp = text('labelHelp', 'Group label helper');

  return (
    <State store={ radioToggleGroupStore }>
      <RadioButtonGroup
        labelHelp={ labelHelp }
        name='frequency'
        legend={ text('groupLabel', 'Please select a frequency from the options below') }
        onChange={ handleGroupChangeFactory(radioToggleGroupStore) }
      >
        <RadioButton
          id='input-1'
          { ...groupedKnobs('weekly', themeName) }
        />
        <RadioButton
          { ...groupedKnobs('monthly', themeName) }
        />
        <RadioButton
        // id prop intentionally left off here, to demonstrate automatic GUID generation
          { ...groupedKnobs('yearly', themeName) }
        />
      </RadioButtonGroup>
    </State>
  );
};

const radioComponentWithValidation = themeName => () => {
  const validationTypes = ['error', 'warning', 'info'];
  const legend = text('legend', 'Are you coming to the event?');
  const labelHelp = text('labelHelp', 'Group label helper');

  function testValidation(type) {
    return (value) => {
      return new Promise((resolve, reject) => {
        if (type === 'valid' && value === 'error') {
          reject(new Error('An error has occurred!'));
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
    <State store={ validationRadioToggleGroupStore }>
      <RadioButtonGroup
        name={ text('name', 'Group Name') }
        legend={ legend }
        labelHelp={ labelHelp }
        validations={ testValidation('valid') }
        warnings={ testValidation('warn') }
        info={ testValidation('info') }
        onChange={ handleGroupChangeFactory(validationRadioToggleGroupStore) }
      >
        {validationTypes.map(vType => (
          <RadioButton
            { ...groupedKnobs(vType, themeName) }
            id={ `id-${vType}` }
          />
        ))}
      </RadioButtonGroup>
    </State>
  );
};

storiesOf('Experimental/RadioButton', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add(...makeStory('default', dlsThemeSelector, radioComponent()))
  .add(...makeStory('classic', classicThemeSelector, radioComponent('classic')))
  .add(...makeStory('validations', dlsThemeSelector, radioComponentWithValidation()))
  .add(...makeStory('validations classic', classicThemeSelector, radioComponentWithValidation('classic')));
