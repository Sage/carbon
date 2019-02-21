import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import Content from './content.js';

storiesOf('Content', module)
  .add('default', () => {
    const children = text('children', 'An example of some content.');
    const title = text('title', 'Content Component');
    const knobAs = select('as', OptionsHelper.themesBinary, OptionsHelper.themesBinary[0]);
    const inline = boolean('inline', false);
    const align = select('align', OptionsHelper.alignFull);
    const titleeWidth = inline ? text('titleWidth', '') : undefined;
    const bodyFullWidth = boolean('bodyFullWidth', false);

    return (
      <Content
        title={ title }
        as={ knobAs }
        inline={ inline }
        align={ align }
        titleeWidth={ titleeWidth }
        bodyFullWidth={ bodyFullWidth }
      >
        {children}
      </Content>
    );
  }, {
    notes: { markdown: notes }
  });
