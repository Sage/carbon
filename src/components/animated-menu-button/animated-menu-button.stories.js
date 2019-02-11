import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import notes from './notes.md';
import AnimatedMenuButton from './animated-menu-button';
import { Row } from '../row/row';
import Link from '../link/link';
import { sizes, directions } from '../../constants';

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
    const direction = select('direction', directions, directions[1]);
    const label = text('label', '');
    const size = select('size', sizes, sizes[3]);

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
