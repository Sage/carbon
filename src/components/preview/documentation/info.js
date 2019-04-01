import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Preview Component</p>
    <p>Applies a preview loading state animation.</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Preview from {'"react-carbon/lib/components/preview"'}</StoryCode>
    <p>
      You can set the custom height for the preview line by setting <StoryCode padded>height</StoryCode> prop (e.g.
      20px).
    </p>
    <p>
      You can also set the width of the component by setting <StoryCode padded>width</StoryCode> prop (e.g. 50%).
    </p>
  </div>
);

export default info;
