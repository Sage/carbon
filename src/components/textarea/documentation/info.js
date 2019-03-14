import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Textarea component</p>

    <StoryHeader> Implementation</StoryHeader>

    <StoryCode padded>import Textarea from {'carbon-react/lib/components/textarea'}</StoryCode>

    <p>To render a Textarea:</p>
    <StoryCode padded>{'<Textarea name="myTextarea" />'}</StoryCode>
  </div>
);

export default info;
