import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { Checkbox, CheckboxGroup } from '.';
import { info, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import AutoFocus from '../../../utils/helpers/auto-focus';

Checkbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /checkbox\.component(?!spec)/
);

const checkboxes = {
  default: {}, error: {}, warning: {}, info: {}, one: {}, two: {}, three: {}
};

const checkboxKeys = Object.keys(checkboxes);

checkboxKeys.forEach((id) => {
  checkboxes[id] = {
    store: new Store({
      checked: false
    })
  };
});
const validationCheckboxes = checkboxKeys.filter(name => ['error', 'warning', 'info'].indexOf(name) !== -1);
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


function defaultKnobs(type, autoFocusDefault = false) {
  let theType = '';
  if (type === undefined) {
    theType = 'default';
  } else {
    theType = type;
  }
  const label = `${text('label', 'Example Checkbox', type)} (${theType})`;
  const autoFocus = boolean('autoFocus', autoFocusDefault, type);
  const previous = {
    key: 'checkbox',
    autoFocus: autoFocusDefault
  };
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
    labelSpacing: select('labelSpacing', [1, 2], 1),
    size: select('size', OptionsHelper.sizesBinary, 'small', type),
    value: text('value', type, type)
  });
}

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTablesExclude: [State],
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

function handleChange(ev, id) {
  const { checked } = ev.target;

  checkboxes[id].store.set({
    checked
  });

  action('change')(`checked: ${checked}`);
}

function handleGroupChange(ev, id) {
  const { checked } = ev.target;
  const count = Number(groupStore.get('value'));
  const value = checked ? count + 1 : count - 1;

  groupStore.set({
    value: value.toString(),
    [id]: checked
  });
}

const checkboxComponent = (autoFocus = false) => () => {
  return (
    <State store={ checkboxes.default.store }>
      <Checkbox
        onChange={ ev => handleChange(ev, 'default') }
        { ...defaultKnobs(undefined, autoFocus) }
      />
    </State>
  );
};

const checkboxValidations = () => (
  <div>
    <h4>Applied to single Checkbox</h4>
    <h6>As string</h6>
    {validationCheckboxes.map(type => (
      <State store={ checkboxes[type].store } key={ `check-state-${type}` }>
        <Checkbox
          id={ `checkbox_${type}` }
          key={ `checkbox-input-${type}` }
          { ...{ [type]: 'Message' } }
          onChange={ ev => handleChange(ev, type) }
          name={ `my-checkbox-${type}` }
          { ...defaultKnobs(type) }
        />
      </State>
    ))}

    <h6>As boolean</h6>
    {validationCheckboxes.map(type => (
      <State store={ checkboxes[type].store } key={ `check-state-${type}-boolean` }>
        <Checkbox
          id={ `checkbox_${type}-boolean` }
          key={ `checkbox-input-${type}-boolean` }
          { ...{ [type]: true } }
          onChange={ ev => handleChange(ev, type) }
          name={ `my-checkbox-${type}-boolean` }
          { ...defaultKnobs(type) }
        />
      </State>
    ))}

    <h4>Applied to CheckboxGroup</h4>
    <h6>As string</h6>
    {validationCheckboxes.map(type => (
      <State store={ groupStore } key={ `check-state-group-${type}` }>
        {state => (
          <>
            <CheckboxGroup
              id='checkbox-group'
              name='checkbox-group'
              { ...{ [type]: 'Message' } }
              groupName='checkbox-group'
              label={ text('label', 'What would you choose?', 'group') }
              labelHelp={ text('labelHelp', 'Some helpful information', 'group') }
              value={ state.value }
            >
              {groupCheckbox.map(id => (
                <Checkbox
                  checked={ state[id] }
                  name={ `checkbox-input-${id}` }
                  onChange={ ev => handleGroupChange(ev, id) }
                  { ...defaultKnobs(id) }
                  key={ `checkbox-input-${id}` }
                />
              ))}
            </CheckboxGroup>
            <div style={ { marginTop: 24 } } />
          </>
        )}
      </State>
    ))}

    <h6>As bolean</h6>
    {validationCheckboxes.map(type => (
      <State key={ `check-state-group-${type}-boolean` } store={ groupStore }>
        {state => (
          <>
            <CheckboxGroup
              id='checkbox-group'
              name='checkbox-group'
              { ...{ [type]: true } }
              groupName='checkbox-group'
              label={ text('label', 'What would you choose?', 'group') }
              labelHelp={ text('labelHelp', 'Some helpful information', 'group') }
              value={ state.value }
            >
              {groupCheckbox.map(id => (
                <Checkbox
                  checked={ state[id] }
                  name={ `checkbox-input-${id}` }
                  onChange={ ev => handleGroupChange(ev, id) }
                  { ...defaultKnobs(id) }
                  key={ `checkbox-input-${id}` }
                />
              ))}
            </CheckboxGroup>
            <div style={ { marginTop: 24 } } />
          </>
        )}
      </State>
    ))}
  </div>
);

storiesOf('Experimental/Checkbox', module)
  .add(...makeStory('default', dlsThemeSelector, checkboxComponent()))
  .add(...makeStory('classic', classicThemeSelector, checkboxComponent(), true))
  .add(...makeStory('validations', dlsThemeSelector, checkboxValidations))
  .add(...makeStory('validations classic', classicThemeSelector, checkboxValidations, true))
  .add(...makeStory('autoFocus', dlsThemeSelector, checkboxComponent(true)));
