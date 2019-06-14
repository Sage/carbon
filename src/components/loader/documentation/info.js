import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Loader component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>

    <StoryCode padded>
      {'import Loader from "carbon-react/lib/components/loader"'}
    </StoryCode>

    <p>
      You can pass a <StoryCode> {'size'} </StoryCode> property to adjust the size of the loader.
      Small is the default value.
    </p>

    <p>
      You can set <StoryCode> {'isInsideButton'} </StoryCode> property to <StoryCode> {'true'} </StoryCode> to
      apply white color and use the component inside a button.
    </p>
  </div>
);

export default info;
