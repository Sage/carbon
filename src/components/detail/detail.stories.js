import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Detail from './detail.js';

storiesOf('Detail', module)
  .add('default', () => {
    const icon = select('icon', [null, ...OptionsHelper.icons], null);
    const footnote = text('footnote', 'This detail may require a footnote.');
    const children = text('children', 'An example of a detail.');

    return (
      <Detail
        icon={ icon }
        footnote={ footnote }
      >
        {children}
      </Detail>
    );
  }, {
    notes: { markdown: notes }
  });
