import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Textbox from '.';

storiesOf('Textbox', module)
  .add('basic', () => {
    return (
      <Textbox
        size={ select('size', ['small', 'medium', 'large'], 'medium') }
        disabled={ boolean('disabled', false) }
        readOnly={ boolean('readOnly', false) }
        placeholder={ text('placeholder', 'placeholder text') }
        warning={ boolean('warning', false) }
        error={ boolean('error', false) }
      />
    );
  })
  .add('disabled', () => {
    return (
      <Textbox
        disabled
      />
    );
  })
  .add('', () => {
    return (
      <Textbox
        disabled
      />
    );
  });
