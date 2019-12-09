import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import { Row, Column } from '../row';
import Textbox from '../../__experimental__/components/textbox';
import Decimal from '../../__experimental__/components/decimal';
import NumberInput from '../../__experimental__/components/number';
import GroupedCharacter from '../../__experimental__/components/grouped-character';
import Button from '../button';
import { StoryHeader } from '../../../.storybook/style/storybook-info.styles';
import OptionsHelper from '../../utils/helpers/options-helper';

const decimalStore = new Store({ value: '0.00' });
const numberInputStore = new Store({ value: '' });
const groupedCharacterStore = new Store({ value: '' });
const getStoryProps = () => ({
  disabled: boolean('disabled', false),
  readOnly: boolean('readOnly', false),
  size: select('size', OptionsHelper.sizesRestricted, 'medium')
});

function makeStory(name, themeSelector) {
  const component = () => {
    const storyProps = getStoryProps();

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
                onChange={ ev => decimalStore.set({ value: ev.target.value.rawValue }) }
                fieldHelp='Error: number lesser than "11.0", Warning: number equals "12.0", Info: number equals "13.0"'
                { ...storyProps }
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
                { ...storyProps }
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
                { ...storyProps }
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
  };

  const metadata = {
    themeSelector
  };

  return [name, component, metadata];
}

storiesOf('Validations', module)
  .addParameters({
    info: {
      text: (<StoryHeader>Validations for simple Textbox based Components</StoryHeader>),
      propTablesExclude: [
        Button,
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
  .add(...makeStory('textbox based', dlsThemeSelector))
  .add(...makeStory('textbox based classic', classicThemeSelector));

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
