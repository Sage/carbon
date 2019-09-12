import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { dlsThemeSelector, classicThemeSelector } from '../../../.storybook/theme-selectors';
import notes from './notes.md';
import AnimatedMenuButton from './animated-menu-button';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Row } from '../row/row';
import Link from '../link';
import getDocGenInfo from '../../utils/helpers/docgen-info';

AnimatedMenuButton.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /animated-menu-button(?!spec)/
);

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = ({
  direction,
  label,
  size,
  children
}) => {
  if (direction === OptionsHelper.alignBinary[0]) {
    return (
      <Container>
        <AnimatedMenuButton
          direction={ direction }
          label={ label }
          size={ size }
        >
          {children}
        </AnimatedMenuButton>
      </Container>
    );
  }

  return (
    <AnimatedMenuButton
      direction={ direction }
      label={ label }
      size={ size }
    >
      {children}
    </AnimatedMenuButton>
  );
};

Wrapper.propTypes = { ...AnimatedMenuButton.propTypes };
Wrapper.displayName = 'AnimatedMenuButton';

function makeStory(name, themeSelector) {
  const component = () => {
    const direction = select('direction', OptionsHelper.alignBinary, OptionsHelper.alignBinary[1]);
    const label = text('label', '');
    const size = select('size', OptionsHelper.sizesFull, OptionsHelper.sizesFull[3]);

    return (
      <Wrapper
        direction={ direction }
        label={ label }
        size={ size }
      >
        <Row>
          <div>
            <h2>1st Category</h2>
            <p>{/* eslint-disable */}<Link>{/* eslint-enable */}First Option</Link></p>
            <p>{/* eslint-disable */}<Link>{/* eslint-enable */}Another Option</Link></p>
          </div>
          <div>
            <h2>2nd Category</h2>
            <p>{/* eslint-disable */}<Link>{/* eslint-enable */}First Option</Link></p>
            <p>{/* eslint-disable */}<Link>{/* eslint-enable */}Another Option</Link></p>
          </div>
          <div>
            <h2>3rd Category</h2>
            <p>{/* eslint-disable */}<Link>{/* eslint-enable */}First Option</Link></p>
            <p>{/* eslint-disable */}<Link>{/* eslint-enable */}Another Option</Link></p>
          </div>
        </Row>
      </Wrapper>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes }
  };

  return [name, component, metadata];
}

storiesOf('Animated Menu Button', module)
  .addParameters({
    info: {
      propTablesExclude: [Row, Link, Wrapper],
      propTables: [AnimatedMenuButton]
    }
  })
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
