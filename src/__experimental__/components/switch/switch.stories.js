import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Switch from '.';
import { info, infoValidations, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Switch.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /switch\.component(?!spec)/
);

const formStore = new Store({
  checked: false
});

const stores = {};
const validationTypes = ['cookies', 't&cs', 'info'];

validationTypes.forEach((type) => {
  stores[type] = new Store({
    checked: false,
    forceUpdateTriggerToggle: false
  });
});

function switchWrapper(wrapperProps) {
  return (
    <State store={ wrapperProps.store }>
      <Switch
        onChange={ handleChange() }
        name='switch'
        { ...wrapperProps }
      />
    </State>
  );
}

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

const switchClassic = () => switchWrapper({
  ...commonKnobs(),
  store: formStore
});

const switchComponent = () => switchWrapper({
  ...commonKnobs(),
  ...dlsKnobs(),
  store: formStore
});

const validationGroupedKnobs = (type, themeName) => {
  const group = `${type} switch`;
  return {
    key: type,
    label: text(`${type} label`, `Accept ${type}`, group),
    labelHelp: text(`${type} labelHelp`, `Switch off and on ${type} component.`, group),
    disabled: boolean(`${type} disabled`, false, group),
    size: (
      themeName !== 'classic' ? select(
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
    reverse: boolean(`${type} reverse`, false, group)
  };
};

const validationKnobs = (type, themeName) => {
  return {
    ...validationGroupedKnobs(type, themeName),
    name: `switch-${type}`,
    value: type,
    store: stores[type],
    onChange: handleChange(stores[type]),
    validations: testValidation('valid'),
    warnings: testValidation('warn'),
    info: testValidation('info'),
    unblockValidation: true,
    useValidationIcon: true
  };
};

const switchComponentValidation = themeName => () => validationTypes.map(type => switchWrapper({
  ...validationKnobs(type, themeName)
}));

storiesOf('Experimental/Switch', module)
  .addParameters({
    info: { text: info, propTablesExclude: [State] }
  })
  .add(...makeStory('default', dlsThemeSelector, switchComponent))
  .add(...makeStory('classic', classicThemeSelector, switchClassic))
  .add(...makeStory('validations', dlsThemeSelector, switchComponentValidation()))
  .add(...makeStory('validations classic', classicThemeSelector, switchComponentValidation('classic')));

function handleChange(store = formStore) {
  return function (ev) {
    const { checked } = ev.target;

    store.set({ checked, forceUpdateTriggerToggle: checked });
    action('checked')(checked);
  };
}

function commonKnobs() {
  return ({
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    label: text('label', 'Switch on this component?'),
    labelHelp: text('labelHelp', 'Switch off and on this component.'),
    labelInline: boolean('labelInline', false),
    loading: boolean('loading', false),
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
    reverse: boolean('reverse', false),
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
