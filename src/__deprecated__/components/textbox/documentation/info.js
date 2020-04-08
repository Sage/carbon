import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Textbox component</p>

    <StoryHeader>Implementation</StoryHeader>
    <StoryCodeBlock>import Textbox from &quot;carbon-react/lib/components/textbox&quot;</StoryCodeBlock>

    <p>
      To render a<StoryCode padded>Textbox</StoryCode>
    </p>

    <StoryCode padded>{'<Textbox name="myTextbox" />'}</StoryCode>
  </div>
);

export default info;
