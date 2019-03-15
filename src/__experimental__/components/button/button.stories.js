import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '.';

storiesOf('Draft-Button', module)
  .add('default', () => {
    const renderAs = select('as', ['primary', 'secondary', 'tertiary', 'destructive', 'darkBackground'], 'secondary');
    const children = text('children', 'DLS Button');
    const disabled = boolean('disabled', false);
    const size = select('size', ['small', 'medium', 'large'], 'medium');

    return (
      <div>
        <Button
          as={ renderAs }
          size={ size }
          disabled={ disabled }
          onClick={ action('click') }
        >
          { children }
        </Button>
        <Button
          as={ renderAs }
          size={ size }
          disabled={ disabled }
          onClick={ action('click') }
        >
          { children }
        </Button>
        <button type='button' onClick={ action('click') }>test</button>

      </div>
    );
  });
