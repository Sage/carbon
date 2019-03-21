import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { notes } from './documentation';
import Heading from './heading';

storiesOf('Heading', module)
  .add('default', () => {
    const title = text('title', 'This is a heading');
    const children = text('children', 'This is content beneath a heading');
    const subheader = text('subheader', 'This is a subheading');
    const help = text('help', '');
    const helpLink = text('helpLink', '');
    const backLink = text('backLink', '');
    const divider = boolean('divider', Heading.defaultProps.divider);
    const separator = boolean('separator', Heading.defaultProps.separator);

    return (
      <Heading
        title={ title }
        subheader={ subheader }
        help={ help }
        helpLink={ helpLink }
        backLink={ backLink }
        divider={ divider }
        separator={ separator }
      >
        {children}
      </Heading>
    );
  }, {
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  });
