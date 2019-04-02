import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import Decimal from './decimal.component';
import Textbox from '../textbox';
import getTextboxStoryProps from '../textbox/textbox.stories';
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
      propTablesExclude: [State],
      propTables: [Textbox]
    }
  }).add('default', () => {
    const align = select(
      'align',
      OptionsHelper.alignBinary,
      Decimal.defaultProps.align
    );
    const precision = number('precision', Decimal.defaultProps.precision);

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
