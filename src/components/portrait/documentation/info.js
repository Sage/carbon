import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Portrait Component</p>
    <p>Represents a person with their initials or an avatar.</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import Portrait from &quot;carbon-react/lib/components/portrait&quot;</StoryCode>

    <p>To render a portrait:</p>
    <StoryCode>{'<Portrait src="/my-image" alt="my image">'}</StoryCode>

    <p>To render a gravatar portrait:</p>
    <StoryCode>{'<Portrait gravatar="mygrav@email.com" />'}</StoryCode>

    <p>
      Portrait will be rendered if you pass a prop of
      <StoryCode padded>src</StoryCode> or
      <StoryCode padded>gravatar</StoryCode>
      as a source for portrait image.
    </p>

    <p>
      To render Portrait without an image, pass only <StoryCode padded>initials</StoryCode> prop.
    </p>

    <p>
      You can pass a <StoryCode padded>size</StoryCode> property to adjust the size of the portrait. The default value
      is medium.
    </p>
  </div>
);

export default info;
