import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import ButtonToggle from '../button-toggle/button-toggle';
import ButtonToggleGroup from './button-toggle-group';

storiesOf('Button Toggle Group', module)
  .addParameters({
    info: {
      propTablesExclude: [ButtonToggle],
      propTables: [ButtonToggleGroup]
    }
  }).add('default', () => {
    const label = text('label', 'Example ButtonToggleGroup');
    const labelHelp = text('labelHelp', 'This text provides more information for the label.');
    const inputWidth = text('inputWidth', '');
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const labelInline = boolean('labelInline', false);
    const labelWidth = labelInline ? text('labelWidth', '') : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;

    return (
      <ButtonToggleGroup
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
      >
        <ButtonToggle
          name='grouped'
          id='foo'
          value='foo'
        >
            Foo
        </ButtonToggle>
        <ButtonToggle
          name='grouped'
          id='bar'
          value='bar'
        >
            Bar
        </ButtonToggle>
        <ButtonToggle
          name='grouped'
          id='baz'
          value='baz'
        >
            Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    );
  }, {
    notes: { markdown: notes }
  });
