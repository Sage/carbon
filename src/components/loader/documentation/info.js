import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Loader component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>

    <StoryCode padded>i{'mport Loader from "carbon-react/lib/components/loader"'}</StoryCode>

    <p>
      You can pass a <StoryCode> {'size'} </StoryCode> property to adjust the size of the loader.
    </p>

    <p>
      You can set <StoryCode> {'isInsideButton'} </StoryCode> property to <StoryCode padded> {'true'} </StoryCode> to
      apply white color and use it inside a button.
    </p>

    <p>The default is small.</p>
  </div>
);

export default info;
