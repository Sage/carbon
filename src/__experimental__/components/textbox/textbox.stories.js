import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Textbox from '.';
import OptionsHelper from '../../../utils/helpers/options-helper';

storiesOf('Experimental/Textbox', module)
  .add('Basic', () => {
    return (
      <Textbox
        disabled={ boolean('disabled') }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warning={ text('warning') }
      />
    );
  })
  .add('Multiple', () => {
    return ([
      <Textbox
        disabled={ boolean('disabled') }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warning={ text('warning') }
        key='0'
      />,
      <Textbox
        disabled={ boolean('disabled') }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', OptionsHelper.alignBinary) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', OptionsHelper.sizesRestricted) }
        warning={ text('warning') }
        key='1'
      />
    ]);
  });
