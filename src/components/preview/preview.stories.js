import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import Preview from './preview';
import info from './documentation/info';

storiesOf('Preview', module)
  .addParameters({
    info: {
      propTables: [Preview]
    }
  })
  .add(
    'default',
    () => {
      const children = text('children', 'Text rendered as children component.');
      const height = text('height');
      const lines = number('lines', Preview.defaultProps.lines);
      const loading = boolean('loading', true);
      const width = text('width');

      return (
        <Preview
          height={ height } lines={ lines }
          loading={ loading } width={ width }
        >
          {children}
        </Preview>
      );
    },
    {
      info: { text: info }
    }
  );
