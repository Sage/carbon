import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { Select, Option } from '.';

storiesOf('Experimental/Select', module)
  .add('basic', () => {
    return (
      <div>
        <Select
          size={ select('size', ['small', 'medium', 'large'], 'medium') }
          disabled={ boolean('disabled', false) }
          readOnly={ boolean('readOnly', false) }
          placeholder={ text('placeholder', 'placeholder text') }
          warning={ boolean('warning', false) }
          error={ boolean('error', false) }
          label={ text('label') }
          labelInline={ boolean('labelInline', false) }
          labelAlign={ select('labelAlign', ['left', 'right']) }
          value={ [
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' },
            { value: '1', text: 'Purple' }
          ] }
        >
          <Option text='blue'>Blue</Option>
          <Option>Green</Option>
          <Option>Orange</Option>
          <Option>Red</Option>
        </Select>
      </div>
    );
  });
