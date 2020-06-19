import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import I18n from 'i18n-js';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Switch, { BaseSwitch } from './switch.component';
import { info, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

const { translations } = I18n;
I18n.translations = {
  ...translations,
  fr: {
    ...translations.fr,
    switch: {
      on: 'sur',
      off: 'de'
    }
  }
};

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

const validationTypes = ['error', 'warning', 'info'];

validationTypes.forEach((type) => {
  stores[type] = {
    store: new Store({
      checked: false
    })
  };
});

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    knobs: { escapeHTML: false },
    info: {
      text: info
    },
    chromatic: {
      disable: disableChromatic
    },
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

function handleChange(ev, type) {
  const { checked } = ev.target;

  stores[type].store.set({
    checked
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

const validationKnobs = (type, message, storyName) => {
  return {
    ...validationGroupedKnobs(type, storyName),
    name: `switch-${type}`,
    value: type,
    onChange: ev => handleChange(ev, type),
    [type]: message
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
    <h4>Validation as string</h4>
    <h6>On component</h6>
    {validationTypes.map(type => (
      <State
        store={ stores[type].store }
        key={ `switch-state-${type}-string-component` }
      >
        <Switch { ...validationKnobs(type, 'Message', storyName) } />
      </State>
    ))}

    <h6>On label</h6>
    {validationTypes.map(type => (
      <State
        store={ stores[type].store }
        key={ `switch-state-${type}-string-label` }
      >
        <Switch { ...validationKnobs(type, 'Message', storyName) } validationOnLabel />
      </State>
    ))}

    <h4>Validation as boolean</h4>
    {validationTypes.map(type => (
      <State
        store={ stores[type].store }
        key={ `switch-state-${type}-bool` }
      >
        <Switch { ...validationKnobs(type, true, storyName) } />
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

storiesOf('Experimental/Switch', module)
  .addParameters({
    info: { text: info, propTablesExclude: [State] }
  })
  .add(...makeStory('default', dlsThemeSelector, switchComponent))
  .add(...makeStory('classic', classicThemeSelector, switchClassic, true))
  .add(...makeStory('validations', dlsThemeSelector, switchComponentValidation('validations')))
  .add(...makeStory('validations classic', classicThemeSelector,
    switchComponentValidation('validationsclassic'), true));
