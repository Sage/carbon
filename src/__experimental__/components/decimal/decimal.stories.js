import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import Decimal from './decimal.component';
import Textbox, { OriginalTextbox } from '../textbox';
import getTextboxStoryProps from '../textbox/textbox.stories';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { info, notes } from './documentation';

const store = new Store({
  value: Decimal.defaultProps.value
});

const setValue = (ev) => {
  action('onChange')(ev);
  store.set({ value: ev.target.value });
};

storiesOf('Experimental/Decimal Input', module)
  .addParameters({
    info: {
      text: info,
      propTablesExclude: [State, Textbox],
      propTables: [OriginalTextbox]
    }
  }).add('default', () => {
    const precisionRange = {
      range: true,
      min: 0,
      max: Decimal.defaultProps.maxPrecision,
      step: 1
    };
    const align = select(
      'align',
      OptionsHelper.alignBinary,
      Decimal.defaultProps.align
    );
    const precision = number('precision', Decimal.defaultProps.precision, precisionRange);

    return (
      <State store={ store }>
        <Decimal
          { ...getTextboxStoryProps() }
          align={ align }
          precision={ precision }
          value={ store.get('value') }
          onChange={ setValue }
        />
      </State>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
