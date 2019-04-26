import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Alert component</p>
    <p>This component extends Dialog component</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Alert from {'"carbon-react/lib/components/alert"'}</StoryCode>

    <p>To render the Alert</p>
    <StoryCode padded>{'<Alert onCancel={ customEventHandler } open={ false } />'}</StoryCode>

    <p>
      The component rendering the Alert must pass down a prop of
      <StoryCode padded>open</StoryCode>
      in order to open the alert.
    </p>
    <p>You need to provide a custom cancel event handler to handle a close event.</p>
  </div>
);

export default info;
