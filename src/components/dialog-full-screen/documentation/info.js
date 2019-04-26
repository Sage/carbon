import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A DialogFullScreen component</p>

    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      {'import DialogFullScreen from \'carbon-react/lib/components/dialog-full-screen\';'}
    </StoryCode>

    <p>To render a DialogFullScreen</p>
    <StoryCode>
      {'<DialogFullScreen onCancel={ customEventHandler } />'}
    </StoryCode>
  </div>
);

export default Info;
