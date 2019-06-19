import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import InlineInputs from './inline-inputs.component';
import Textbox from '../../__experimental__/components/textbox';
import Decimal from '../../__experimental__/components/decimal';
import { Select, Option } from '../../__experimental__/components/select';

const singleSelectStore = new Store({
  decimalValue: '0.00',
  selectValue: {
    value: '1',
    text: 'Amber'
  }
});

const handleDecimalChange = (ev) => {
  singleSelectStore.set({
    decimalValue: ev.target.value
  });
};

const handleSelectChange = (ev) => {
  singleSelectStore.set({
    selectValue: ev.target.value
  });
};

storiesOf('InlineInputs', module)
  .addParameters({
    info: {
      propTables: [InlineInputs],
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const label = text('label', 'Inline Inputs');

    return (
      <State store={ singleSelectStore }>
        { state => (
          <InlineInputs label={ label }>
            <Textbox />
            <Decimal value={ state.decimalValue } onChange={ handleDecimalChange } />
            <Select value={ state.selectValue } onChange={ handleSelectChange }>
              <Option text='Amber' value='1' />
              <Option text='Black' value='2' />
              <Option text='Blue' value='3' />
              <Option text='Brown' value='4' />
              <Option text='Green' value='5' />
              <Option text='Orange' value='6' />
              <Option text='Pink' value='7' />
              <Option text='Purple' value='8' />
              <Option text='Red' value='9' />
              <Option text='White' value='10' />
              <Option text='Yellow' value='11' />
            </Select>
          </InlineInputs>
        )}
      </State>
    );
  }, {
    knobs: { escapeHTML: false }
  });
