import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Textbox from '.';

storiesOf('Experimental/Textbox', module)
  .add('Basic', () => {
    return (
      <Textbox
        disabled={ boolean('disabled', false) }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', ['left', 'right']) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline', false) }
        placeholder={ text('placeholder', 'placeholder text') }
        readOnly={ boolean('readOnly', false) }
        size={ select('size', ['small', 'medium', 'large'], 'medium') }
        warning={ text('warning') }
      />
    );
  })
  .add('Multiple', () => {
    return ([
      <Textbox
        disabled={ boolean('disabled', false) }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', ['left', 'right']) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline', false) }
        placeholder={ text('placeholder', 'placeholder text') }
        readOnly={ boolean('readOnly', false) }
        size={ select('size', ['small', 'medium', 'large'], 'medium') }
        warning={ text('warning') }
      />,
      <Textbox
        disabled={ boolean('disabled', false) }
        error={ text('error') }
        fieldHelp={ text('fieldHelp') }
        info={ text('info') }
        label={ text('label') }
        labelAlign={ select('labelAlign', ['left', 'right']) }
        labelHelp={ text('labelHelp') }
        labelInline={ boolean('labelInline', false) }
        placeholder={ text('placeholder', 'placeholder text') }
        readOnly={ boolean('readOnly', false) }
        size={ select('size', ['small', 'medium', 'large'], 'medium') }
        warning={ text('warning') }
      />
    ]);
  });
