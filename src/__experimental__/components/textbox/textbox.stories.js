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

const defaultStoryPropsConfig = {
  inputWidthEnabled: true
};

storiesOf('Experimental/Textbox', module)

  .add('Basic', () => {
    return (
      <Textbox
        errorMessage={ text('errorMessage') }
        infoMessage={ text('infoMessage') }
        warningMessage={ text('warningMessage') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        placeholder={ text('placeholder') }
        { ...getCommonTextboxStoryProps() }
      />
    );
  })
  .add('Multiple', () => {
    return ([
      <Textbox
        errorMessage={ text('errorMessage') }
        infoMessage={ text('infoMessage') }
        warningMessage={ text('warningMessage') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        placeholder={ text('placeholder') }
        key='0'
        { ...getCommonTextboxStoryProps() }
      />,
      <Textbox
        errorMessage={ text('errorMessage') }
        infoMessage={ text('infoMessage') }
        warningMessage={ text('warningMessage') }
        size={ select('size', OptionsHelper.sizesRestricted) }
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

  return {
    disabled,
    readOnly,
    inputWidth,
    fieldHelp,
    label,
    labelHelp,
    labelInline,
    labelWidth,
    labelAlign
  };
}

export default getCommonTextboxStoryProps;
