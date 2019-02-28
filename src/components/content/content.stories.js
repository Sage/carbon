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
    const knobAs = select('as', OptionsHelper.themesBinary, Content.defaultProps.as);
    const inline = boolean('inline', Content.defaultProps.inline);
    const align = select('align', OptionsHelper.alignFull, Content.defaultProps.align);
    const titleWidth = inline ? text('titleWidth', '') : undefined;
    const bodyFullWidth = boolean('bodyFullWidth', Content.defaultProps.bodyFullWidth);

    return (
      <Content
        title={ title }
        as={ knobAs }
        inline={ inline }
        align={ align }
        titleWidth={ titleWidth }
        bodyFullWidth={ bodyFullWidth }
      >
        {children}
      </Content>
    );
  }, {
    notes: { markdown: notes }
  });
