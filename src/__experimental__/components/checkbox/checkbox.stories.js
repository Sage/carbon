import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Checkbox from '.';
import { info, notes, infoValidations } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Checkbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /checkbox\.component(?!spec)/
);

const formStore = new Store({
  checked: false
});

const formStoreOne = new Store({
  checked: true
});

const formStoreTwo = new Store({
  checked: true
});

const formStoreThree = new Store({
  checked: true
});

storiesOf('Experimental/Checkbox', module)
  .add('default', () => {
    return (
      <State store={ formStore }>
        <Checkbox
          onChange={ ev => handleChange(ev) }
          { ...defaultKnobs() }
        />
      </State>
    );
  }, {
    info: {
      text: info,
      propTablesExclude: [State],
      excludedPropTypes: ['children']
    },
    notes: { markdown: notes }
  }).add('validations', () => {
    return (
      <div>
        <State store={ formStoreOne }>
          <Checkbox
            validations={ errorValidator }
            onChange={ ev => handleChange(ev) }
            { ...defaultKnobs() }
          />
        </State>
        <State store={ formStoreTwo }>
          <Checkbox
            warnings={ warningValidator }
            onChange={ ev => handleChange(ev) }
            { ...defaultKnobs() }
          />
        </State>
        <State store={ formStoreThree }>
          <Checkbox
            info={ infoValidator }
            onChange={ ev => handleChange(ev) }
            { ...defaultKnobs() }
          />
        </State>
      </div>
    );
  }, {
    info: {
      source: false,
      text: infoValidations,
      propTablesExclude: [State, Checkbox]
    }
  });

function handleChange(ev) {
  action('change')();
  formStore.set({ checked: ev.target.checked });
}

function defaultKnobs() {
  return ({
    disabled: boolean('disabled', false),
    error: boolean('error', false),
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    reverse: boolean('reverse', false),
    label: text('label', 'Example Checkbox'),
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
    value: text('value', 'test-value')
  });
}

function errorValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (props.checked) {
      resolve();
    } else {
      reject(new Error('This value must not include the word "error"!'));
    }
  });
}

function warningValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (props.checked) {
      resolve();
    } else {
      reject(new Error('This value must not include the word "warning"!'));
    }
  });
}

function infoValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (props.checked) {
      resolve();
    } else {
      reject(Error('This value should be longer than 12 characters'));
    }
  });
}
