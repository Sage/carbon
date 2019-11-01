import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>A MultiActionButton widget.</p>

    <StoryHeader>Implementation</StoryHeader>

    <p>In your file:</p>

    <StoryCode padded>
      {'import MultiActionButton from "carbon-react/lib/components/multi-action-button";'}
    </StoryCode>

    <p>To render a MultiActionButton (developer can add any buttons to dropdown):</p>

    <StoryCodeBlock>
      {'<MultiActionButton text="Main Text">'}
      {'  <Button onClick="buttonClickHandler1">Button name 1</Button>'}
      {'  <Button onClick="buttonClickHandler2">Button name 2</Button>'}
      {'</MultiActionButton>'}
    </StoryCodeBlock>
  </div>
);

export default info;
