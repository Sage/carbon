import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import OptionsHelper from '../../../utils/helpers/options-helper';
import Textarea from '.';
import { notes, info } from './documentation';

const store = new Store({
  value: ''
});

const handleChange = ({ target: { value } }) => {
  store.set({ value });
};

const rangeOptions = {
  range: true,
  min: 0,
  max: 300,
  step: 1
};
const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

storiesOf('Experimental/Textarea', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add(
    'default',
    () => {
      const expandable = boolean('expandable', Textarea.defaultProps.expandable);
      const cols = number('cols', 0, rangeOptions);
      const rows = number('rows', 0, rangeOptions);
      const disabled = boolean('disabled', false);
      const readOnly = boolean('readOnly', false);
      const placeholder = text('placeholder', '');
      const fieldHelp = text('fieldHelp', '');
      const characterLimit = text('characterLimit', '');
      const inputWidth = number('inputWidth', 100, percentageRange);
      const warnOverLimit = characterLimit ? boolean('warnOverLimit', Textarea.defaultProps.warnOverLimit) : undefined;
      const enforceCharacterLimit = characterLimit ? boolean(
        'enforceCharacterLimit',
        Textarea.defaultProps.enforceCharacterLimit
      ) : undefined;
      const label = text('label', '');
      const labelHelp = label ? text('labelHelp', '') : undefined;
      const labelInline = label ? boolean('labelInline', false) : undefined;
      const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
      const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;

      return (
        <State store={ store }>
          <Textarea
            onChange={ handleChange }
            warnOverLimit={ warnOverLimit }
            expandable={ expandable }
            characterLimit={ characterLimit }
            enforceCharacterLimit={ enforceCharacterLimit }
            cols={ cols }
            rows={ rows }
            disabled={ disabled }
            readOnly={ readOnly }
            placeholder={ placeholder }
            fieldHelp={ fieldHelp }
            label={ label }
            labelHelp={ labelHelp }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            inputWidth={ inputWidth }
            labelAlign={ labelAlign }
          />
        </State>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
