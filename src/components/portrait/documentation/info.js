import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p> Portrait Component </p>
    <StoryHeader> Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Portrait from {'"react-carbon/lib/components/portrait"'}</StoryCode>

    <p>To render a portrait:</p>
    <StoryCode>
      {'<Portrait src="/my-image" alt="my image">'}
    </StoryCode>

    <p>To render a gravatar portrait:</p>
    <StoryCode>
      {'<Portrait gravatar="mygrav@email.com" />'}
    </StoryCode>

    <p>You can pass a size property to adjust the size of the portrait. The default value is medium. Possible options: small, smed, lmed, large.</p>
  </div>
);

export default info;
