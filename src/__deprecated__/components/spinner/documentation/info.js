import React from 'react';
import { StoryHeader, StoryCode } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Spinner component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>

    <StoryCode padded>import Spinner from &quot;carbon-react/lib/components/spinner&quot;</StoryCode>

    <p>
      You can pass a <StoryCode> size </StoryCode> property to adjust the size of the spinner
    </p>

    <p>The default is medium</p>

    <StoryCode padded>
      options: extra-small, small, medium-small, medium, medium-large, large and extra-large
    </StoryCode>
  </div>
);

export default info;
