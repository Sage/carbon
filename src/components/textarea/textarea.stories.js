import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, text, select
} from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import Textarea from './textarea';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import { StoryHeader, StoryCode } from '../../../.storybook/style/storybook-info.styles';

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

storiesOf('Textarea', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  }).add(
    'default',
    () => {
      const { alignBinary } = OptionsHelper;

      const warnOverLimit = boolean('warnOverLimit', Textarea.defaultProp.warnOverLimit);
      const labelInline = boolean('labelInline', false);
      const fieldHelpInline = boolean('fieldHelpInline', false);
      const expandable = boolean('expandable', Textarea.defaultProp.expandable);
      const characterLimit = number('characterLimit', 50, rangeOptions);
      const enforceCharacterLimit = characterLimit ? boolean(
        'enforceCharacterLimit',
        Textarea.defaultProp.enforceCharacterLimit
      ) : undefined;
      const inputWidth = number('inputWidth', 0, rangeOptions);
      const labelWidth = labelInline ? number('labelWidth', 0, rangeOptions) : undefined;
      const cols = number('cols', 0, rangeOptions);
      const rows = number('rows', 0, rangeOptions);
      const label = text('label', 'Example Textarea');
      const labelHelp = text('labelHelp', 'This text provides more information for the label.');
      const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
      const labelAlign = labelInline ? select('labelAlign', alignBinary, alignBinary[0]) : undefined;

      return (
        <State store={ store }>
          <Textarea
            warnOverLimit={ warnOverLimit }
            labelInline={ labelInline }
            labelAlign={ labelAlign }
            enforceCharacterLimit={ enforceCharacterLimit }
            characterLimit={ String(characterLimit) }
            labelWidth={ labelWidth }
            cols={ cols }
            fieldHelpInline={ fieldHelpInline }
            expandable={ expandable }
            label={ label }
            labelHelp={ labelHelp }
            rows={ rows }
            fieldHelp={ fieldHelp }
            inputWidth={ inputWidth }
            onChange={ handleChange }
          />
        </State>
      );
    },
    {
      info: {
        text: (
          <div>
            <p>Textarea component</p>

            <StoryHeader> Implementation</StoryHeader>

            <StoryCode padded>import Textarea from {'carbon-react/lib/components/textarea'}</StoryCode>

            <p>To render a Textarea:</p>
            <StoryCode padded>{'<Textarea name="myTextarea" />'}</StoryCode>
          </div>
        )
      }
    },
    { notes: { markdown: notes } }
  );
