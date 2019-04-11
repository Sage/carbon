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

storiesOf('Experimental/Textarea', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add(
    'default',
    () => (
      <State store={ store }>
        <Textarea
          onChange={ handleChange }
          { ...getTextareaStoryProps() }
        />
      </State>
    ),
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );

function getTextareaStoryProps() {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const warnOverLimit = boolean('warnOverLimit', Textarea.defaultProps.warnOverLimit);
  const expandable = boolean('expandable', Textarea.defaultProps.expandable);
  const characterLimit = text('characterLimit', '');
  const enforceCharacterLimit = characterLimit ? boolean(
    'enforceCharacterLimit',
    Textarea.defaultProps.enforceCharacterLimit
  ) : undefined;
  const cols = number('cols', 0, rangeOptions);
  const rows = number('rows', 0, rangeOptions);
  const disabled = boolean('disabled', false);
  const readOnly = boolean('readOnly', false);
  const placeholder = text('placeholder', '');
  const fieldHelp = text('fieldHelp', '');
  const label = text('label', '');
  const labelHelp = label ? text('labelHelp', '') : undefined;
  const labelInline = label ? boolean('labelInline', false) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;

  return {
    warnOverLimit,
    expandable,
    characterLimit,
    enforceCharacterLimit,
    cols,
    rows,
    disabled,
    readOnly,
    placeholder,
    fieldHelp,
    label,
    labelHelp,
    labelInline,
    labelWidth,
    labelAlign
  };
}
