import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import notes from './notes.md';
import AnimatedMenuButton from './animated-menu-button';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row } from '../row/row';
import Link from '../link/link';

storiesOf('Animated Menu Button', module)
  .addParameters({
    info: {
      inline: true,
      header: false,
      source: false,
      propTablesExclude: [Row, Link],
      propTables: [AnimatedMenuButton]
    }
  })
  .add('default', () => {
    const direction = select('direction', OptionsHelper.alignBinary, OptionsHelper.alignBinary[1]);
    const label = text('label', '');
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[3]);

    return (
      <AnimatedMenuButton
        direction={ direction }
        label={ label }
        size={ size }
      >
        <Row>
          <div>
            <h2>1st Category</h2>
            <p><Link>First Option</Link></p>
            <p><Link>Another Option</Link></p>
          </div>
          <div>
            <h2>2nd Category</h2>
            <p><Link>First Option</Link></p>
            <p><Link>Another Option</Link></p>
          </div>
          <div>
            <h2>3rd Category</h2>
            <p><Link>First Option</Link></p>
            <p><Link>Another Option</Link></p>
          </div>
        </Row>
      </AnimatedMenuButton>
    );
  }, {
    notes: { markdown: notes }
  });
