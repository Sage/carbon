import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> ShowEditPod Component </p>

    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import ShowEditPod from {'"carbon-react/lib/components/show-edit-pod"'}</StoryCode>
  </div>
);

export default info;
