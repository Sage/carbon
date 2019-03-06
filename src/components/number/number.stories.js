import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs';
import Number from './number';
import notes from './notes.md';
import OptionsHelper from '../../utils/helpers/options-helper';

storiesOf('Number Input', module)
  .add('default', () => {
    const inputWidth = text('inputWidth', '');
    const timeToDisappear = number('timeToDisappear', 0);
    const fieldHelp = text('fieldHelp', 'This text provides help for the input.');
    const fieldHelpInline = boolean('fieldHelpInline', false);
    const label = text('label', 'Example NumberInput');
    const labelInline = label ? boolean('labelInline', false) : undefined;
    const labelWidth = labelInline ? text('labelWidth', '') : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const labelHelp = text('LabelHelp', 'This text provides more information for the label.');

    return (
      <Number
        inputWidth={ inputWidth }
        timeToDisappear={ timeToDisappear }
        fieldHelp={ fieldHelp }
        fieldHelpInline={ fieldHelpInline }
        label={ label }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        labelHelp={ labelHelp }
      />
    );
  }, {
    info: {
      text: `
        # A number widget.

        It only allows entering of a whole number with an optional minus sign.

        ## How to use a Number in a component:

        In your file

        ~~~JS
        import Number from 'carbon-react/lib/components/number';
        ~~~

        To render a Number:

        ~~~JS
        <Number name="myNumber" />
        ~~~
      `
    },
    notes: { markdown: notes }
  });
