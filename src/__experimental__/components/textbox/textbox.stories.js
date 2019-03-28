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

// set the display name so the story source makes sense
Textbox.displayName = 'Textbox';

storiesOf('Experimental/Textbox', module)
  .add('Basic', () => {
    return (
      <Textbox { ...getTextboxStoryProps() } />
    );
  })
  .add('Multiple', () => {
    return ([
      <Textbox key='0' { ...getTextboxStoryProps() } />,
      <Textbox key='1' { ...getTextboxStoryProps() } />
    ]);
  });


function getTextboxStoryProps() {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const disabled = boolean('disabled');
  const readOnly = boolean('readOnly');
  const placeholder = text('placeholder');
  const fieldHelp = text('fieldHelp');
  const label = text('label');
  const labelHelp = label ? text('labelHelp') : undefined;
  const labelInline = label ? boolean('labelInline') : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const inputWidth = labelInline ? number('inputWidth', 70, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
  const errorMessage = text('errorMessage');
  const infoMessage = text('infoMessage');
  const warningMessage = text('warningMessage');
  const size = select('size', OptionsHelper.sizesRestricted);

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
    labelAlign,
    errorMessage,
    infoMessage,
    warningMessage,
    size
  };
}

export default getTextboxStoryProps;
