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
import { info, notes } from './documentation';
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

function makeStory(name, themeSelector, component, disableChromatic = true) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      excludedPropTypes: ['children']
    },
    chromatic: {
      disable: disableChromatic
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

const groupedKnobs = (type, themeName) => {
  return {
    key: type,
    label: text('label', `Example ${type} radio button`, type),
    labelHelp: text('labelHelp', 'This text provides more information for the label.', type),
    value: text('value', type, type),
    disabled: boolean('disabled', false, type),
    reverse: boolean('reverse', false, type),
    size: themeName === 'classic' ? undefined : select('size', OptionsHelper.sizesBinary, 'small', type),
    fieldHelp: text('fieldHelp', 'This text provides help for the input.', type),
    fieldHelpInline: boolean('fieldHelpInline', false, type),
    inputWidth: number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, type),
    labelWidth: number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, type),
    labelAlign: select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0],
      type
    )
  };
};

const radioComponent = themeName => () => {
  const labelHelp = text('labelHelp', 'Group label helper');
  const inline = boolean('inline', false);
  const legendInline = boolean('legendInline', false);

  return (
    <State store={ radioToggleGroupStore }>
      <RadioButtonGroup
        labelHelp={ labelHelp }
        name='frequency'
        legend={ text('groupLabel', 'Please select a frequency from the options below') }
        onChange={ handleGroupChangeFactory(radioToggleGroupStore) }
        inline={ inline }
        legendInline={ legendInline }
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

  return (
    <>
      <h4>Applied to single RadioButton</h4>
      <h5>As string</h5>

      {validationTypes.map(validationType => (
        <RadioButton
          { ...groupedKnobs(validationType, themeName) }
          key={ `${validationType}-string` }
          id={ `id-${validationType}-single` }
          { ...{ [validationType]: 'Message' } }
          onChange={ () => {} }
        />
      ))}

      <h5>As boolean</h5>
      {validationTypes.map(validationType => (
        <RadioButton
          { ...groupedKnobs(validationType, themeName) }
          key={ `${validationType}-boolean` }
          id={ `id-${validationType}-single-bool` }
          { ...{ [validationType]: true } }
          onChange={ () => {} }
        />
      ))}

      <h4>Applied to RadioButtonGroup</h4>
      <h5>As string</h5>
      {validationTypes.map(validationType => (
        <State store={ validationRadioToggleGroupStore } key={ `state-${validationType}-string` }>
          <RadioButtonGroup
            name={ `radio-group-${validationType}` }
            legend={ legend }
            labelHelp={ labelHelp }
            { ...{ [validationType]: 'Message' } }
            onChange={ handleGroupChangeFactory(validationRadioToggleGroupStore) }
          >
            {['Foo', 'Bar', 'Baz'].map(option => (
              <RadioButton
                { ...groupedKnobs(option, themeName) }
                key={ `${option}-string` }
                id={ `id-${option}-group-${validationType}` }
              />
            ))}
          </RadioButtonGroup>
        </State>
      ))}
      <h5>As string - no legend on RadioButtonGroup</h5>
      <h5>In such case validation message - if needed - may be displayed manually on first of the RadioButtons </h5>
      {validationTypes.map(validationType => (
        <State store={ validationRadioToggleGroupStore } key={ `state-${validationType}-string` }>
          <RadioButtonGroup
            name={ `radio-group-${validationType}-no-legend` }
            labelHelp={ labelHelp }
            { ...{ [validationType]: 'Message' } }
            onChange={ handleGroupChangeFactory(validationRadioToggleGroupStore) }
          >
            {['Foo', 'Bar', 'Baz'].map(option => (
              <RadioButton
                { ...groupedKnobs(option, themeName) }
                { ...(option === 'Foo' && { [validationType]: 'Message' }) }

                key={ `${option}-string` }
                id={ `id-${option}-group-no-legend-${validationType}` }
              />
            ))}
          </RadioButtonGroup>
        </State>
      ))}

      <h5>As boolean</h5>
      {validationTypes.map(validationType => (
        <State store={ validationRadioToggleGroupStore } key={ `state-${validationType}-boolean` }>
          <RadioButtonGroup
            name={ `radio-group-${validationType}-bool` }
            legend={ legend }
            labelHelp={ labelHelp }
            { ...{ [validationType]: true } }
            onChange={ handleGroupChangeFactory(validationRadioToggleGroupStore) }
          >
            {['Foo', 'Bar', 'Baz'].map(option => (
              <RadioButton
                { ...groupedKnobs(option, themeName) }
                key={ `${option}-bool` }
                id={ `id-${option}-group-bool-${validationType}` }
              />
            ))}
          </RadioButtonGroup>
        </State>
      ))}
    </>
  );
};

storiesOf('Experimental/RadioButton', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add(...makeStory('default', dlsThemeSelector, radioComponent()))
  .add(...makeStory('classic', classicThemeSelector, radioComponent('classic'), false))
  .add(...makeStory('validations', dlsThemeSelector, radioComponentWithValidation()))
  .add(...makeStory('validations classic', classicThemeSelector, radioComponentWithValidation('classic'), false));
