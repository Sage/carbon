import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { Row, Column } from '../row';
import Textbox from '../../__experimental__/components/textbox';
import Decimal from '../../__experimental__/components/decimal';
import NumberInput from '../../__experimental__/components/number';
import GroupedCharacter from '../../__experimental__/components/grouped-character';
import Button, { OriginalButton } from '../button';
import { StoryHeader } from '../../../.storybook/style/storybook-info.styles';

const decimalStore = new Store({ value: '' });
const numberInputStore = new Store({ value: '' });
const groupedCharacterStore = new Store({ value: '' });

const getTextboxProps = () => {
  return {
    labelInline: true
  };
};

storiesOf('Validations', module)
  .addParameters({
    info: {
      text: (<StoryHeader>Validations for simple Textbox based Components</StoryHeader>),
      propTablesExclude: [
        Button,
        OriginalButton,
        Column,
        Row,
        Textbox,
        State,
        Decimal,
        NumberInput,
        GroupedCharacter
      ],
      source: false
    }
  })
  .add('textbox based', () => {
    return (
      <div>
        <Row>
          <Column>
            <State store={ decimalStore }>
              <Decimal
                label='Decimal Component'
                validations={ numberErrorValidator }
                warnings={ numberWarningValidator }
                info={ numberInfoValidator }
                onChange={ ev => decimalStore.set({ value: ev.target.value }) }
                fieldHelp='Error: number lesser than "11.0", Warning: number equals "12.0", Info: number equals "13.0"'
                { ...getTextboxProps() }
              />
            </State>
          </Column>

          <Column>
            <State store={ numberInputStore }>
              <NumberInput
                label='Number Input Component'
                validations={ numberErrorValidator }
                warnings={ numberWarningValidator }
                info={ numberInfoValidator }
                onChange={ ev => numberInputStore.set({ value: ev.target.value }) }
                fieldHelp='Error: number lesser than "11", Warning: number equals "12", Info: number equals "13"'
                { ...getTextboxProps() }
              />
            </State>
          </Column>
        </Row>

        <Row>
          <Column>
            <State store={ groupedCharacterStore }>
              <GroupedCharacter
                label='Grouped Character Component'
                separator='-'
                groups={ [2, 2, 4] }
                validations={ groupedCharacterErrorValidator }
                warnings={ groupedCharacterWarningValidator }
                info={ groupedCharacterInfoValidator }
                onChange={ ev => groupedCharacterStore.set({ value: ev.target.value }) }
                fieldHelp='Error: incomplete field, Warning: includes "ab", Info: includes "%"'
                { ...getTextboxProps() }
              />
            </State>
          </Column>
        </Row>

        <Row>
          <Column>
            <Button onClick={ triggerErrors }>Trigger Errors</Button>
            <Button onClick={ triggerWarnings }>Trigger Warnings</Button>
            <Button onClick={ triggerInfo }>Trigger Info</Button>
          </Column>
        </Row>
      </div>
    );
  });

function numberErrorValidator(value) {
  return new Promise((resolve, reject) => {
    if (value > 11) {
      resolve();
    } else {
      reject(new Error('The number must be greater than 11!'));
    }
  });
}

function numberWarningValidator(value) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    if (value != 12) {
      resolve();
    } else {
      reject(new Error('The number cannot be 12!'));
    }
  });
}

function numberInfoValidator(value) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    if (value != 13) {
      resolve();
    } else {
      reject(new Error('Number "13" is not recommended'));
    }
  });
}

function groupedCharacterErrorValidator(value) {
  return new Promise((resolve, reject) => {
    if (value.length === 8) {
      resolve();
    } else {
      reject(new Error('Incomplete field!'));
    }
  });
}

function groupedCharacterWarningValidator(value) {
  return new Promise((resolve, reject) => {
    if (!value.includes('ab')) {
      resolve();
    } else {
      reject(new Error('Must not include "ab"!'));
    }
  });
}

function groupedCharacterInfoValidator(value) {
  return new Promise((resolve, reject) => {
    if (!value.includes('%')) {
      resolve();
    } else {
      reject(new Error('Usage of "%" character is not recommended'));
    }
  });
}

function triggerErrors() {
  numberInputStore.set({ value: '10' });
  decimalStore.set({ value: '10' });
  groupedCharacterStore.set({ value: '123456' });
}

function triggerWarnings() {
  numberInputStore.set({ value: '12' });
  decimalStore.set({ value: '12' });
  groupedCharacterStore.set({ value: '123456ab' });
}

function triggerInfo() {
  numberInputStore.set({ value: '13' });
  decimalStore.set({ value: '13' });
  groupedCharacterStore.set({ value: '1234567%' });
}
