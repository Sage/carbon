import React from 'react';
import { StoryHeader, StoryCode } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <StoryHeader>Textbox Component</StoryHeader>
    <p>Captures a single line of text.</p>

    <StoryHeader>Implementation</StoryHeader>

    <StoryCode padded>import Textbox from {'carbon-react/lib/components/textbox'}</StoryCode>

    <p>To render a Textarea:</p>
    <StoryCode padded>{'<Textbox name="myTexbox" />'}</StoryCode>
  </div>
);

export default info;
