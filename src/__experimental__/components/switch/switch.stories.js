import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Switch, { BaseSwitch } from './switch.component';
import { info, infoValidations, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Switch.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /switch\.component(?!spec)/
);

const stores = {
  default: {
    store: new Store({
      checked: false
    })
  },
  classic: {
    store: new Store({
      checked: false
    })
  }
};

const validationTypes = ['cookies', 't&cs', 'info'];

validationTypes.forEach((type) => {
  stores[type] = {
    store: new Store({
      checked: false
    })
  };
});

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    knobs: { escapeHTML: false },
    info: {
      text: name.search('validations') !== -1 ? infoValidations : info
    },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

function handleChange(ev, type) {
  const { checked } = ev.target;

  stores[type].store.set({
    checked,
    forceUpdateTriggerToggle: !checked
  });

  action('change')(`checked: ${checked}`);
}

const validationGroupedKnobs = (type, storyName) => {
  const group = `${type} switch`;
  return {
    key: `switch-${type}`,
    label: text(`${type} label`, `Accept ${type}`, group),
    labelHelp: text(`${type} labelHelp`, `Switch off and on ${type} component.`, group),
    disabled: boolean(`${type} disabled`, false, group),
    size: (
      storyName !== 'classic' ? select(
        `${type} size`, OptionsHelper.sizesBinary, 'small', group
      ) : undefined
    ),
    fieldHelp: text(`${type} fieldHelp`, 'This text provides help for the input', group),
    fieldHelpInline: boolean(`${type} fieldHelpInline`, false, group),
    labelInline: boolean(`${type} labelInline`, false, group),
    loading: boolean(`${type} loading`, false, group),
    inputWidth: number(`${type} inputWidth`, 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, group),
    labelWidth: number(`${type} labelWidth`, 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, group),
    labelAlign: select(
      `${type} labelAlign`,
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0],
      group
    ),
    reverse: boolean(`${type} reverse`, BaseSwitch.defaultProps.reverse, group)
  };
};

const validationKnobs = (type, storyName) => {
  return {
    ...validationGroupedKnobs(type, storyName),
    name: `switch-${type}`,
    value: type,
    onChange: ev => handleChange(ev, type),
    validations: testValidation('valid'),
    warnings: testValidation('warn'),
    info: testValidation('info'),
    unblockValidation: true,
    useValidationIcon: true
  };
};

function switchWrapper(wrapperProps) {
  const { type, ...rest } = wrapperProps;
  return (
    <State
      store={ stores[type].store }
      key={ `switch-state-${type}` }
    >
      <Switch
        onChange={ ev => handleChange(ev, type) }
        name={ `switch-${type}` }
        { ...rest }
      />
    </State>
  );
}

const switchClassic = () => switchWrapper({
  ...commonKnobs(),
  type: 'classic'
});

const switchComponent = () => switchWrapper({
  ...commonKnobs(),
  ...dlsKnobs(),
  type: 'default'
});

const switchComponentValidation = storyName => () => (
  <div>
    {validationTypes.map(type => (
      <State
        store={ stores[type].store }
        key={ `switch-state-${type}` }
      >
        <Switch { ...validationKnobs(type, storyName) } />
      </State>
    ))}
  </div>
);

function commonKnobs() {
  return ({
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    label: text('label', 'Switch on this component?'),
    labelHelp: text('labelHelp', 'Switch off and on this component.'),
    labelInline: boolean('labelInline', false),
    loading: boolean('loading', false),
    onBlur: action('onBlur'),
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
    reverse: boolean('reverse', BaseSwitch.defaultProps.reverse),
    value: text('value', 'test-value')
  });
}

function dlsKnobs() {
  return {
    disabled: boolean('disabled', false),
    size: select('size', OptionsHelper.sizesBinary, 'small')
  };
}

function testValidation(type) {
  return (value, { checked }) => {
    return new Promise((resolve, reject) => {
      if (type === 'valid' && value === 'cookies' && !checked) {
        reject(new Error('Show error!'));
      } else if (type === 'warn' && value === 't&cs' && !checked) {
        reject(new Error('Show warning!'));
      } else if (type === 'info' && value === 'info' && !checked) {
        reject(new Error('Show info!'));
      } else {
        resolve();
      }
    });
  };
}

storiesOf('Experimental/Switch', module)
  .addParameters({
    info: { text: info, propTablesExclude: [State] }
  })
  .add(...makeStory('default', dlsThemeSelector, switchComponent))
  .add(...makeStory('classic', classicThemeSelector, switchClassic))
  .add(...makeStory('validations', dlsThemeSelector, switchComponentValidation('validations')))
  .add(...makeStory('validations classic', classicThemeSelector, switchComponentValidation('validationsclassic')));
