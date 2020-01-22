import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import Form from '../form';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { Checkbox, CheckboxGroup } from '.';
import { info, notes, infoValidations } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import AutoFocus from '../../../utils/helpers/auto-focus';
import guid from '../../../utils/helpers/guid';

Checkbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /checkbox\.component(?!spec)/
);

function testValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (['required', 'mandatory'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('This checkbox is required!'));
    } else if (props.name === 'checkbox-group' && value === '0') {
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
    } else if (props.name === 'checkbox-group' && value === '1') {
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
    } else if (props.name === 'checkbox-group' && value === '2') {
      reject(new Error('Show this information'));
    } else {
      resolve();
    }
  });
}

const checkboxes = {
  default: {}, required: {}, warning: {}, info: {}, optional: {}, one: {}, two: {}, three: {}
};
const checkboxKeys = Object.keys(checkboxes);

checkboxKeys.forEach((id) => {
  checkboxes[id] = {
    store: new Store({
      checked: false,
      forceUpdateTriggerToggle: false
    })
  };
});
const formCheckbox = checkboxKeys.filter(name => ['required', 'warning', 'info', 'optional'].indexOf(name) !== -1);
const groupCheckbox = checkboxKeys.filter(name => ['one', 'two', 'three'].indexOf(name) !== -1);

const groupStore = new Store({
  value: '0',
  mandatory: false,
  alert: false,
  example: false,
  one: false,
  two: false,
  three: false
});

const previous = {
  key: guid(),
  autoFocus: false
};

function defaultKnobs(type) {
  let theType = '';
  if (type === undefined) {
    theType = 'default';
  } else {
    theType = type;
  }
  const label = `${text('label', 'Example Checkbox', type)} (${theType})`;
  const autoFocus = boolean('autoFocus', false, type);
  const key = AutoFocus.getKey(autoFocus, previous);

  return ({
    key,
    disabled: boolean('disabled', false, type),
    fieldHelp: text('fieldHelp', 'This text provides help for the input.', type),
    fieldHelpInline: boolean('fieldHelpInline', false, type),
    reverse: boolean('reverse', false, type),
    autoFocus,
    label,
    labelHelp: text('labelHelp', 'This text provides more information for the label.', type),
    onBlur: action('onBlur'),
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
    ),
    size: select('size', OptionsHelper.sizesBinary, 'small', type),
    value: text('value', type, type)
  });
}

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    info: {
      text: name.search('validations') !== -1 ? infoValidations : info,
      propTablesExclude: [State],
      excludedPropTypes: ['children']
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

function handleChange(ev, id) {
  const { checked } = ev.target;

  checkboxes[id].store.set({
    checked,
    forceUpdateTriggerToggle: !checked
  });

  action('change')(`checked: ${checked}`);
}

function handleGroupChange(ev, id) {
  const { checked } = ev.target;
  const count = Number(groupStore.get('value'));
  const value = checked ? count + 1 : count - 1;

  groupStore.set({
    value: value.toString(),
    [id]: checked,
    forceUpdateTriggerToggle: checked
  });
}

function handleSubmit(ev) {
  ev.preventDefault();
  action('submit')();
}

const checkboxComponent = () => {
  return (
    <State store={ checkboxes.default.store }>
      <Checkbox
        onChange={ ev => handleChange(ev, 'default') }
        { ...defaultKnobs() }
      />
    </State>
  );
};

const checkboxComponentAutoFocus = () => {
  boolean('autoFocus', true, 'Checkbox default');
  return checkboxComponent();
};

const checkboxGroupComponent = () => (
  <div>
    <h3>In Form</h3>
    <Form onSubmit={ handleSubmit }>
      {formCheckbox.map(type => (
        <State store={ checkboxes[type].store } key={ `check-state-${type}` }>
          <Checkbox
            id='checkbox'
            key={ `checkbox-input-${type}` }
            validations={ testValidator }
            warnings={ testWarning }
            info={ testInfo }
            onChange={ ev => handleChange(ev, type) }
            name={ `my-checkbox-${type}` }
            unblockValidation
            { ...defaultKnobs(type) }
          />
        </State>
      ))}
    </Form>

    <h3>In Group</h3>
    <State store={ groupStore }>
      {state => [
        <CheckboxGroup
          key='checkbox-group'
          name='checkbox-group'
          groupName='checkbox-group'
          label={ text('label', 'What would you choose?', 'group') }
          labelHelp={ text('labelHelp', 'Some helpful information', 'group') }
          validations={ testValidator }
          warnings={ testWarning }
          info={ testInfo }
          value={ state.value }
        >
          {groupCheckbox.map(id => (
            <Checkbox
              checked={ state[id] }
              name={ `checkbox-input-${id}` }
              key={ `checkbox-input-${id}` }
              onChange={ ev => handleGroupChange(ev, id) }
              { ...defaultKnobs(id) }
            />
          ))}
        </CheckboxGroup>
      ]}
    </State>
  </div>
);

storiesOf('Experimental/Checkbox', module)
  .add(...makeStory('default', dlsThemeSelector, checkboxComponent))
  .add(...makeStory('classic', classicThemeSelector, checkboxComponent))
  .add(...makeStory('validations', dlsThemeSelector, checkboxGroupComponent))
  .add(...makeStory('validations classic', classicThemeSelector, checkboxGroupComponent))
  .add(...makeStory('autoFocus', dlsThemeSelector, checkboxComponentAutoFocus));
