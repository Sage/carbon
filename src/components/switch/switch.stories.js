import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import {
  text, boolean, number, select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Switch from './switch';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import { notes, info } from './documentation';

const store = new Store({
  value: false
});

const handleChange = (event) => {
  store.set({ value: !store.get('value') });
  action('click')(event);
};

const numberConfig = {
  range: true,
  min: 0,
  max: 150,
  step: 1
};

storiesOf('Switch', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add(
    'default',
    () => {
      const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
      const fieldHelpInline = boolean('fieldHelpInline', false);
      const label = text('label', 'Example Switch');
      const labelHelp = text('labelHelp', 'This text provides more information for the label.');
      const labelInline = label ? boolean('labelInline', false) : undefined;
      const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
      const labelWidth = labelInline ? number('labelWidth', 0, numberConfig) : undefined;
      const inputWidth = number('inputWidth', 0, numberConfig);
      const reverse = boolean('reverse', Switch.defaultProps.reverse);
      const loading = boolean('loading', false);
      const children = text('children');

      return (
        <State store={ store }>
          <Switch
            onChange={ handleChange }
            fieldHelp={ fieldHelp }
            label={ label }
            labelHelp={ labelHelp }
            reverse={ reverse }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            labelAlign={ labelAlign }
            inputWidth={ inputWidth }
            fieldHelpInline={ fieldHelpInline }
            loading={ loading }
          >
            {children}
          </Switch>
        </State>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
