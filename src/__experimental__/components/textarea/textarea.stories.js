import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import Textarea from '.';

storiesOf('Experimental/Textarea', module)
  .add('default', () => {
    const size = select('size', ['small', 'medium', 'large'], 'small');
    const label = text('label', '');
    const width = text('width', Textarea.defaultProps.width);
    const height = text('height', Textarea.defaultProps.height);

    return (
      <Textarea
        size={ size }
        label={ label }
        width={ width }
        height={ height }
      />
    );
  });
