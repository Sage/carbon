import React from "react";
import {
  StoryHeader,
  StoryCode,
} from "../../../../../.storybook/style/storybook-info.styles";

const info = (
  <div>
    <StoryHeader>Textarea Component</StoryHeader>
    <p>Captures more than one line of text.</p>

    <StoryHeader>Implementation</StoryHeader>

    <StoryCode padded>
      import Textarea from &quot;carbon-react/lib/components/textarea&quot;
    </StoryCode>

    <p>To render a Textarea:</p>
    <StoryCode padded>{'<Textarea name="myTextarea" />'}</StoryCode>
  </div>
);

export default info;
