import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import Form from '../form';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Checkbox, { OriginalCheckbox } from '.';
import { info, notes, infoValidations } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import CheckboxGroup from './checkbox-group.component';

Checkbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /checkbox\.component(?!spec)/
);

const checkboxes = {
  one: {}, required: {}, warning: {}, info: {}, optional: {}, mandatory: {}, example: {}
};
const checkboxKeys = Object.keys(checkboxes);
const unblockValidation = true;

function testValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (['required', 'mandatory'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('This checkbox is required!'));
    } else {
      resolve();
    }
  });
}

function testWarning(value, props) {
  return new Promise((resolve, reject) => {
    if (['warning'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('Show warning!'));
    } else {
      resolve();
    }
  });
}

function testInfo(value, props) {
  return new Promise((resolve, reject) => {
    if (value === 'info' && !props.checked) {
      reject(new Error('Show this information'));
    } else {
      resolve();
    }
  });
}

checkboxKeys.forEach((id) => {
  checkboxes[id] = {
    store: new Store({
      check: false,
      forceUpdateTriggerToggle: false
    })
  };
});
const formCheckbox = checkboxKeys.filter(name => ['one', 'name', 'mandatory', 'example'].indexOf(name) === -1);
const groupCheckbox = checkboxKeys.filter(name => ['mandatory', 'warning', 'info', 'example'].indexOf(name) !== -1);

const inGroupStore = new Store({ value: '' });

storiesOf('Experimental/Checkbox', module)
  .add('default', () => {
    return (
      <State store={ checkboxes.one.store }>
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
  })
  .add('validations', () => {
    return (
      <React.Fragment>
        <h3>In Form</h3>
        <Form onSubmit={ handleSubmit }>
          {formCheckbox.map(type => (
            <State store={ checkboxes[type].store } key={ `check-state-${type}` }>
              <Checkbox
                key={ `checkbox-input-${type}` }
                validations={ testValidator }
                warnings={ testWarning }
                info={ testInfo }
                onChange={ ev => handleChange(ev, type) }
                name={ `my-checkbox-${type}` }
                unblockValidation={ unblockValidation }
                { ...defaultKnobs(type) }
              />
            </State>
          ))}
        </Form>

        <h3>In Group</h3>
        <State store={ inGroupStore }>
          <CheckboxGroup
            name='checkbox-group'
            groupName='checkbox-group'
            label='What would you choose?'
            labelHelp='Returns error unless "Baz" value selected'
            validations={ testValidator }
            warnings={ testWarning }
            info={ testInfo }
          >
            {groupCheckbox.map(id => (
              <OriginalCheckbox
                { ...defaultKnobs(id) }
                key={ `checkbox-input-${id}` }
                onChange={ ev => inGroupStore.set({ value: ev.target.value }) }
                labelHelp=''
              />
            ))}
          </CheckboxGroup>
        </State>
      </React.Fragment>
    );
  }, {
    info: {
      source: false,
      text: infoValidations,
      propTablesExclude: [State, Checkbox]
    }
  });

function handleChange(ev, id = 'one') {
  const { checked } = ev.target;

  action('change')(`checked: ${checked}`);

  checkboxes[id].store.set({
    checked,
    forceUpdateTriggerToggle: !checked
  });
}

function defaultKnobs(type) {
  const label = `${text('label', 'Example Checkbox')} (${type})`;

  return ({
    disabled: boolean('disabled', false),
    error: boolean('error', false),
    fieldHelp: text('fieldHelp', 'This text provides help for the input.'),
    fieldHelpInline: boolean('fieldHelpInline', false),
    reverse: boolean('reverse', false),
    label,
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
    value: type
  });
}

function handleSubmit(ev) {
  ev.preventDefault();
  action('submit')();
}
