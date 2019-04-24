import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import {
  boolean,
  select
} from '@storybook/addon-knobs';
import Form from '../form';
import Textbox from '../../__experimental__/components/textbox';
import TextboxLegacy from '../textbox';
import { Select, Option } from '../../__experimental__/components/select';
import PresenceValidator from '../../utils/validations/presence';
import { Row, Column } from '../row';
import OptionsHelper from '../../utils/helpers/options-helper';

const presenceStore = new Store({ value: '' });
const asyncStore = new Store({ value: '' });
const legacyStore = new Store({ value: '' });
const warningStore = new Store({ value: '' });
const infoStore = new Store({ value: '' });
const allStore = new Store({ value: '' });

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

storiesOf('Validations', module)
  .addParameters({
    info: {
      propTablesExclude: [Column, Row, Form, Textbox, State]
    }
  })
  .add('Basic', () => {
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
                onChange={ ev => infoStore.set({ value: ev.target.value }) }
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
                validations={ new PresenceValidator() }
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

        <Row columns='2'>
          <Column>
            <State store={ legacyStore }>
              <TextboxLegacy
                label='Legacy Validation (decorators)'
                validations={ [new PresenceValidator()] }
                onChange={ ev => legacyStore.set({ value: ev.target.value }) }
                fieldHelp='This example uses the old decorator Textbox (now deprecated).'
                labelInline={ boolean('labelInline') }
                size={ select('size', OptionsHelper.sizesRestricted) }
              />
            </State>
          </Column>
        </Row>
      </Form>
    );
  });
