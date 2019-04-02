import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  select, number, text, boolean
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';
import Decimal from './decimal.js';

const store = new Store({
  value: '0'
});
const handleChange = (event) => {
  action('changed')(event);

  store.set({ value: event.target.value });
};

storiesOf('Decimal', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    const align = select('align', OptionsHelper.alignBinary, Decimal.defaultProps.align);
    const precision = number('precision', Decimal.defaultProps.precision, {
      range: true,
      min: 0,
      max: 20,
      step: 1
    });
    const timeToDisappear = number('timeToDisappear', 0, {
      range: true,
      min: 0,
      max: 150,
      step: 10
    });
    const label = text('label', 'Example Decimal');
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const inputWidth = number('inputWidth', 0, {
      range: true,
      min: 0,
      max: 150,
      step: 10
    });
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? number('labelWidth', 0, {
      range: true,
      min: 0,
      max: 150,
      step: 10
    }) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign', OptionsHelper.alignBinary, OptionsHelper.alignBinary[0]
    ) : undefined;

    return (
      <State store={ store }>
        <Decimal
          onChange={ handleChange }
          align={ align }
          precision={ precision }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          value={ store.get('value') }
        />
      </State>
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  });
