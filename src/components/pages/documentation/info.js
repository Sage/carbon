import React from 'react';
import { StoryHeader, StoryCode } from '../../../../.storybook/style/storybook-info.styles';

const Info = (
  <div>
    <p>A Pages component.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>In your file</p>

    <StoryCode padded>
      import pages from &quot;carbon-react/lib/components/pages.component&quot;
    </StoryCode>

    <p>To render a Pages:</p>

    <StoryCode padded>
      {'<Pages pageIndex="0"><Page></Page></Pages>'}
    </StoryCode>

    <p>Additionally you can pass optional props to the Pages component</p>
  </div>
);

export default Info;
