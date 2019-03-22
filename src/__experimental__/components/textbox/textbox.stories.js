import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
  select,
  number
} from '@storybook/addon-knobs';
import Textbox from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

storiesOf('Experimental/Textbox', module)
  .add('Basic', () => {
    return (
      <Textbox
        error={ text('error') }
        info={ text('info') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warning={ text('warning') }
        { ...getTextboxStoryProps() }
      />
    );
  })
  .add('Multiple', () => {
    return ([
      <Textbox
        error={ text('error') }
        info={ text('info') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warning={ text('warning') }
        key='0'
        { ...getTextboxStoryProps() }
      />,
      <Textbox
        error={ text('error') }
        info={ text('info') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warning={ text('warning') }
        key='1'
        { ...getTextboxStoryProps() }
      />
    ]);
  });


function getTextboxStoryProps() {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const disabled = boolean('disabled', false);
  const readOnly = boolean('readOnly', false);
  const placeholder = text('placeholder');
  const fieldHelp = text('fieldHelp', '');
  const label = text('label', '');
  const labelHelp = label ? text('labelHelp') : undefined;
  const labelInline = label ? select('labelInline', OptionsHelper.alignBinary) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const inputWidth = labelInline ? number('inputWidth', 70, percentageRange) : undefined;
  const labelAlign = labelInline ? select(
    'labelAlign',
    OptionsHelper.alignBinary,
    OptionsHelper.alignBinary[0]
  ) : undefined;

  return {
    disabled,
    readOnly,
    placeholder,
    inputWidth,
    fieldHelp,
    label,
    labelHelp,
    labelInline,
    labelWidth,
    labelAlign
  };
}

export default getTextboxStoryProps;
