import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> ShowEditPod Component </p>
    <p>Presents and edits a set of content that’s grouped together visually (in one pre-configured component).</p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import ShowEditPod from {'"carbon-react/lib/components/show-edit-pod"'}</StoryCode>
  </div>
);

export default info;
