import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import notes from './notes.md';
import Create from './create.js';

storiesOf('Create', module)
  .add('default', () => {
    const children = text('children', 'Resource Name');
    const className = text('className', '');

    return (
      <Create
        className={ className }
      >
        {children}
      </Create>
    );
  }, {
    notes: { markdown: notes }
  });
