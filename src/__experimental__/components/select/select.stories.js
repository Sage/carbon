import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import { Select, Option } from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

const singleSelectStore = new Store({
  value: undefined
});

const multiSelectStore = new Store({
  value: []
});

const commonKnobs = (store) => {
  return {
    disabled: boolean('disabled'),
    errorMessage: text('errorMessage'),
    infoMessage: text('infoMessage'),
    label: text('label'),
    labelAlign: select('labelAlign', OptionsHelper.alignBinary),
    labelInline: boolean('labelInline'),
    onChange: (ev) => { store.set({ value: ev.target.value }); },
    placeholder: text('placeholder'),
    readOnly: boolean('readOnly'),
    size: select('size', OptionsHelper.sizesRestricted),
    warningMessage: text('warningMessage'),
    typeAhead: boolean('typeAhead')
  };
};

const selectOptions = [
  <Option
    key='0'
    text='Amber'
    value='1'
  />,
  <Option
    key='1'
    text='Black'
    value='2'
  />,
  <Option
    key='2'
    text='Blue'
    value='3'
  />,
  <Option
    key='3'
    text='Brown'
    value='4'
  />,
  <Option
    key='4'
    text='Green'
    value='5'
  />,
  <Option
    key='5'
    text='Orange'
    value='6'
  />,
  <Option
    key='6'
    text='Pink'
    value='7'
  />,
  <Option
    key='7'
    text='Purple'
    value='8'
  />,
  <Option
    key='8'
    text='Red'
    value='9'
  />,
  <Option
    key='9'
    text='White'
    value='10'
  />,
  <Option
    key='10'
    text='Yellow'
    value='11'
  />
];

storiesOf('Experimental/Select', module)
  .add('Single Select', () => {
    return (
      <State store={ singleSelectStore }>
        <Select { ...commonKnobs(singleSelectStore) }>
          { selectOptions }
        </Select>
      </State>
    );
  })

  .add('Multi Select', () => {
    return (
      <State store={ multiSelectStore }>
        <Select { ...commonKnobs(multiSelectStore) }>
          { selectOptions }
        </Select>
      </State>
    );
  });
