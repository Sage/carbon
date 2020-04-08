import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import Number from './number';
import notes from './notes.md';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

Number.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /number(?!spec)/
);

storiesOf('__deprecated__/Number Input', module)
  .add('classic', () => {
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
      text: (
        <div>
          <p>A number widget.</p>

          <p>It only allows entering of a whole number with an optional minus sign.</p>

          <StoryHeader>Implementation</StoryHeader>

          <p>In your file</p>

          <StoryCode padded>
            import Number from &quot;carbon-react/lib/components/number&quot;;
          </StoryCode>

          <p>To render a Number:</p>

          <StoryCode padded>
            {'<Number name="myNumber" />'}
          </StoryCode>
        </div>
      )
    },
    notes: { markdown: notes },
    themeSelector: classicThemeSelector
  });
