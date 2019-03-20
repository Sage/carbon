import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs';
import Number from './number.component';
import notes from './notes.md';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

storiesOf('Experimental/Number Input', module)
  .add('default', () => {
    const disabled = boolean('disabled', false);
    const readOnly = boolean('readOnly', false);
    const fieldHelp = text('fieldHelp', '');
    const label = text('label', '');
    const labelHelp = label ? text('labelHelp') : undefined;
    const labelInline = label ? boolean('labelInline', false) : undefined;
    const labelWidth = labelInline ? number('labelWidth', '') : undefined;
    const inputWidth = labelInline ? number('inputWidth', '') : undefined;
    const labelAlign = labelInline ? select(
      'labelAlign',
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ) : undefined;
    const uncontrolled = boolean('uncontrolled', false);
    const initialValue = uncontrolled ? '123456' : undefined;
    const onChangeDeferred = boolean('onChangeDeferred', false);
    const deferTimeout = onChangeDeferred ? number('deferTimeout') : undefined;

    return (
      <Number
        value={ initialValue }
        disabled={ disabled }
        readOnly={ readOnly }
        inputWidth={ inputWidth }
        fieldHelp={ fieldHelp }
        label={ label }
        labelHelp={ labelHelp }
        labelInline={ labelInline }
        labelWidth={ labelWidth }
        labelAlign={ labelAlign }
        onChange={ action('onChange') }
        onKeyDown={ action('onKeyDown') }
        onChangeDeferred={ onChangeDeferred ? action('onChangeDeferred') : undefined }
        deferTimeout={ deferTimeout }
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
            {'import Number from "carbon-react/lib/components/number";'}
          </StoryCode>

          <p>To render a Number:</p>

          <StoryCode padded>
            {'<Number name="myNumber" />'}
          </StoryCode>
        </div>
      )
    },
    notes: { markdown: notes }
  });
