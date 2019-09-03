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
  one: {}, required: {}, warning: {}, alert: {}, info: {}, optional: {}, mandatory: {}, example: {}
};
const checkboxKeys = Object.keys(checkboxes);
const unblockValidation = true;

function testValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (['required', 'mandatory'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('This checkbox is required!'));
    } else if (props.name === 'checkbox-group' && value < 1) {
      reject(new Error('This checkbox is required!'));
    } else {
      resolve();
    }
  });
}

function testWarning(value, props) {
  return new Promise((resolve, reject) => {
    if (['warning', 'alert'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('Show warning!'));
    } else if (props.name === 'checkbox-group' && value === 1) {
      reject(new Error('Show warning!'));
    } else {
      resolve();
    }
  });
}

function testInfo(value, props) {
  return new Promise((resolve, reject) => {
    if (['info', 'example'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('Show this information'));
    } else if (props.name === 'checkbox-group' && value === 2) {
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
const formCheckbox = checkboxKeys.filter(name => ['one', 'name', 'mandatory', 'alert', 'example'].indexOf(name) === -1);
const groupCheckbox = checkboxKeys.filter(name => ['mandatory', 'alert', 'example'].indexOf(name) !== -1);

const groupStore = new Store({
  value: 0,
  mandatory: false,
  alert: false,
  example: false
});

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
        <State store={ groupStore }>
          <CheckboxGroup
            name='checkbox-group'
            groupName='checkbox-group'
            label='What would you choose?'
            labelHelp='Text for tooltip'
            validations={ testValidator }
            warnings={ testWarning }
            info={ testInfo }
          >
            {groupCheckbox.map(id => (
              <State store={ checkboxes[id].store } key={ `check-state-${id}` }>
                <OriginalCheckbox
                  { ...defaultKnobs(id) }
                  key={ `checkbox-input-${id}` }
                  onChange={ ev => handleGroupChange(ev, id) }
                  labelHelp=''
                />
              </State>
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

function handleGroupChange(ev, id) {
  const { checked } = ev.target;
  const count = Number(groupStore.get('value'));
  const value = checked ? count + 1 : count - 1;

  groupStore.set({
    value,
    [id]: checked
  });

  handleChange(ev, id);
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
