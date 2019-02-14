import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { assign } from 'lodash';
import notes from './notes.md';
import AnimatedMenuButtonBase from './animated-menu-button';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row } from '../row/row';
import Link from '../link/link';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AnimatedMenuButton = ({
  direction,
  label,
  size,
  children
}) => {
  if (direction === OptionsHelper.alignBinary[0]) {
    return (
      <Container>
        <AnimatedMenuButtonBase
          direction={ direction }
          label={ label }
          size={ size }
        >
          {children}
        </AnimatedMenuButtonBase>
      </Container>
    );
  }
  return (
    <AnimatedMenuButtonBase
      direction={ direction }
      label={ label }
      size={ size }
    >
      {children}
    </AnimatedMenuButtonBase>
  );
};

AnimatedMenuButton.propTypes = assign({}, AnimatedMenuButtonBase.propTypes);

storiesOf('Animated Menu Button', module)
  .addParameters({
    info: {
      propTablesExclude: [Row, Link, AnimatedMenuButton],
      propTables: [AnimatedMenuButtonBase]
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
