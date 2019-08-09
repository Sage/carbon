import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import Form from '../form';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Checkbox from '.';
import { info, notes, infoValidations } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Checkbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /checkbox\.component(?!spec)/
);

const checkTypes = ['one', 'required', 'optional'];
const checkboxes = {};

checkTypes.forEach((type) => {
  checkboxes[type] = {
    store: new Store({ checked: false }),

    validator: (value, props) => new Promise((resolve, reject) => {
      if (value === 'required' && !props.checked) {
        reject(new Error('This checkbox is required!'));
      } else {
        resolve();
      }
    })
  };
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
      <Form onSubmit={ handleSubmit }>
        {checkTypes.map(type => type !== 'one' && (
          <State store={ checkboxes[type].store } key={ `check-state-${type}` }>
            <Checkbox
              key={ `checkbox-input-${type}` }
              validations={ checkboxes[type].validator }
              onChange={ ev => handleChange(ev, type) }
              name={ `my-checkbox-${type}` }
              { ...defaultKnobs(type) }
            />
          </State>
        ))}
      </Form>
    );
  }, {
    info: {
      source: false,
      text: infoValidations,
      propTablesExclude: [State, Checkbox]
    }
  });

function handleChange(ev, type = 'one') {
  action('change')();

  checkboxes[type].store.set({
    checked: ev.target.checked
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
