import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import {
  boolean,
  select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import Form from '../../__deprecated__/components/form';
import Textbox from '../../__experimental__/components/textbox';
import ButtonToggleGroup from '../button-toggle-group';
import ButtonToggle from '../button-toggle';
import { Select, Option } from '../../__experimental__/components/select';
import PresenceValidator from '../../utils/validations/presence';
import { Row, Column } from '../row';
import OptionsHelper from '../../utils/helpers/options-helper';
import Textarea from '../../__experimental__/components/textarea';

const presenceStore = new Store({ value: '' });
const asyncStore = new Store({ value: '' });
const legacyStore = new Store({ value: '' });
const warningStore = new Store({ value: '' });
const infoStore = new Store({ value: '' });
const allStore = new Store({ value: '' });
const buttonToggleGroupStore = new Store({ value: '' });

const promiseValidator = value => new Promise((resolve, reject) => {
  if (value) {
    resolve();
  } else {
    reject(new Error('This field is required!'));
  }
});

const warningValidator = value => new Promise((resolve, reject) => {
  if (value.includes('warning')) {
    resolve();
  } else {
    reject(new Error('This value must include the word "warning"!'));
  }
});

const infoValidator = value => new Promise((resolve, reject) => {
  if (value === 'valid') {
    resolve();
  } else {
    reject(new Error('You must select "Blue"!'));
  }
});

const asyncValidator = value => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (value.includes('valid')) {
      resolve();
    } else {
      reject(new Error('This value must include the word "valid"!'));
    }
  }, 2000);
});

function makeBasicStory(name, themeSelector) {
  const component = () => {
    return (
      <Form>
        <Row>
          <Column>
            <State store={ presenceStore }>
              <Textbox
                label='Presence Validator'
                validations={ promiseValidator }
                onChange={ ev => presenceStore.set({ value: ev.target.value }) }
                fieldHelp='This example uses a promise based validator to check for presence.'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              />
            </State>
          </Column>

          <Column>
            <State store={ asyncStore }>
              <Textbox
                label='Async Validator'
                validations={ asyncValidator }
                onChange={ ev => asyncStore.set({ value: ev.target.value }) }
                fieldHelp='This async validator will pause for 2 seconds before it validates.
                  It requires a value of "valid" to pass.'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              />
            </State>
          </Column>
        </Row>

        <Row>
          <Column>
            <State store={ infoStore }>
              <Select
                label='Info'
                info={ infoValidator }
                onChange={ ev => infoStore.set({ value: ev.target.value[0].optionValue }) }
                fieldHelp='This example uses an info validator, these do not block form
                  submission and are not flagged by the form.'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              >
                <Option text='Blue' value='valid' />
                <Option text='Red' value='invalid1' />
                <Option text='White' value='invalid2' />
              </Select>
            </State>
          </Column>

          <Column>
            <State store={ warningStore }>
              <Textbox
                label='Warning'
                warnings={ warningValidator }
                onChange={ ev => warningStore.set({ value: ev.target.value }) }
                fieldHelp='This example uses a warning validator, these do not block form submission.'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              />
            </State>
          </Column>
        </Row>

        <Row>
          <Column>
            <State store={ legacyStore }>
              <Textbox
                label='Legacy Validation'
                validations={ [new PresenceValidator()] }
                onChange={ ev => legacyStore.set({ value: ev.target.value }) }
                fieldHelp='This example uses a deprecated validator in the form of a class instance.'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              />
            </State>
          </Column>

          <Column>
            <State store={ allStore }>
              <Textbox
                label='All Validations'
                validations={ [promiseValidator, asyncValidator] }
                warnings={ warningValidator }
                info={ infoValidator }
                onChange={ ev => allStore.set({ value: ev.target.value }) }
                fieldHelp='This example uses all of the validations above! It will fail fast, reporting
                  any failing validations without waiting for asynchronous ones to complete.'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              />
            </State>
          </Column>
        </Row>
      </Form>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

function makeButtonToggleGroupStory(name, themeSelector) {
  const component = () => {
    const test = value => new Promise((resolve, reject) => {
      if (value === 'baz') return resolve(true);
      return reject(Error('Baz is required!'));
    });

    return (
      <Form
        onSubmit={ handleSubmit }
      >
        <State store={ buttonToggleGroupStore }>
          <ButtonToggleGroup
            label='ButtonToggle Validation'
            labelHelp='Returns error unless "Baz" value selected'
            fieldHelp='Click save to run validation'
            validations={ test }
          >
            {['foo', 'bar', 'baz'].map(value => (
              <ButtonToggle
                name='button-toggle-group'
                value={ value }
                onChange={ handleChange }
                key={ `button-toggle-validation-${value}` }
              >
                {value}
              </ButtonToggle>
            ))}
          </ButtonToggleGroup>
        </State>
      </Form>
    );
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Validations', module)
  .addParameters({
    info: {
      propTablesExclude: [ButtonToggle, ButtonToggleGroup, Column, Row, Form, Textbox, State, Textarea]
    }
  })
  .add(...makeBasicStory('Basic', dlsThemeSelector))
  .add(...makeBasicStory('Basic classic', classicThemeSelector))
  .add(...makeButtonToggleGroupStory('ButtonToggleGroup', dlsThemeSelector))
  .add(...makeButtonToggleGroupStory('ButtonToggleGroup classic', classicThemeSelector));

function handleSubmit(ev) {
  ev.preventDefault();
  action('submit')();
}

function handleChange(ev) {
  action('change')();
  buttonToggleGroupStore.set({ value: ev.target.value });
}
