import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  number, select, boolean
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import Decimal from './decimal.component';
import Textbox, { OriginalTextbox } from '../textbox';
import getTextboxStoryProps from '../textbox/textbox.stories';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { info, notes } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

OriginalTextbox.__docgenInfo = getDocGenInfo(
  require('../textbox/docgenInfo.json'),
  /textbox\.component(?!spec)/
);

Decimal.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /decimal\.component(?!spec)/
);

const store = new Store({
  value: '0.00'
});

const setValue = (ev) => {
  action('onChange')(ev);
  store.set({ value: ev.target.value.rawValue });
};

function makeStory(name, themeSelector) {
  const component = () => {
    const precisionRange = {
      range: true,
      min: 0,
      max: 15,
      step: 1
    };
    const align = select(
      'align',
      OptionsHelper.alignBinary,
      Decimal.defaultProps.align
    );
    const precision = number('precision', Decimal.defaultProps.precision, precisionRange);
    const allowEmptyValue = boolean('allowEmptyValue', false);

    return (
      <State store={ store }>
        <Decimal
          { ...getTextboxStoryProps() }
          align={ align }
          precision={ precision }
          value={ store.get('value') }
          onChange={ setValue }
          allowEmptyValue={ allowEmptyValue }
          onBlur={ action('onBlur') }
        />
      </State>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Decimal Input', module)
  .addParameters({
    info: {
      text: info,
      propTablesExclude: [State, Textbox],
      propTables: [OriginalTextbox]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
