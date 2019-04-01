import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import Decimal from './decimal.component';
import OptionsHelper from '../../../utils/helpers/options-helper';
import notes from './documentation';

const store = new Store({
  value: Decimal.defaultProps.value
});

const setValue = (evt) => {
  action('onChange')(evt);
  store.set({ value: evt.target.value });
};

storiesOf('Experimental/Decimal', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add('default', () => {
    const align = select(
      'align',
      OptionsHelper.alignBinary,
      Decimal.defaultProps.align
    );
    const precision = number('precision', Decimal.defaultProps.precision);
    const inputWidth = number('inputWidth', Decimal.defaultProps.inputWidth);
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const label = text('label', 'Example Decimal');
    const labelInline = label ? boolean('labelInline', false) : undefined;
    const labelWidth = labelInline ? number('labelWidth', 30) : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const labelHelp = label ? text('labelHelp', 'This text provides help for the label.') : undefined;

    return (
      <State store={ store }>
        <Decimal
          align={ align }
          precision={ precision }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          value={ store.get('value') }
          onChange={ setValue }
        />
      </State>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
