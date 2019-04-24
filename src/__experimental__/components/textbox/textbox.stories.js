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

const defaultStoryPropsConfig = {
  inputWidthEnabled: true
};

storiesOf('Experimental/Textbox', module)

  .add('Basic', () => {
    return (
      <Textbox
        placeholder={ text('placeholder') }
        { ...getCommonTextboxStoryProps() }
      />
    );
  })
  .add('Multiple', () => {
    return ([

      <Textbox
        placeholder={ text('placeholder') }
        key='0'
        { ...getCommonTextboxStoryProps() }
      />,
      <Textbox
        placeholder={ text('placeholder') }
        key='1'
        { ...getCommonTextboxStoryProps() }
      />
    ]);
  });


function getCommonTextboxStoryProps(config = defaultStoryPropsConfig) {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
  };
  const disabled = boolean('disabled', false);
  const readOnly = boolean('readOnly', false);
  const fieldHelp = text('fieldHelp');
  const label = text('label');
  const labelHelp = label ? text('labelHelp') : undefined;
  const labelInline = label ? boolean('labelInline', false) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const inputWidth = labelInline && config.inputWidthEnabled ? number('inputWidth', 100, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;
  const errorMessage = text('errorMessage');
  const infoMessage = text('infoMessage');
  const warningMessage = text('warningMessage');
  const size = select('size', OptionsHelper.sizesRestricted);

  return {
    disabled,
    readOnly,
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

export default getCommonTextboxStoryProps;
