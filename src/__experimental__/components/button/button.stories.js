import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import notes from './notes.md';
import Button from '.';

storiesOf('Draft-Button', module)
  .add('default', () => {
    const renderAs = select('as', ['primary', 'secondary', 'tertiary', 'destructive', 'darkBackground'], 'secondary');
    const children = text('children', 'DLS Button');
    const disabled = boolean('disabled', false);
    const size = select('size', ['small', 'medium', 'large'], 'medium');
    const subtext = text('subtext', '');
    const iconType = select('iconType', ['cross', 'filter', ''], '');
    const iconPosition = select('iconPosition', ['before', 'after', ''], '');

    return (
      <div>
        <Button
          as={ renderAs }
          size={ size }
          disabled={ disabled }
          onClick={ action('click') }
          subtext={ subtext }
          iconPosition={ iconPosition }
          iconType={ iconType }
        >
          { children }
        </Button>
        <Button
          as={ renderAs }
          size={ size }
          disabled={ disabled }
          onClick={ action('click') }
          iconPosition={ iconPosition }
          iconType={ iconType }
        >
          { children }
        </Button>
      </div>
    );
  }, {
    notes: { markdown: notes }
  });
