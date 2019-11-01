import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Split Button component</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>import SplitButton from {'"react-carbon/lib/components/split-button"'}</StoryCode>

    <p>To render a SplitButton (developer can add any buttons to dropdown):</p>
    <StoryCodeBlock>
      {'<SplitButton text="Main Button" onClick={ clickHandler }>'}
      {'  <Button onClick="buttonClickHandler1">Button name 1</Button>'}
      {'  <Button onClick="buttonClickHandler2">Button name 2</Button>'}
      {'</SplitButton>'}
    </StoryCodeBlock>
  </div>
);

export default info;
