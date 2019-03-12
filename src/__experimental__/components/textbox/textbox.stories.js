import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import Textbox from '.';

storiesOf('Experimental/Textbox', module)
  .add('basic', () => {
    return (
      <div>
        <Textbox
          size={ select('size', ['small', 'medium', 'large'], 'medium') }
          disabled={ boolean('disabled', false) }
          readOnly={ boolean('readOnly', false) }
          placeholder={ text('placeholder', 'placeholder text') }
          warning={ boolean('warning', false) }
          error={ boolean('error', false) }
          label={ text('label') }
          labelInline={ boolean('labelInline', false) }
          labelAlign={ select('labelAlign', ['left', 'right']) }
        />
        <Textbox
          size={ select('size', ['small', 'medium', 'large'], 'medium') }
          disabled={ boolean('disabled', false) }
          readOnly={ boolean('readOnly', false) }
          placeholder={ text('placeholder', 'placeholder text') }
          warning={ boolean('warning', false) }
          error={ boolean('error', false) }
          label={ text('label') }
          labelInline={ boolean('labelInline', false) }
          labelAlign={ select('labelAlign', ['left', 'right']) }
        />
      </div>
    );
  });
