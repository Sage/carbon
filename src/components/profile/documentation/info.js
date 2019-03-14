
import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Profile Component </p>
    <p>Renders a user profile, with avatar.</p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Portrait from {'"react-carbon/lib/components/profile"'}</StoryCode>

  </div>
);

export default info;
