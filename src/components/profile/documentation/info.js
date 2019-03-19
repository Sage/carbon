import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Profile Component </p>
    <p>Represents a person with their initials or an avatar, and some text.</p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Portrait from {'"react-carbon/lib/components/profile"'}</StoryCode>
  </div>
);

export default info;
