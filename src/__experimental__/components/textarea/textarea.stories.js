import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import Textarea from '.';

storiesOf('Experimental/Textarea', module)
  .add('default', () => {
    const size = select('size', ['small', 'medium', 'large'], 'small');
    const label = text('label', '');

    return (
      <Textarea
        size={ size }
        label={ label }
      />
    );
  });
