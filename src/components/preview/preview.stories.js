import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import Preview from './preview';

storiesOf('Preview', module).add(
  'default',
  () => {
    const children = text('children', 'This is an example text child.');
    const className = text('className', '');
    const height = text('height');
    const lines = number('lines', 1);
    const loading = boolean('loading', false);
    const width = text('width');

    return (
      <Preview
        className={ className }
        height={ height }
        lines={ lines }
        loading={ loading }
        width={ width }
      >
        { children }
      </Preview>
    );
  }
);
