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

const trueBool = true;
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
  return {
    key: type,
    label: text(`${type}LabelProp`, `Accept ${type}`, `${type} switch`),
    disabled: boolean(`${type}DisabledProp`, false, `${type} switch`),
    size: (
      themeName !== 'classic' ? select(
        `${type}SizeProp`, OptionsHelper.sizesBinary, 'small', `${type} switch`
      ) : undefined
    ),
    fieldHelp: text(`${type}FieldHelpProp`, 'This text provides help for the input', `${type} switch`),
    fieldHelpInline: boolean(`${type}FieldHelpInlineProp`, false, `${type} switch`)
  };
};

const validationKnobs = (type, themeName) => {
  return {
    ...validationGroupedKnobs(type, themeName),
    labelHelp: text('labelHelp', 'Switch off and on this component.'),
    labelInline: boolean('labelInline', Switch.defaultProps.labelInline),
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
    reverse: boolean('reverse', Switch.defaultProps.reverse),
    name: `switch-${type}`,
    value: type,
    store: stores[type],
    onChange: handleChange(stores[type]),
    validations: testValidation('valid'),
    warnings: testValidation('warn'),
    info: testValidation('info'),
    unblockValidation: trueBool,
    useValidationIcon: trueBool
  };
};

const switchComponentValidation = themeName => () => {
  return (
  <>
    {validationTypes.map(type => switchWrapper({
      ...validationKnobs(type, themeName)
    }))}
  </>
  );
};

storiesOf('Experimental/Switch', module)
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
    labelInline: boolean('labelInline', Switch.defaultProps.labelInline),
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
    reverse: boolean('reverse', Switch.defaultProps.reverse),
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
