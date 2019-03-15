import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import AnimatedMenuButton from './animated-menu-button';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row } from '../row/row';
import Link from '../link/link';
import { notes, info } from './documentation';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = ({
  direction, label, size, children
}) => {
  if (direction === OptionsHelper.alignBinary[0]) {
    return (
      <Container>
        <AnimatedMenuButton
          direction={ direction } label={ label }
          size={ size }
        >
          {children}
        </AnimatedMenuButton>
      </Container>
    );
  }

  return (
    <AnimatedMenuButton
      direction={ direction } label={ label }
      size={ size }
    >
      {children}
    </AnimatedMenuButton>
  );
};

Wrapper.propTypes = { ...AnimatedMenuButton.propTypes };
Wrapper.displayName = 'AnimatedMenuButton';

storiesOf('Animated Menu Button', module)
  .addParameters({
    info: {
      propTablesExclude: [Row, Link, Wrapper],
      propTables: [AnimatedMenuButton]
    }
  })
  .add(
    'default',
    () => {
      const direction = select('direction', OptionsHelper.alignBinary, AnimatedMenuButton.defaultProps.direction);
      const label = text('label', '');
      const size = select('size', OptionsHelper.sizesFull, AnimatedMenuButton.defaultProps.size);

      return (
        <Wrapper
          direction={ direction } label={ label }
          size={ size }
        >
          <Row>
            <div>
              <h2>1st Category</h2>
              <p>
                {/* eslint-disable */}
                <Link>{/* eslint-enable */}First Option</Link>
              </p>
              <p>
                {/* eslint-disable */}
                <Link>{/* eslint-enable */}Another Option</Link>
              </p>
            </div>
            <div>
              <h2>2nd Category</h2>
              <p>
                {/* eslint-disable */}
                <Link>{/* eslint-enable */}First Option</Link>
              </p>
              <p>
                {/* eslint-disable */}
                <Link>{/* eslint-enable */}Another Option</Link>
              </p>
            </div>
            <div>
              <h2>3rd Category</h2>
              <p>
                {/* eslint-disable */}
                <Link>{/* eslint-enable */}First Option</Link>
              </p>
              <p>
                {/* eslint-disable */}
                <Link>{/* eslint-enable */}Another Option</Link>
              </p>
            </div>
          </Row>
        </Wrapper>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    }
  );
