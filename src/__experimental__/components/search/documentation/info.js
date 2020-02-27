import React from 'react';
import { StoryHeader, StoryCode } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Search component</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>
        import Search from {'"carbon-react/lib/_experimental_/components/search"'}
    </StoryCode>

    <p>Render the component:</p>
    <StoryCode padded>
      {'<Search name="mySearch" />'}
    </StoryCode>
  </div>
);

export default info;
