import React from 'react';
import { StoryCode, StoryHeader, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Animated Menu Button component.</p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>

    <StoryCode padded>import AnimatedMenuButton from {'"carbon-react/lib/components/animated-menu-button"'}</StoryCode>

    <p>
      To render a <StoryCode>{'<AnimatedMenuButton />'}</StoryCode> pass children to be rendered in the expanded menu:
    </p>

    <StoryCodeBlock>
      {'<AnimatedMenuButton>'}
      {'    <Row>'}
      {'        <div>'}
      {'          <h2 className="title">Foo</h2>'}
      {'              <p>'}
      {'                <Link href="#">Bar</Link>'}
      {'              </p>'}
      {'        </div>'}
      {'  </Row>'}
      {'</AnimatedMenuButton>'}
    </StoryCodeBlock>
  </div>
);

export default info;
