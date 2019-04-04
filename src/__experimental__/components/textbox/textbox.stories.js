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
        errorMessage={ text('errorMessage') }
        infoMessage={ text('infoMessage') }
        warningMessage={ text('warningMessage') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        { ...getTextboxStoryProps() }
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
        key='0'
        { ...getTextboxStoryProps() }
      />,
      <Textbox
        errorMessage={ text('errorMessage') }
        infoMessage={ text('infoMessage') }
        warningMessage={ text('warningMessage') }
        size={ select('size', OptionsHelper.sizesRestricted) }
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
  const fieldHelp = text('fieldHelp');
  const inputWidth = number('inputWidth', 100, percentageRange);
  const label = text('label');
  const labelHelp = label ? text('labelHelp') : undefined;
  const labelInline = label ? boolean('labelInline', false) : undefined;
  const labelWidth = labelInline ? number('labelWidth', 30, percentageRange) : undefined;
  const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : undefined;

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
