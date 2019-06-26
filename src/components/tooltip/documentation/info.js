import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>A Tooltip Widget</p>
    <StoryHeader>Implementation</StoryHeader>
    <StoryCode>
      {'import Tooltip from "carbon-react/lib/components/tooltip"'}
    </StoryCode>

    <p>To render the Tooltip</p>
    <StoryCodeBlock>
      {'<Tooltip>'}
      {'  My Tooltip content…'}
      {'</Tooltip'}
    </StoryCodeBlock>
    <ul>
      <li>
        You can pass a prop of <StoryCode>pointerAlign</StoryCode> to the component
        which shifts the alignment of the pointer. This defaults to {'"center"'}.
      </li>
      <li>
        You can also pass a prop of <StoryCode>pointerPosition</StoryCode> to the
        component which shifts the position of the pointer. This defaults to {'"bottom"'}.
      </li>
      <li>
        The <StoryCode>showTooltip</StoryCode> boolean prop determines whether or not to render the
        tooltip. If you want to implement the tooltip you must add handlers to toggle this prop.
      </li>
    </ul>
  </div>
);

export default info;
