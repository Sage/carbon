import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Preview Component </p>
    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Portrait from {'"react-carbon/lib/components/preview"'}</StoryCode>
  </div>
);

export default info;
