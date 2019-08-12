import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './documentation';
import Detail from './detail.js';
import getDocGenInfo from '../../utils/helpers/docgen-info';

Detail.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /detail\.js(?!spec)/
);

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
