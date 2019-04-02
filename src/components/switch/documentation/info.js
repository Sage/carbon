import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Switch component</p>
    <p>This component extends Checkbox and adds a switch styling over the top.</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Switch from {'"carbon-react/lib/components/switch"'}</StoryCode>
  </div>
);

export default info;
