import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Textbox from '.';

storiesOf('Experimental/Textbox', module)
  .add('Basic', () => {
    return (
      <Textbox
        disabled={ boolean('disabled') }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', ['left', 'right']) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', ['small', 'medium', 'large']) }
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
        labelAlign={ select('labelAlign', ['left', 'right']) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', ['small', 'medium', 'large']) }
        warning={ text('warning') }
        key='0'
      />,
      <Textbox
        disabled={ boolean('disabled') }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', ['left', 'right']) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline') }
        placeholder={ text('placeholder') }
        readOnly={ boolean('readOnly') }
        size={ select('size', ['small', 'medium', 'large']) }
        warning={ text('warning') }
        key='1'
      />
    ]);
  });
